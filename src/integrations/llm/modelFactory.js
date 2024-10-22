import OpenAIProvider from './providers/OpenAIProvider';

const defaultProvider = "openai";

// Factory function to create the appropriate provider
const createProvider = (providerName) => {
  switch (providerName.toLowerCase()) {
    case 'openai':
      return new OpenAIProvider();
    // Add more cases here for other providers
    default:
      throw new Error(`Unsupported provider: ${providerName}`);
  }
};

export const getDefaultModelProvider = () => {
  return createProvider(defaultProvider);
};