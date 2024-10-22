import { v4 as uuidv4 } from 'uuid';

class ChatContext {

    constructor() {
      this.id = uuidv4();
      this.messages = [];
    }
  
    addMessage(message) {
      this.messages.push(message);
    }
    getMessages() {
      return this.messages;
    }

}

export default ChatContext;
  