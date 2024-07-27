import React from 'react';
import { Box, Button, Container, CssBaseline, Typography } from '@mui/material';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/kanban.css';

function Kanban() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="false" disableGutters>
      <CssBaseline />
      <Box className="task-container">
        <Box className="task-header">
          <Typography className="task-title" variant="h4">Task Management</Typography>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
        <Box className="task-columns">
          <Box className="task-column">
            <Typography className="task-column-title">To Do</Typography>
            <Box className="task-item">
              <Typography>Task 1</Typography>
            </Box>
            <Box className="task-item">
              <Typography>Task 2</Typography>
            </Box>
          </Box>
          <Box className="task-column">
            <Typography className="task-column-title">In Progress</Typography>
            <Box className="task-item">
              <Typography>Task 3</Typography>
            </Box>
          </Box>
          <Box className="task-column">
            <Typography className="task-column-title">Done</Typography>
            <Box className="task-item">
              <Typography>Task 4</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Kanban;
