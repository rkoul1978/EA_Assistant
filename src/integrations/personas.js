import agentConfig from "../config/agentConfig";

export const getPersonas = () => {
    return Object.keys(agentConfig);
  };