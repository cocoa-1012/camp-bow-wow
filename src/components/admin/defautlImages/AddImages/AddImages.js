import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import Card from '../../Card';
import AddTimer from './AddTimer';
import data from './data.json';
import Item from './Item';

const AdImages = () => {
  return (
    <div>
      <div>
        <Card title='AD Images'>
          <Stack direction={'row'} gap={2} flexWrap={'wrap'}>
            {data.map((item) => (
              <Item key={item.id} image={item.image} />
            ))}
          </Stack>
        </Card>
      </div>
      <Box sx={{ fontSize: '14px', mt: '8px', ml: '10px' }}>
        *Suggested image size of x * x
      </Box>
      <div>
        <Stack
          direction='row'
          gap={2}
          alignItems={'center'}
          justifyContent='end'
          sx={{ mb: '50px' }}
        >
          <div>
            <Typography variant='h6'>Rotation timer:</Typography>
          </div>
          <AddTimer />
        </Stack>
      </div>
    </div>
  );
};

export default AdImages;
