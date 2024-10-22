/**
 * @typedef {Object} ModelParams
 * @property {string} systemMessage - The system message to set the context for the AI
 * @property {string} prompt - The user's input or question
 * @property {number} temperature - Controls randomness in the output (0 to 1)
 * @property {Array<Object>} history - Array of previous messages in the conversation
 * @property {Object} additionalOptions - Any additional model-specific options
 */

/**
 * Creates a ModelParams object with default values
 * @returns {ModelParams}
 */
export class ModelParams {
  constructor() {
    this.systemMessage = '';
    this.prompt = '';
    this.temperature = 0.7;
    this.history = [];
    this.additionalOptions = {};
  }

  addHistory(role, content) {
    this.history.push({ role, content });
  }
}

export function createModelParams() {
  return new ModelParams();
}
