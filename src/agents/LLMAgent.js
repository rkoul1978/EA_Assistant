import { createModelParams } from '../integrations/llm/modelParams';
import { getDefaultModelProvider } from '../integrations/llm';
import Agent, { AGENT_TYPE_LLM } from './Agent';
import AgentResponse from './AgentResponse';
import { AssistantDirection } from '@mui/icons-material';

class LLMAgent extends Agent {

  ID = 'LLMAgent';

  constructor(persona, parentId = null) {
    super('LLM Call', AssistantDirection, '#4CAF50', AGENT_TYPE_LLM, persona, parentId);
  }

  async _process(agentResponse) {

    const modelParams = createModelParams();
    modelParams.systemMessage = agentResponse.properties.systemMessage;
    modelParams.prompt = agentResponse.properties.prompt;
    modelParams.temperature = agentResponse.properties.temperature;

    let response, parsedResponse = null;
    if (agentResponse.properties.isJSON) {
      response = await getDefaultModelProvider().generateJSONResponse(modelParams);
      parsedResponse = JSON.parse(response);
    } else {
      response = await getDefaultModelProvider().generateTextResponse(modelParams);
    }

    return new AgentResponse({
      agent: this,
      input: agentResponse.input,
      response: response,
      parsedResponse: parsedResponse,
    });
    
  }
}

export default LLMAgent;

export const createLLMAgentRequest = (input, systemMessage, prompt, temperature, isJSON = false) => {
  return new AgentResponse({
    input: input,
    context: {},
    response: "",
    parsedResponse: {},
    properties: {
      systemMessage: systemMessage,
      prompt: prompt,
      temperature: temperature,
      isJSON: isJSON
    },
    time: 0,
    isFinal: false
  });
}
