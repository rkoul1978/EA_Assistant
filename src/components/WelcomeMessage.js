import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import { WelcomeMessageContainer, FeaturedQuestionButton } from '../styles/chatInterfaceStyles';
import { featuredQuestions } from '../integrations/questions';
import logo from '../assets/images/logo.png';
import { useAgentResponseContext } from '../contexts/AgentResponseContext';

const WelcomeMessage = () => {
  const { 
    agentQuestion,
    setInput,
  } = useAgentResponseContext();

  return (
    <WelcomeMessageContainer>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <img src={logo} alt="FedEx Architecture Support" style={{ width: '40%', maxWidth: '300px', marginBottom: '1rem' }} />
          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 3, mt: 0 }}>
            Enterprise Architecture Assistant
          </Typography>
          <Typography variant="body1" paragraph align="left" sx={{ mb: 4, maxWidth: '800px' }}>
            This tool empowers architects, development teams, and IT professionals with comprehensive resources on enterprise architecture. Discover detailed guidelines, core principles, reference architectures, and design patterns. Access team support and navigate essential processes to ensure your projects align with best practices and organizational standards.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', mb: 4 }}>
            {featuredQuestions.map((question, index) => (
              <FeaturedQuestionButton
                key={index}
                variant="contained"
                onClick={() => {
                  setInput(question);
                  agentQuestion(question);
                }}
                size="small"
              >
                {question}
              </FeaturedQuestionButton>
            ))}
          </Box>
        </Box>
      </Container>
    </WelcomeMessageContainer>
  );
};

export default WelcomeMessage;
