import React, { useState, useEffect } from 'react';
import { Box, Button, Container, CssBaseline, Typography, IconButton } from '@mui/material';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskModal from './TaskModal';
import '../css/kanban.css';
import axios from 'axios';
import { toast } from 'react-toastify';

function Kanban() {
  const { isAuthenticated, loading, logout, userId } = useAuth(); 
  const navigate = useNavigate();
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: []
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalMode, setModalMode] = useState('add');
  const [initialStatus, setInitialStatus] = useState('');

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        fetchTasks();
      } else {
        navigate('/');
      }
    }
  }, [loading, isAuthenticated, navigate]);

  const fetchTasks = async () => {
    try {
      const response = await axios.post('http://localhost:8000/getAllTasks', {user_id:userId});
      const tasks = response.data.reduce((res, task) => {
        if (task.task_status === 'todo') {
          res.todo.push(task);
        } else if (task.task_status === 'inProgress') {
          res.inProgress.push(task);
        } else if (task.task_status === 'done') {
          res.done.push(task);
        }
        return res;
      }, { todo: [], inProgress: [], done: [] });
      setTasks(tasks);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  const handleSaveTask = async (updatedTask) => {
    try {
      if (modalMode === 'edit') {
        const response = await axios.post('http://localhost:8000/updateTask', { ...updatedTask, user_id: userId });
        toast.success(response.data.message);
      } else {
        const response = await axios.post('http://localhost:8000/createTask', { ...updatedTask, user_id: userId });
        toast.success(response.data.message);
      }
      fetchTasks();
      setModalOpen(false);
      setSelectedTask(null);
    } catch (error) {
      console.error('Error saving task', error);
      if (error.response && error.response.error.message) {
        toast.error(error.response.error.message);
      }
    }
  };

  const handleAddTask = (status) => {
    setSelectedTask({ task_name: '', task_description: '', task_status: status });
    setInitialStatus(status);
    setModalMode('add');
    setModalOpen(true);
  };

  const handleDeleteTask = async (taskToDelete) => {
    try {
      const response = await axios.post('http://localhost:8000/deleteTask', { ...taskToDelete, user_id: userId });
      toast.success(response.data.message);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task', error);
      toast.error(error.response.data.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
                <Box key={task.id || index} className="task-item">
                  <Typography onClick={() => handleTaskClick(task)}>{task.task_name}</Typography>
                  <IconButton color="secondary" onClick={() => handleDeleteTask(task)} className="delete-icon-button">
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
        mode={modalMode}
        initialStatus={initialStatus}
      />
    </Container>
  );
}

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default Kanban;
