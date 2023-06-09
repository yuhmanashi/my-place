import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type SelectProps = {
  name: string;
  options: string[];
  onChange: (option: string) => void;
}

export default function SelectMenu({ name, options, onChange }: SelectProps){
  const [option, setOption] = React.useState('All');

  useEffect(() => {
    onChange(option);
  }, [option])

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option}
          label={name}
          onChange={handleChange}
        >
          <MenuItem value={'All'}>All</MenuItem>
          {options.map(option => {
            return (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  );
}