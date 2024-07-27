// src/components/TaskModal.js
import React, { useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Task name is required'),
  description: Yup.string().required('Description is required'),
  status: Yup.string().required('Status is required')
});

function TaskModal({ open, onClose, task, onSave }) {
  // Initialize Formik with the current task data
  const initialValues = {
    name: '',
    description: '',
    status: ''
  };

  useEffect(() => {
    if (task) {
      // Set form data when task changes
      initialValues.name = task.name;
      initialValues.description = task.description;
      initialValues.status = task.status;
    }
  }, [task]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSave(values);
          onClose();
        }}
      >
        {({ errors, touched, handleChange, handleBlur, values }) => (
          <Form>
            <DialogContent>
              <Field
                as={TextField}
                margin="dense"
                name="name"
                label="Task Name"
                fullWidth
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                helperText={touched.name ? errors.name : ''}
                error={touched.name && Boolean(errors.name)}
              />
              <Field
                as={TextField}
                margin="dense"
                name="description"
                label="Description"
                fullWidth
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                helperText={touched.description ? errors.description : ''}
                error={touched.description && Boolean(errors.description)}
              />
              <Field
                as={TextField}
                margin="dense"
                name="status"
                label="Status"
                fullWidth
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.status}
                helperText={touched.status ? errors.status : ''}
                error={touched.status && Boolean(errors.status)}
              />
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
