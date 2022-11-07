import React from 'react'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@mui/material';

import api from '../services/api'

const CardTask = ({ task }) => {

  const deleteTask = (id) => {
    console.log('delete', id)
    api.delete(`/tasks/${id}`)
  }

  const updateTask = (id) => {
    console.log('update', id)
    api.put(`/tasks/${id}`, {
      data: {
        title: task.title,
        status: !task.status
      }
    })
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {task.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => updateTask(task._id)} variant={task.status === 'pendiente' ? 'outlined' : ''}>{task.status}</Button>
        <Button onClick={() => deleteTask(task._id)} variant="outlined" color="error">
          Eliminar
        </Button>
      </CardActions>
    </Card>
  )
}

export default CardTask