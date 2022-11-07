import React, { useState, useEffect } from 'react'
import axios from 'axios'
import api from "../services/api";
import CardTask from '../components/CardTask';
import {
  Box,
  Container,
} from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const Tasks = () => {

  const [taskState, setTaskState] = useState([])
  const [filterStatus, setFilterStatus] = useState('')

  const handleChange = (event) => {
    console.log(event)
    setFilterStatus(event.target.value);
    api.get('/tasks').then(({ data }) => {
      console.log('poke', data)
      setTaskState(data.data.filter((task) => task.status === event.target.value))
    })
  };

  useEffect(() => {
    [
      api.get('/tasks').then(({ data }) => {
        console.log('poke', data)
        setTaskState(data.data)
      })
    ]
  }, []);

  return (
    <div>
      <Container>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            {/* <InputLabel id="demo-simple-select-label">Filtrar por</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterStatus}
              label="status"
              onChange={handleChange}
            >
              <MenuItem value={'completado'}>Completado</MenuItem>
              <MenuItem value={'pendiente'}>Pendiente</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div>
          {
            taskState && taskState.map((task) => {
              return (
                <Box key={task._id} sx={{ my: 2 }} >
                  <CardTask task={task} />
                </Box>
              )
            })
          }
        </div>
      </Container>
    </div>
  )
}

export default Tasks