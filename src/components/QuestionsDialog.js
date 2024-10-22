import React from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, IconButton, ListItemIcon } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';

const QuestionsDialog = ({ open, onClose, topic, questions, onQuestionClick }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {topic}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <List>
          {questions.map((question, index) => (
            <ListItem button key={index} onClick={() => { onQuestionClick(question); onClose(); }}>
              <ListItemIcon sx={{ minWidth: 'auto', marginRight: '8px', display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={question} primaryTypographyProps={{ variant: 'body2' }} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionsDialog;
