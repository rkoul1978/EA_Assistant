import AgentResponse from './AgentResponse';
import { v4 as uuidv4 } from 'uuid';
import { getConfigByPersona } from '../integrations/agentConfiguration'

export const AGENT_TYPE_USER = "User"
export const AGENT_TYPE_PROXY = "Proxy"
export const AGENT_TYPE_RAG = "RAG"
export const AGENT_TYPE_WORKER = "Worker"
export const AGENT_TYPE_LLM = "LLM"

class Agent {

  constructor(name, icon, color, type, persona = null, parentId = null) {
    this.id = uuidv4();
    this.name = name;
    this.icon = icon;
    this.color = color;
    this.type = type;
    this.persona = persona;
    this.parentId = parentId;
    this.children = [];
  }

  async _process(agentResponse) {
    throw new Error('_process method must be implemented by subclasses');
  }

  getAgentConfiguration() {
    try {
      return getConfigByPersona(this.persona);      
    } catch (error) {
      return this.getErrorMessage("N/A", error, Date.now());
    }   
  }

  getAgentSystemMessage() {
    return this.getAgentPropertyWithFallback('systemMessage');
  }

  getAgentPrompt() {
    return this.getAgentPropertyWithFallback('prompt');
  }

  getAgentTemperature() {
    return this.getAgentPropertyWithFallback('temperature');
  }

  getAgentPropertyWithFallback(property) {
    const config = this.getAgentConfiguration();
    let val = null;
    if (config[this.constructor.name] && property in config[this.constructor.name]) {
      val = config[this.constructor.name][property];
    } else if (config.defaults && property in config.defaults) {
      val = config.defaults[property];
    }
    if (!val) { 
      throw new Error(`Property "${property}" not found in agent configuration for ${this.name}`);
    }
    return val;
  }

  setAddAgentResponse(addFunction) {
    this.addAgentResponse = addFunction;
  }

  async process(agentResponse) {

    const startTime = Date.now();

    try {

      const result = await this._process(agentResponse);
      const time = Date.now() - startTime;

      result.agent = this;
      result.time = time;

      if (!('isFinal' in result)) {
        result.isFinal = false;
      }

      if (this.addAgentResponse) {
        console.log("addAgentResponse", result);
        this.addAgentResponse(result);
      }

      return result;

    } catch (error) {
      return this.getErrorMessage(agentResponse.input, error, startTime);
    }

  }

  getErrorMessage(input, error, startTime) {
    const time = Date.now() - startTime;
    console.error(`Error in ${this.name}:`, error);
    return new AgentResponse({
      agent: this,
      input: input,
      response: `Error in ${this.name}:\n ` + error,
      time: time,
      isFinal: true
    });
  }

}

export default Agent;
