import { LoadingButton } from '@mui/lab';
import { Box, Stack, TextField } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessageAsync } from '../../../features/message/thunks';
import { useGetConfigsQuery } from '../../../features/userConfig/userConfigApiSlice';
import { getAuthUserId } from '../../../utils/auth';
const Item = () => {
  const { data: config, isSuccess } = useGetConfigsQuery();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { isLoading } = useSelector((state) => state.messages);

  const dispatch = useDispatch();

  const sendHandler = () => {
    if (!message) return;
    setLoading(true);
    const data = {
      userId: getAuthUserId(),
      message,
      dateTime: moment(),
      days: 0,
      duration: config[0]?.defaultDuration,
      lastSent: null,
      type: '',
      category: 'general',
    };
    dispatch(addMessageAsync(data));
    setTimeout(() => {
      setLoading(isLoading);
      setMessage('');
    }, 2000);
  };
  if (!isSuccess) return null;

  return (
    <div>
      <Stack direction='row' gap={2} alignItems={'start'} flexWrap='wrap'>
        <Box sx={{ flex: 1, minWidth: { xs: '130px' } }}>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            label='General Message'
            variant='outlined'
            placeholder='Input here'
            multiline
            rows={5}
            maxRows={10}
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Box>
        <div>
          <LoadingButton
            loading={loading}
            onClick={sendHandler}
            variant='contained'
            sx={{ background: '#6087d4' }}
          >
            Send
          </LoadingButton>
        </div>
      </Stack>
    </div>
  );
};

export default Item;
