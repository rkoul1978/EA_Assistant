import React, { useEffect, useRef, useCallback } from 'react';
import ChatMessage from './ChatMessage';
import { useFeedbackContext } from '../contexts/FeedbackContext';
import { useAgentResponseContext } from '../contexts/AgentResponseContext';
import WelcomeMessage from './WelcomeMessage';
import {
  ChatContainer,
  ChatBox,
  ChatPaper,
  SendButton,
} from '../styles/chatInterfaceStyles';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { Box, CircularProgress, Typography } from '@mui/material';
import { AGENT_TYPE_USER } from '../agents/Agent';
import PreviousQuestions from './PreviousQuestions';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    minHeight: '56px',
    alignItems: 'flex-start',
  },
  '& .MuiInputBase-input': {
    overflow: 'auto',
    maxHeight: '100px',
    lineHeight: '1.5',
    paddingRight: '48px', // Add padding for the send button
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[300],
      borderRadius: '4px',
    },
  },
}));

const ChatInterface = React.memo(() => {
  const chatPaperRef = useRef(null);
  const { addFeedback } = useFeedbackContext();
  const formRef = useRef(null);
  const { 
    messages, 
    lastAgentResponse, 
    isProcessing, 
    agentQuestion,
    input,
    setInput,
  } = useAgentResponseContext();

  const handleFeedback = useCallback((message, isPositive) => {
    addFeedback(message, isPositive);
    console.log(`${isPositive ? 'Positive' : 'Negative'} feedback for message:`, message);
  }, [addFeedback]);

  useEffect(() => {
    if (chatPaperRef.current && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.agent && lastMessage.agent.type === AGENT_TYPE_USER) {
        chatPaperRef.current.scrollTop = chatPaperRef.current.scrollHeight;
      }
    }
  }, [messages]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (input.trim() && agentQuestion) {
      await agentQuestion(input);
      setInput('');
    } else if (!agentQuestion) {
      console.error('agentQuestion is undefined');
    }
  }, [agentQuestion, input, setInput]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }, [handleSubmit]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', border: '1px solid #e0e0e0', width: '100%' }}>
      <ChatContainer sx={{ 
        width: '100%', 
        transition: 'width 0.3s',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 48px)', // Subtract the header height
      }}>
        <ChatBox sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <ChatPaper ref={chatPaperRef}>
            {messages.length === 0 ? (
              <WelcomeMessage />
            ) : (
              messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={{...message, onFeedback: handleFeedback}}
                />
              ))
            )}
            {lastAgentResponse && typeof lastAgentResponse === 'string' && (
              <Box sx={{ mt: 2, mb: 2, textAlign: 'left', display: 'flex', alignItems: 'center' }}>
                <CircularProgress size={16} sx={{ ml: 1 }} />&nbsp;&nbsp;
                <Typography variant="body2" color="text.secondary">
                  {lastAgentResponse}
                  <br />
                </Typography>
              </Box>
            )}
          </ChatPaper>
          <Box sx={{ position: 'sticky', bottom: 0, pt: 2 }}>
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
              <PreviousQuestions />
              <Box sx={{ position: 'relative', flexGrow: 1, mr: 2 }}>
                <StyledTextField
                  fullWidth
                  multiline
                  variant="outlined"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message here... (Shift+Enter for new line)"
                  disabled={isProcessing}
                  minRows={1}
                  maxRows={4}
                />
                <SendButton 
                  type="submit" 
                  aria-label="send" 
                  variant='contained' 
                  disabled={isProcessing}
                  sx={{
                    backgroundColor: isProcessing ? '#999999' : 'primary',
                    '&:hover': {
                      backgroundColor: isProcessing ? '#999999' : 'primary.dark',
                    },
                  }}
                >
                  <SendIcon color="white" />
                </SendButton>
              </Box>
            </form>
          </Box>
        </ChatBox>
      </ChatContainer>
    </Box>
  );
});

export default ChatInterface;
