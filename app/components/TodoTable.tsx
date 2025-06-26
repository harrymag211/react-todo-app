import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button
} from '@mui/material';
import { Task } from '../types';

interface TodoTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TodoTable({ tasks, onEdit, onDelete }: TodoTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map(task => (
            <TableRow key={task.id}>
              <TableCell sx={{ fontFamily: 'monospace' }}>{task.id.slice(0, 8)}</TableCell>
              <TableCell>{task.type}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => onEdit(task)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => onDelete(task.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {tasks.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No tasks yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
