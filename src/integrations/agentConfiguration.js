import agentConfig from "../config/agentConfig";

export const getConfigByPersona = (persona) => {
  return agentConfig[persona] || null;
};
