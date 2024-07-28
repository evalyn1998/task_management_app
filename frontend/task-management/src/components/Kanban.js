import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline, Typography, IconButton } from '@mui/material';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the delete icon
import TaskModal from './TaskModal';
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

  const updateTaskAPI = async (updatedTask) =>{

  }

  const addTaskAPI = async (updatedTask) =>{
    console.log(updatedTask);
  }

  const handleSaveTask = async (updatedTask) => {
    if (selectedTask) {
      const { column } = selectedTask;
      let updatedTasks;

      if (selectedTask.name) {
        // Existing task - call update API
        await updateTaskAPI(updatedTask);
        updatedTasks = tasks[column].map(task =>
          task.name === selectedTask.name ? { ...updatedTask } : task
        );
      } else {
        // New task - call add API
        await addTaskAPI(updatedTask);
        updatedTasks = [...tasks[column], updatedTask];
      }

      setTasks(prevTasks => ({
        ...prevTasks,
        [column]: updatedTasks
      }));
    }
  };

  const handleAddTask = (column) => {
    setModalOpen(true);
    setSelectedTask({ name: '', description: '', status: column });
  };

  const handleDeleteTask = (taskToDelete, column) => {
    const updatedTasks = tasks[column].filter(task => task.name !== taskToDelete.name);
    setTasks(prevTasks => ({
      ...prevTasks,
      [column]: updatedTasks
    }));
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
                <Box key={index} className="task-item">
                  <Typography onClick={() => handleTaskClick(task, column)}>{task.name}</Typography>
                  <IconButton color="secondary" onClick={() => handleDeleteTask(task, column)} className="delete-icon-button">
                    <DeleteIcon />
                  </IconButton>
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
