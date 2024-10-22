import React, { useState } from 'react';
import { Box, Collapse, Typography, Avatar, Button } from '@mui/material';
import AgentResponseRenderer from './AgentResponseRenderer';

const MessageItem = ({ message, index, level = 0 }) => {
  const [isInputExpanded, setIsInputExpanded] = useState(false);
  const [isOutputExpanded, setIsOutputExpanded] = useState(false);
  const inputLines = message.input ? message.input.split('\n') : [""];
  const responseLines = message.response.split('\n');
  const displayedInputLines = isInputExpanded ? inputLines : inputLines.slice(0, 3);
  const displayedResponseLines = isOutputExpanded ? responseLines : responseLines.slice(0, 5);

  return (
    <Box 
      sx={{ 
        mb: 2, 
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: `${12 + level * 20}px`,
          top: 0,
          bottom: 0,
          width: '2px',
          backgroundColor: message.agent.color,
        },
        pl: 4 + level * 2.5
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Avatar sx={{ width: 20, height: 20, mr: 1, bgcolor: message.agent.color }}>
          {React.createElement(message.agent.icon, { sx: { fontSize: 14 } })}
        </Avatar>
        <Typography variant="body2" component="span" fontWeight="bold">
          {message.agent.name}
        </Typography>
      </Box>
      <Box className="message-container">
        <Box className="message-input">
          <Typography variant="body2" className="message-label">Input:</Typography>
          <AgentResponseRenderer response={displayedInputLines.join('\n')} />
          {inputLines.length > 3 && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Button 
                onClick={() => setIsInputExpanded(!isInputExpanded)}
                size="small"
              >
                {isInputExpanded ? 'Show Less' : 'Show More'}
              </Button>
            </Box>
          )}
        </Box>
        <Box className="message-output">
          <Typography variant="body2" className="message-label">Output:</Typography>
          <AgentResponseRenderer response={displayedResponseLines.join('\n')} />
          {responseLines.length > 5 && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Button 
                onClick={() => setIsOutputExpanded(!isOutputExpanded)}
                size="small"
              >
                {isOutputExpanded ? 'Show Less' : 'Show More'}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
        Response Time: {message.time} ms
      </Typography>
    </Box>
  );
};

const MessageChain = ({ messages, expanded }) => {
  return (
    <Collapse in={expanded}>
      <Box sx={{ pl: .5, pt: 3, width: '100%' }}>
        {messages.map((message, index) => (
          <MessageItem 
            key={`${message.agent.id}-${index}`}
            message={message}
            index={index}
          />
        ))}
      </Box>
    </Collapse>
  );
};

export default MessageChain;
