import { TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';

const Form = ({ value = '', setValue }) => {
  return (
    <div>
      <Stack direction='row' gap={4} sx={{ py: '12px' }}>
        <div>
          <Box sx={{ flex: 1 }}>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              label='Camera'
              variant='outlined'
              placeholder='Input here'
              value={value}
              onChange={(e) => setValue(e.target.value)}
              fullWidth
            />
          </Box>
        </div>
      </Stack>
    </div>
  );
};

export default Form;
