"use client";

import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import TodoForm from "./components/TodoForm";
import TodoTable from "./components/TodoTable";
import { generateId } from "./utils/generateId";
import { Task } from "./types";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddOrEdit = (taskData: Omit<Task, "id">, editId?: string) => {
    if (editId) {
      setTasks((tasks) =>
        tasks.map((t) => (t.id === editId ? { ...t, ...taskData } : t))
      );
      setEditingTask(null);
    } else {
      setTasks((tasks) => [{ id: generateId(), ...taskData }, ...tasks]);
    }
  };

  const handleEdit = (task: Task) => setEditingTask(task);

  const handleDelete = (id: string) => {
    setTasks((tasks) => tasks.filter((t) => t.id !== id));
    if (editingTask?.id === id) setEditingTask(null);
  };

  const handleCancelEdit = () => setEditingTask(null);

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Todo Harsh App
      </Typography>
      <TodoForm
        onSubmit={handleAddOrEdit}
        editingTask={editingTask}
        onCancelEdit={handleCancelEdit}
      />
      <TodoTable tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
    </Container>
  );
}
