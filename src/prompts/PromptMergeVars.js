class PromptMergeVars {
    constructor(input, context = {}, response = "", parsedResponse = {}, properties = {}) {
      this.input = input;
      this.context = context;
      this.response = response;
      this.parsedResponse = parsedResponse;
      this.properties = properties;
    }
  
    merge(template) {
      return template.replace(/\{mergeVars\.(\w+)\}/g, (_, key) => {
        return this[key] !== undefined ? this[key] : `{mergeVars.${key}}`;
      });
    }
  }
  
  export default PromptMergeVars;
  