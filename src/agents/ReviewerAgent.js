import CloudIcon from '@mui/icons-material/Cloud';
import Agent, { AGENT_TYPE_WORKER } from './Agent';
import AgentResponse from './AgentResponse';
import LLMAgent, { createLLMAgentRequest } from './LLMAgent';

class ReviewerAgent extends Agent {

  ID = 'ReviewerAgent'

  constructor(persona, parentId = null) {
    super('Response Reviewer Agent', CloudIcon, '#00BCD4', AGENT_TYPE_WORKER, persona, parentId);
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
      response: response.response,
      parsedResponse: response.parsedResponse,
      isFinal: false
    });

  }
}

export default ReviewerAgent;
