import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import Card from '../../Card';
import AddCamera from './AddCamera';
import Form from './Form';
import Table from './Table';

const StreamSetup = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Box>
      <Card
        title='Stream Setup'
        color='#6087d4'
        hasButton
        button={<CreateButton setOpen={setOpen} />}
      >
        <Form value={value} setValue={setValue} />
        <Table value={value} />
      </Card>
      <AddCamera open={open} setOpen={setOpen} />
    </Box>
  );
};

const CreateButton = ({ setOpen }) => {
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant='contained'
        size='small'
        color='info'
      >
        Create
      </Button>
    </>
  );
};

export default StreamSetup;
