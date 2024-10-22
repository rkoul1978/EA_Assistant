import Agent, { AGENT_TYPE_PROXY } from './Agent';
import InputEnhancementAgent from './InputEnhancementAgent';
import KnowledgeGraphAgent from './KnowledgeGraphAgent';
import ResearchAgent from './ResearchAgent';
import ReviewerAgent from './ReviewerAgent';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AgentResponse from './AgentResponse';

class UserInteractionAgent extends Agent {
  constructor(persona, parentId = null) {
    super('Assistant', SmartToyIcon, '#FF6600', AGENT_TYPE_PROXY, persona, parentId);
  }

  async _process(agentResponse) {

    const agents = [
      new InputEnhancementAgent(this.persona),
      new KnowledgeGraphAgent(this.persona),
      new ResearchAgent(this.persona),
      new ReviewerAgent(this.persona),
    ]

    let msg = agentResponse;
    for (const agent of agents) {
      agent.parentId = this.id;
      agent.setAddAgentResponse(this.addAgentResponse)
      msg = await agent.process(msg);
      this.children.push(msg);
    }

    return new AgentResponse({
      agent: this,
      input: agentResponse.input,
      response: msg.response,
      parsedResponse: msg.parsedResponse,
      isFinal: true,
    });

  }
}

export default UserInteractionAgent;