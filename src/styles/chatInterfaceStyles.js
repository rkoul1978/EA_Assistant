import { styled } from '@mui/material/styles';
import { Box, TextField, Button } from '@mui/material';

export const WelcomeMessageContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const FeaturedQuestionButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff6600', // FedEx orange
  color: theme.palette.common.white,
  border: '2px solid transparent', // Thicker border
  padding: theme.spacing(1, 2),
  fontSize: '0.9rem',
  textTransform: 'none',
  borderRadius: '20px',
  textAlign: 'left',
  justifyContent: 'flex-start',
  lineHeight: 1.2,
  width: 'auto',
  maxWidth: '100%',
  transition: theme.transitions.create(['border-color', 'background-color'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: '#ff6600', // Keep FedEx orange on hover
    borderColor: '#660099', // FedEx purple border on hover
    boxShadow: 'none',
  },
}));

export const ChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: theme.spacing(2),
}));

export const ChatBox = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '70%',
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  height: '100%',
}));

export const ChatPaper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper,
  },
}));

export const SendButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  right: 15,
  top: '50%',
  transform: 'translateY(-50%)',
  mr: 1
}));

export const MessageContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const IntermediateMessageContainer = styled(Box)(({ theme, isLast }) => ({
  position: 'relative',
  marginLeft: theme.spacing(4),
  paddingLeft: theme.spacing(2),
  borderLeft: isLast ? 'none' : `2px solid ${theme.palette.divider}`,
}));

export const AgentName = styled('span')(({ theme }) => ({
  fontWeight: 'bold',
  marginRight: theme.spacing(1),
}));

export const MessageContent = styled(Box)(({ theme }) => ({
  whiteSpace: 'pre-wrap',
}));

export const TimeStamp = styled('span')(({ theme }) => ({
  fontSize: '0.8rem',
  color: theme.palette.text.secondary,
}));

