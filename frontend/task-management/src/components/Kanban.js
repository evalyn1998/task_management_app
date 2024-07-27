// src/components/Kanban.js
import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline, Typography, IconButton } from '@mui/material';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add'; // Import the plus icon
import TaskModal from './TaskModal'; // Import the TaskModal component
import '../css/kanban.css';

function Kanban() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState({
    todo: [{ name: 'Task 1', description: 'Description for Task 1', status: 'todo' }, { name: 'Task 2', description: 'Description for Task 2', status: 'todo' }],
    inProgress: [{ name: 'Task 3', description: 'Description for Task 3', status: 'inProgress' }],
    done: [{ name: 'Task 4', description: 'Description for Task 4', status: 'done' }]
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleTaskClick = (task, column) => {
    setSelectedTask({ ...task, column });
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSaveTask = (updatedTask) => {
    if (selectedTask) {
      const { column } = selectedTask;
      const updatedTasks = tasks[column].map(task =>
        task.name === selectedTask.name ? { ...updatedTask } : task
      );
      setTasks(prevTasks => ({
        ...prevTasks,
        [column]: updatedTasks
      }));
    }
  };

  const handleAddTask = (task, column) => {
    setModalOpen(true);
    // const newTaskName = prompt('Enter new task name:');
    // if (newTaskName) {
    //   const newDescription = prompt('Enter description for the new task:');
    //   if (newDescription) {
    //     setTasks(prevTasks => ({
    //       ...prevTasks,
    //       [column]: [...prevTasks[column], { name: newTaskName, description: newDescription, status: column }]
    //     }));
    //   }
    // }
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
          {Object.entries(tasks).map(([column, taskList]) => (
            <Box key={column} className="task-column">
              <Box className="task-column-header">
                <Typography className="task-column-title">{capitalizeFirstLetter(column)}</Typography>
                <IconButton color="primary" onClick={() => handleAddTask(column)} className="add-icon-button">
                  <AddIcon />
                </IconButton>
              </Box>
              {taskList.map((task, index) => (
                <Box key={index} className="task-item" onClick={() => handleTaskClick(task, column)}>
                  <Typography>{task.name}</Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>

      <TaskModal
        open={modalOpen}
        onClose={handleModalClose}
        task={selectedTask}
        onSave={handleSaveTask}
      />
    </Container>
  );
}

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default Kanban;
