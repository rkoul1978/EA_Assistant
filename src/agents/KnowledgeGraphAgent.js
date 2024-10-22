import KnowledgeIcon from '@mui/icons-material/Psychology';
import Agent, { AGENT_TYPE_RAG } from './Agent';
import AgentResponse from './AgentResponse';
import LLMAgent from './LLMAgent';
import { doRAG } from '../integrations/rag';

class KnowledgeGraphAgent extends Agent {
  constructor(persona, parentId = null) {
    super('Knowledge Graph Agent', KnowledgeIcon, '#FF6600', AGENT_TYPE_RAG, persona, parentId);
    this.llmAgent = new LLMAgent(persona, this.id);
  }

  async _process(agentResponse) {

    const ragData = await doRAG(agentResponse);

    return new AgentResponse({
      agent: this,
      input: agentResponse.response,
      context: agentResponse.input,
      response: JSON.stringify(ragData, null, 2),
      parsedResponse: ragData,
    });
  }
}

export default KnowledgeGraphAgent;
