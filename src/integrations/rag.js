import { getDefaultModelProvider } from '../integrations/llm/modelFactory';
import { createModelParams } from '../integrations/llm/modelParams';

// simulate RAG for now
export const doRAG = async (agentResponse) => { 

    const { input, response, agent } = agentResponse;
    const persona = agent.persona;

    const modelParams = createModelParams();
    modelParams.prompt = `
        Given the following information:
        Original User Input: ${input}
        Previous Response: ${response}
        Target Audience: ${persona}

        Create a false context (simulated RAG) of document fragments.
        It must be a diverse set of opinionated fragments, so make assumptions around the principles, guidelines and concepts.
        Return as JSON.
    `;
    modelParams.systemMessage = "You are a test agent responsible for mocking data based on the provided details.";

    const llmResponse = await getDefaultModelProvider().generateJSONResponse(modelParams);

    return llmResponse;
};
