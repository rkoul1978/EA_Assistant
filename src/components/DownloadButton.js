import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const DownloadButton = ({ message }) => {
  const handleDownload = async () => {

    let filename = 'download';
    let content = message.response;
    let mimeType = 'text/plain';

    // Determine file type and adjust filename and MIME type accordingly
    if (message.parsedResponse && typeof message.parsedResponse === 'object') {
      content = JSON.stringify(message.parsedResponse, null, 2);
      filename += '.json';
      mimeType = 'application/json';
    } else if (message.response.trim().startsWith('---')) {
      filename += '.yaml';
      mimeType = 'application/x-yaml';
    } else {
      filename += '.md';
      mimeType = 'text/markdown';
    }

    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Tooltip title="Download">
      <IconButton
        onClick={handleDownload}
        size="small"
        sx={{ mr: 0 }}
      >
        <DownloadIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default DownloadButton;
