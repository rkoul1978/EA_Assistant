import PromptMergeVars from "../prompts/PromptMergeVars";

class AgentResponse extends PromptMergeVars {
  constructor({ agent, input, context, response, parsedResponse, properties, time, isFinal }) {
    super(input, context, response, parsedResponse, properties);
    this.agent = agent;
    this.time = time;
    this.isFinal = isFinal;
  }
}

export default AgentResponse;
