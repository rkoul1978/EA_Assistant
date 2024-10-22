import ResponseIcon from '@mui/icons-material/Chat';
import Agent, { AGENT_TYPE_WORKER } from './Agent';
import AgentResponse from './AgentResponse';
import LLMAgent, { createLLMAgentRequest } from './LLMAgent';

class ResearchAgent extends Agent {

  ID = 'ResearchAgent';

  constructor(persona, parentId = null) {
    super('Research Agent', ResponseIcon, '#4D148C', AGENT_TYPE_WORKER, persona, parentId);
  }

  async _process(agentResponse) {

    const llm = new LLMAgent(this.persona, this.id);
    llm.setAddAgentResponse(this.addAgentResponse)
    const request = createLLMAgentRequest(
      agentResponse.response, 
      agentResponse.merge(this.getAgentSystemMessage()), 
      agentResponse.merge(this.getAgentPrompt()), 
      this.getAgentTemperature(),
    );

    const response = await llm.process(request);
    this.children.push(response);

    return new AgentResponse({
      agent: this,
      input: agentResponse.response,
      context: agentResponse.context,
      response: response.response,
      parsedResponse: response.parsedResponse,
    });
  }
}

export default ResearchAgent;
