import React, { createContext, useContext, useState, useCallback } from 'react';
import AgentResponse from '../agents/AgentResponse';
import { AGENT_TYPE_USER } from '../agents/Agent';
import UserAgent from '../agents/UserAgent';
import UserInteractionAgent from '../agents/UserInteractionAgent';

const AgentResponseContext = createContext();

export const AgentResponseProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastAgentResponse, setLastAgentResponse] = useState(null);
  const [input, setInput] = useState('');
  const [selectedPersona, setSelectedPersona] = useState('Technical Arch');

  const handlePersonaChange = (persona) => {
    setSelectedPersona(persona);
  };

  const addMessage = useCallback((message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  }, []);

  const handleAgentResponse = useCallback((message) => {
    if (message.isFinal) {
      addMessage(message);
    }
    if (message.agent.type !== AGENT_TYPE_USER) {
      setLastAgentResponse(`${message.agent.name} is working...`);
    }
  }, [addMessage]);

  const agentQuestion = useCallback(async (val) => {
    if (!val.trim() || isProcessing) return;

    setIsProcessing(true);

    try {

      setLastAgentResponse("Initializing Agents...")

      const newUserAgent = new UserAgent(selectedPersona);
      const newUserInteractionAgent = new UserInteractionAgent(selectedPersona);

      newUserAgent.setAddAgentResponse(handleAgentResponse);
      newUserInteractionAgent.setAddAgentResponse(handleAgentResponse);

      const userMessage = await newUserAgent.process(val);
      await newUserInteractionAgent.process(userMessage);

    } catch (error) {
      console.error('Error processing user input:', error);
      addMessage(new AgentResponse({
        agent: { name: 'System', type: 'System', id: 'system-error' },
        input: '',
        response: 'An error occurred. Please try again.',
        parsedResponse: {},
        time: 0,
        isFinal: true
      }));
    } finally {
      setIsProcessing(false);
      setLastAgentResponse(null);
      setInput('');
    }
  }, [isProcessing, handleAgentResponse, addMessage, selectedPersona]);

  return (
    <AgentResponseContext.Provider value={{
      messages,
      lastAgentResponse,
      isProcessing,
      agentQuestion,
      input,
      setInput,
      handlePersonaChange,
      selectedPersona
    }}>
      {children}
    </AgentResponseContext.Provider>
  );
};

export const useAgentResponseContext = () => useContext(AgentResponseContext);
