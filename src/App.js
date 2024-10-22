import React, { useState } from 'react';
import { Box, ThemeProvider, CssBaseline } from '@mui/material';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import { useThemeContext } from './contexts/ThemeContext';
import { FeedbackProvider } from './contexts/FeedbackContext';
import { AgentResponseProvider } from './contexts/AgentResponseContext';
import Sidebar from './components/Sidebar';

function App() {

  const { theme } = useThemeContext();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FeedbackProvider>
        
        <AgentResponseProvider>

          <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
            <Header /> 
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>

            <Box sx={{ height: '100vh', width: isSidebarExpanded ? '20%' : '5%', minWidth: isSidebarExpanded ? '300px' : '5%', transition: 'width 0.3s' }}>
              <Sidebar
                isExpanded={isSidebarExpanded}
                toggleSidebar={toggleSidebar}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center', height: '100vh' }}>
              <ChatInterface />
            </Box>

          </Box>

        </AgentResponseProvider>
      </FeedbackProvider>
    </ThemeProvider>
  );
}

export default App;
