import React, { useState } from 'react';
import { IconButton, Tooltip, Menu, MenuItem } from '@mui/material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';

const ResponseRating = ({ onFeedback }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleVoteClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFeedback = (feedbackType) => {
    onFeedback(feedbackType);
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Rate This Response">
        <IconButton
          onClick={handleVoteClick}
          size="small"
          sx={{ mr: 0 }}
        >
          <HowToVoteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleFeedback('very_helpful')}>Very Helpful</MenuItem>
        <MenuItem onClick={() => handleFeedback('helpful')}>Helpful</MenuItem>
        <MenuItem onClick={() => handleFeedback('accurate_but_not_helpful')}>Accurate but Not Helpful</MenuItem>
        <MenuItem onClick={() => handleFeedback('not_very_accurate')}>Not Very Accurate</MenuItem>
        <MenuItem onClick={() => handleFeedback('not_accurate')}>Not Accurate</MenuItem>
       </Menu>
    </>
  );
};

export default ResponseRating;
