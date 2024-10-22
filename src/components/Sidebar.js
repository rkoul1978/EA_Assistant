import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Link } from '@mui/material';
import QuestionsDialog from './QuestionsDialog';
import MenuIcon from '@mui/icons-material/Menu';
import { getPersonas } from '../integrations/personas';
import { questionsByTopic } from '../integrations/questions';
import { useAgentResponseContext } from '../contexts/AgentResponseContext';

const Sidebar = ({ isExpanded, toggleSidebar }) => {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTopic, setDialogTopic] = useState('');
  const [dialogQuestions, setDialogQuestions] = useState([]);

  const { 
    agentQuestion,
    setInput,
    handlePersonaChange,
    selectedPersona,
  } = useAgentResponseContext();

  const handleQuestionClick = (question) => {
    setInput(question);
    agentQuestion(question);
    handleDialogClose();
  };

  const handlePersonaClick = (persona) => {
    handlePersonaChange(persona);
  };

  const handleMoreClick = (topic) => {
    setDialogTopic(questionsByTopic[topic].name);
    setDialogQuestions(questionsByTopic[topic].questions);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box id="sidebar-container" sx={{ width: "100%", p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
        <IconButton onClick={toggleSidebar} sx={{ p: 0.5, size: "small", borderRadius: '50%', border: '1px solid #ddd' }}>
          <MenuIcon />
        </IconButton>
      </Box>
      {isExpanded && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
            Perspective
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {getPersonas().map((persona) => (
              <Button
                key={persona}
                variant={selectedPersona === persona ? 'contained' : 'outlined'}
                onClick={() => handlePersonaClick(persona)}
                sx={{ borderRadius: '20px', fontSize: '0.7rem', padding: '3px 8px' }}
              >
                {persona}
              </Button>
            ))}
          </Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 2, mt: 5, fontWeight: 'bold' }}>
            Top Questions
          </Typography>
          <Box sx={{ mb: 3 }}>
            <ul>
              {Object.keys(questionsByTopic).map((topic) => (
                <li key={topic}>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => handleMoreClick(topic)}
                    sx={{ display: 'block', marginTop: '8px' }}
                  >
                    {questionsByTopic[topic].name}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
        </>
      )}
      <QuestionsDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        topic={dialogTopic}
        questions={dialogQuestions}
        onQuestionClick={handleQuestionClick}
      />
    </Box>
  );
};

export default Sidebar;
