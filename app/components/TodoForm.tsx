import React, { useState, useEffect } from 'react';
import { Box, Button, MenuItem, Select, TextField, InputLabel, FormControl } from '@mui/material';
import { Task, TaskType } from '../types';

interface TodoFormProps {
  onSubmit: (task: Omit<Task, 'id'>, editId?: string) => void;
  editingTask?: Task | null;
  onCancelEdit?: () => void;
}

const TASK_TYPES: TaskType[] = ['Work', 'Personal', 'Study', 'Other'];

export default function TodoForm({ onSubmit, editingTask, onCancelEdit }: TodoFormProps) {
  const [type, setType] = useState<TaskType>('Work');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTask) {
      setType(editingTask.type);
      setDescription(editingTask.description);
    } else {
      setType('Work');
      setDescription('');
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    onSubmit({ type, description }, editingTask?.id);
    setDescription('');
    setType('Work');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 3 }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          value={type}
          label="Type"
          onChange={e => setType(e.target.value as TaskType)}
        >
          {TASK_TYPES.map(t => (
            <MenuItem key={t} value={t}>{t}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        sx={{width: '90%'}}
      />
      <Button type="submit" variant="contained" color="primary">
        {editingTask ? 'Update' : 'Add Task'}
      </Button>
      {editingTask && onCancelEdit && (
        <Button onClick={onCancelEdit} color="secondary" variant="outlined">
          Cancel
        </Button>
      )}
    </Box>
  );
}
