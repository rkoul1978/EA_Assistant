import React, { useState } from 'react';
import { AGENT_TYPE_USER } from '../agents/Agent';
import { Box, Typography, Fade, Avatar, IconButton, Tooltip } from '@mui/material';
import ResponseRating from './ResponseRating';
import MessageChain from './MessageChain';
import AgentResponseRenderer from './AgentResponseRenderer';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PersonIcon from '@mui/icons-material/Person';
import { startCase } from 'lodash';
import DownloadButton from './DownloadButton';

const ChatMessage = ({ message }) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!message) {
    console.error('Message is undefined');
    return null;
  }

  const handleExpand = () => {
    setExpanded(!expanded);
    setTimeout(() => {
      const chatContainer = document.getElementById('chat-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 0); // Adjust the timeout duration if needed
    setTimeout(() => {
      const chatContainer = document.getElementById('chat-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 300); // Adjust the timeout duration if needed
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.response).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };


  const onFeedback = (FeedbackType) =>{
    console.log('Feedback type:'+ FeedbackType);
  }

  const isUser = message.agent.type === AGENT_TYPE_USER;
  const AgentIcon = message.agent.icon || PersonIcon;
  const agentColor = message.agent.color || '#000000';

  return (
    <Fade in={true} timeout={500}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 1,
          justifyContent: isUser ? 'flex-end' : 'flex-start',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            { !isUser && (
              <Avatar sx={{ mr: 1, bgcolor: agentColor, width: 24, height: 24 }}>
                <AgentIcon sx={{ color: 'white', fontSize: 16 }} />
              </Avatar>
            )}
            <Typography variant="body1" fontWeight="bold">
              {message.agent.name} 
              <Typography variant="body2" component="span">
                &nbsp;(perspective {startCase(message.agent.persona)})
              </Typography>
            </Typography>
            { isUser && (
              <Avatar sx={{ ml: 1, bgcolor: agentColor, width: 24, height: 24 }}>
                <AgentIcon sx={{ color: 'white', fontSize: 16 }} />
              </Avatar>
            )}
          </Box>
        </Box>

        <Box sx={{
          display: 'flex',
          justifyContent: isUser ? 'flex-end' : 'flex-start',
        }}>
          <Box
            sx={{
              p: 2,
              width: isUser ? 'auto' : '100%',
              maxWidth: isUser ? '70%' : '100%',
              borderRadius: isUser ? '20px 20px 0 20px' : '20px',
              backgroundColor: 'background.paper',
              color: 'text.primary',
              border: '1px solid',
              borderColor: 'divider',
              borderLeft: isUser ? 'none' : `4px solid ${agentColor}`,
              borderRight: isUser ? `4px solid ${agentColor}` : 'none',
              alignSelf: isUser ? 'flex-end' : 'flex-start',
              position: 'relative',
            }}
          >
            {isUser ? (
              <Typography variant="body1">
                {message.response}
              </Typography>
            ) : (
              <AgentResponseRenderer response={message.response} />
            )}
          </Box>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mt: 0.5, 
          justifyContent: 'space-between',
          width: '100%',
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
            {!isUser && (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mt: 1,
              }}>

                {message.agent.children && message.agent.children.length > 0 && (
                  <Tooltip title={expanded ? "Collapse" : "Expand"}>
                    <IconButton 
                      onClick={handleExpand} 
                      size="small" 
                      sx={{
                        border: '1px solid',
                        borderColor: 'gray',
                        backgroundColor: 'gray',
                        color: 'white',
                        borderRadius: '50%',
                        '&:hover': {
                          backgroundColor: 'white',
                          color: 'gray',
                        },
                        mr: 1,
                        p: 0,
                        ml: .5,
                      }}
                    >
                      {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                    </IconButton>
                  </Tooltip>
                )}

                <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
                  <IconButton
                    onClick={handleCopy}
                    size="small"
                    sx={{ mr: 0 }}
                  >
                    {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                  </IconButton>
                </Tooltip>
                <DownloadButton message={message} />

                <ResponseRating
                  onFeedback={onFeedback}
                />

              </Box>

            )}
          </Box>
          {!isUser && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', height: '100%' }}>
              <Typography variant="caption">
                {message.time}&nbsp;ms
              </Typography>
            </Box>
          )}
        </Box>

        {message.agent.children && message.agent.children.length > 0 && (
          <MessageChain
            messages={message.agent.children}
            expanded={expanded}
          />
        )}
      </Box>
    </Fade>
  );
};

export default ChatMessage;
