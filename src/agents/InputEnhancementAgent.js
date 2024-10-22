import EnhanceIcon from '@mui/icons-material/AutoFixHigh';
import Agent, { AGENT_TYPE_WORKER } from './Agent';
import AgentResponse from './AgentResponse';
import LLMAgent, {createLLMAgentRequest} from './LLMAgent';

class InputEnhancementAgent extends Agent {

  ID = 'InputEnhancementAgent';
  JSON_OUTPUT_PROMPT = " Respond as JSON."

  constructor(persona, parentId = null) {
    super('Input Enhancement Agent', EnhanceIcon, '#4D148C', AGENT_TYPE_WORKER, persona, parentId);
  }

  async _process(agentResponse) {

    const llm = new LLMAgent(this.persona, this.id);
    llm.setAddAgentResponse(this.addAgentResponse)
    const request = createLLMAgentRequest(
      agentResponse.input, 
      agentResponse.merge(this.getAgentSystemMessage()), 
      agentResponse.merge(this.getAgentPrompt()) + this.JSON_OUTPUT_PROMPT, 
      this.getAgentTemperature(),
      true,
    );

    const response = await llm.process(request);
    this.children.push(response);

    return new AgentResponse({
      agent: this,
      input: agentResponse.input,
      response: response.response,
      parsedResponse: response.parsedResponse,
      isFinal: false
    });
    
  }
}

export default InputEnhancementAgent;
