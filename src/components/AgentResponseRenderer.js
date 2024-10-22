import React from 'react';
import { Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import yaml from 'js-yaml';

const detectContentType = (content) => {
  if (content.trim().startsWith('{') || content.trim().startsWith('[')) {
    try {
      JSON.parse(content);
      return 'json';
    } catch (e) {
      // Not JSON
    }
  }
  
  try {
    yaml.load(content);
    return 'yaml';
  } catch (e) {
    // Not YAML
  }

  // Default to markdown
  return 'markdown';
};

const wrapNonMarkdown = (content, type) => {
  return `\`\`\`${type}\n${content}\n\`\`\``;
};

const LLMResponseRenderer = ({ content }) => {
  const contentType = detectContentType(content);
  
  if (contentType !== 'markdown') {
    content = wrapNonMarkdown(content, contentType);
  }

  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkGfm]}
      components={{
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        }
      }}
    />
  );
};

const AgentResponseRenderer = ({ response }) => {
  return (
    <Box>
      <Typography variant="body1" component="div">
        <LLMResponseRenderer content={response} />
      </Typography>
    </Box>
  );
};

export default AgentResponseRenderer;
