import React from 'react';
import { Alert, AlertTitle, Box, Fade } from '@mui/material';

interface ErrorMessageProps {
  title?: string;
  message: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
  show: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ title, message, severity = 'error', show }) => {
  return (
    <Fade in={show} timeout={300}>
      <Box
        sx={{
          position: 'fixed',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1300, // Ensure it appears above other elements
          my: 2,
        }}
      >
        <Alert severity={severity}>
          {title && <AlertTitle>{title}</AlertTitle>}
          {message}
        </Alert>
      </Box>
    </Fade>
  );
};

export default ErrorMessage;