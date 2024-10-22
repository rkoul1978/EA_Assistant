import { createModelParams } from '../modelParams';

class ModelProvider {
  constructor() {
    if (this.constructor === ModelProvider) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.modelParams = createModelParams();
  }

  async generateTextResponse(modelParams) {
    throw new Error("Method 'generateTextResponse()' must be implemented.");
  }

  async generateJSONResponse(modelParams) {
    throw new Error("Method 'generateJSONResponse()' must be implemented.");
  }

  async getModels() {
    throw new Error("Method 'getModels()' must be implemented.");
  }
}

export default ModelProvider;
