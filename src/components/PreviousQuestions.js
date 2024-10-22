import React, { useState, useEffect, useRef } from 'react';
import { Tooltip, Menu, MenuItem, Button, List, ListItem, ListSubheader, Divider, Box, Typography, IconButton } from '@mui/material';
import moment from 'moment';
import { useAgentResponseContext } from '../contexts/AgentResponseContext';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const PreviousQuestions = ({ onFeedback }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [previousQuestions, setPreviousQuestions] = useState({});
  const previousQuestionsRef = useRef({});
  const { 
    agentQuestion,
    messages,
  } = useAgentResponseContext();

  
  const handlePreviousQClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const submitPreviousQ = (event) => {
    const question = event.currentTarget.textContent;
    agentQuestion(question);
    handleClose();
  };

  useEffect(() => {
    const storedQuestions = localStorage.getItem('previousQuestions');
    if (storedQuestions) {
      const parsedQuestions = JSON.parse(storedQuestions);
      setPreviousQuestions(parsedQuestions);
      previousQuestionsRef.current = parsedQuestions;
    }
  }, []);

  const addQuestion = (question) => {
    const today = moment().format('YYYY-MM-DD');
    const updatedQuestions = { ...previousQuestionsRef.current };
    
    if (!updatedQuestions[today]) {
      updatedQuestions[today] = [];
    }
    
    updatedQuestions[today] = [
      { text: question, timestamp: moment().valueOf() },
      ...updatedQuestions[today]
    ];

    // Keep only questions from the last 2 weeks
    const twoWeeksAgo = moment().subtract(2, 'weeks').startOf('day');
    Object.keys(updatedQuestions).forEach(date => {
      if (moment(date).isBefore(twoWeeksAgo)) {
        delete updatedQuestions[date];
      }
    });

    setPreviousQuestions(updatedQuestions);
    previousQuestionsRef.current = updatedQuestions;

    try {
      localStorage.setItem('previousQuestions', JSON.stringify(updatedQuestions));
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        // Remove the oldest day's questions
        const oldestDate = Object.keys(updatedQuestions).sort()[0];
        delete updatedQuestions[oldestDate];
        localStorage.setItem('previousQuestions', JSON.stringify(updatedQuestions));
      }
    }
  };

  const getPreviousQuestion = () => {
    const today = moment().format('YYYY-MM-DD');
    if (previousQuestionsRef.current[today] && previousQuestionsRef.current[today].length > 0) {
      return previousQuestionsRef.current[today][0].text;
    }
    return null;
  }

  // capture and store the user input each time the user enters a new chat
  useEffect(() => {
    if (messages && messages.length > 0) {
      const val = messages[messages.length - 1].input;
      const previousQuestion = getPreviousQuestion();
      if (previousQuestion !== val) { 
        addQuestion(val);
      }
    }
  }, [messages]);

  const groupedQuestions = Object.entries(previousQuestions)
    .sort(([dateA], [dateB]) => moment(dateB).diff(moment(dateA)))
    .slice(0, 8);

  return (
    <>
      <Tooltip title="View History">
        <Button
          onClick={handlePreviousQClick}
          sx={{ mr: 0, borderRight: 0 }}
          color='primary'
        >
          <KeyboardDoubleArrowUpIcon />
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: '40vh',
            maxWidth: '35vw',
          },
        }}
      >
        <Box style={{ maxHeight: 'calc(40vh - 48px)', overflowY: 'auto' }}>
          <List subheader={<li />} style={{ width: '100%' }}>
          {groupedQuestions.map(([date, questions]) => (
            <li key={date}>
              <ul style={{ padding: 0 }}>
                <ListSubheader>{moment(date).format('MMMM D, YYYY')}</ListSubheader>
                {questions.slice(0, 8).map((question, index) => (
                  <ListItem key={index} onClick={() => submitPreviousQ({ currentTarget: { textContent: question.text } })}>
                    <MenuItem style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                      {question.text}
                    </MenuItem>
                  </ListItem>
                ))}
              </ul>
            </li>
          ))}
          </List>
        </Box>
        <Divider />
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 12px',
            position: 'sticky',
            bottom: 0,
            backgroundColor: 'white',
            borderTop: '1px solid #e0e0e0'
          }}
        >
          <Typography
            style={{
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}
          >
            Previous Questions
          </Typography>
          <IconButton 
            onClick={handleClose} 
            size="small" 
            color='primary'
            sx={{
              border: '1px solid',
              borderRadius: '3px',
              padding: '2px',
            }}
          >
            <CloseOutlinedIcon sx={{ fontSize: '0.8rem' }} />
          </IconButton>
        </Box>
      </Menu>
    </>
  );
};

export default PreviousQuestions;
