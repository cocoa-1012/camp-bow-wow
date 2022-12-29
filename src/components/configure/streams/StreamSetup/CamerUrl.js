import { Button, FormHelperText, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  useGetConfigsQuery,
  useUpdateConfigMutation,
} from '../../../../features/userConfig/userConfigApiSlice';
import { getAuthUserId } from '../../../../utils/auth';
const CameraUrl = () => {
  const [updateConfig] = useUpdateConfigMutation();
  const { data, isLoading, isError } = useGetConfigsQuery();
  const {
    register,
    formState: { errors },
    handleSubmit,

    setValue,
  } = useForm({
    defaultValues: {
      cameraUrl: '',
    },
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      setValue('cameraUrl', data?.[0]?.cameraUrl || '');
    }
  }, [data, isLoading, isError, setValue]);

  const submitHandler = (values) => {
    const dataObj = {
      ...values,
      userId: getAuthUserId(),
    };

    updateConfig({ id: data?.[0]?.id, data: dataObj });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Stack direction='column' gap={1} sx={{ py: '12px' }}>
        <>
          <Box>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              label='Camera'
              variant='outlined'
              placeholder='Default camera url'
              {...register('cameraUrl', {
                required: 'This field is required!',
              })}
              fullWidth
            />
          </Box>
          {errors?.cameraUrl && (
            <div>
              <FormHelperText sx={{ color: 'red' }}>
                {errors.cameraUrl.message}
              </FormHelperText>
            </div>
          )}
        </>
        <Box sx={styles.submitButton}>
          <Button variant='contained' type='submit'>
            Add Camera
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default CameraUrl;

const styles = {
  submitButton: {
    display: 'flex',
    justifyContent: 'start',
  },
};
