import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  task_name: Yup.string().required('Task name is required'),
  task_description: Yup.string().required('Description is required'),
  task_status: Yup.string().required('Status is required')
});

function TaskModal({ open, onClose, task, onSave, mode, initialStatus }) {
  const [initialValues, setInitialValues] = useState({
    task_name: '',
    task_description: '',
    task_status: initialStatus || ''
  });

  useEffect(() => {
    if (task) {
      setInitialValues({
        task_name: task.task_name,
        task_description: task.task_description,
        task_status: task.task_status
      });
    } else {
      setInitialValues({
        task_name: '',
        task_description: '',
        task_status: initialStatus || ''
      });
    }
  }, [task, initialStatus]);

  const statusOptions = [
    { value: 'todo', label: 'Todo' },
    { value: 'inProgress', label: 'In Progress' },
    { value: 'done', label: 'Done' }
  ];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{mode === 'edit' ? 'Edit Task' : 'Add Task'}</DialogTitle>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (mode === 'edit') {
            onSave({ ...task, ...values }); // Update existing task
          } else {
            onSave(values); // Add new task
          }
          onClose();
        }}
      >
        {({ errors, touched, handleChange, handleBlur, values }) => (
          <Form>
            <DialogContent>
              <Field
                as={TextField}
                margin="dense"
                name="task_name"
                label="Task Name"
                fullWidth
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.task_name}
                helperText={touched.task_name ? errors.task_name : ''}
                error={touched.task_name && Boolean(errors.task_name)}
              />
              <Field
                as={TextField}
                margin="dense"
                name="task_description"
                label="Description"
                fullWidth
                variant="outlined"
                onChange={handleChange}
                multiline
                onBlur={handleBlur}
                value={values.task_description}
                helperText={touched.task_description ? errors.task_description : ''}
                error={touched.task_description && Boolean(errors.task_description)}
              />
              <FormControl fullWidth variant="outlined" margin="dense" error={touched.task_status && Boolean(errors.task_status)}>
                <InputLabel>Status</InputLabel>
                <Field
                  as={Select}
                  name="task_status"
                  label="Status"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.task_status}
                >
                  {statusOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
                {touched.task_status && Boolean(errors.task_status) && (
                  <div style={{ color: '#f44336', marginTop: '0.75rem', fontSize: '0.75rem' }}>{errors.task_status}</div>
                )}
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

export default TaskModal;
