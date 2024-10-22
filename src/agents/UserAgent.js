import PersonIcon from '@mui/icons-material/Person';
import Agent, { AGENT_TYPE_USER } from './Agent';
import AgentResponse from './AgentResponse';

class UserAgent extends Agent {
  constructor(persona) {
    super('You', PersonIcon, '#4D148C', AGENT_TYPE_USER, persona);
  }

  async _process(input) {
    return new AgentResponse({
      agent: this,
      input: input,
      response: input,
      isFinal: true
    });
  }
}

export default UserAgent;