import OpenAI from 'openai';
import ModelProvider from './ModelProvider';

// Check if the API key is set
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;


if (!API_KEY) {
  throw new Error('REACT_APP_OPENAI_API_KEY is not set in the environment variables.');
}

class OpenAIProvider extends ModelProvider {
  constructor() {
    super();
    this.openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });
  }

  convertToMessages(modelParams) {
    const { systemMessage, prompt, history } = modelParams;
    const messages = [];

    if (systemMessage) {
      messages.push({ role: 'system', content: systemMessage });
    } else {
      messages.push({ role: 'system', content: 'You are a helpful assistant.' });
    }

    if (history) {
      messages.push(...history);      
    }

    if (prompt) {
      messages.push({ role: 'user', content: prompt });
    }

    return messages;
  }

  async generateJSONResponse(modelParams) {
    return this.generateResponse(modelParams, true);
  }

  async generateTextResponse(modelParams) {
    return this.generateResponse(modelParams, false);
  }

  async generateResponse(modelParams, isJSON = false) {
    const { temperature, additionalOptions } = modelParams;

    const messages = this.convertToMessages(modelParams);

    const requestOptions = {
      messages,
      model: additionalOptions?.model || 'gpt-3.5-turbo',
      temperature: temperature,
      ...additionalOptions,
    };

    if (isJSON) {
      requestOptions.response_format = { "type": "json_object" };
    }

    try {
      const response = await this.openai.chat.completions.create(requestOptions);
      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error in OpenAI generateResponse:', error);
      throw new Error('Failed to generate chat response from OpenAI. Please try again.');
    }
  }

  async getModels() {
    try {
      const response = await this.openai.models.list();
      return response.data;
    } catch (error) {
      console.error('Error fetching OpenAI models:', error);
      throw new Error('Failed to fetch OpenAI models. Please try again.');
    }
  }
}

export default OpenAIProvider;
