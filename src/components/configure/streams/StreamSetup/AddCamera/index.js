import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  FormHelperText,
  Modal,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addStreamAsync } from '../../../../../features/stream/thunks';
import { getAuthUserId } from '../../../../../utils/auth';
import Toggle from './Toggle';

const AddCamera = ({ open, setOpen }) => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      status: 1,
      isGroup: false,
      cameraName: '',
    },
  });

  const dispatch = useDispatch();
  const submitHandler = (values) => {
    const data = {
      ...values,
      userId: getAuthUserId(),
    };
    console.log(data);

    dispatch(
      addStreamAsync({
        data,
        callBack: (result) => {
          if (result) {
            reset();
            setOpen(false);
          }
        },
      })
    );
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          reset();
          setOpen(false);
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={styles.main} component={Paper}>
          <Box
            sx={styles.content}
            onClick={() => setOpen(false)}
            component='div'
          >
            <CloseIcon />
          </Box>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Box as='div' sx={{ width: '100%' }}>
              <div>
                <Typography>
                  Web Cams {watch('isGroup') ? '(Group)' : ''} :
                </Typography>
                <OutlinedInput
                  id='component-outlined'
                  {...register('cameraName', {
                    required: 'This field is required!',
                  })}
                  fullWidth
                  size='small'
                />
                <div>
                  {errors?.cameraName && (
                    <FormHelperText sx={{ color: 'red' }}>
                      {errors.cameraName.message}
                    </FormHelperText>
                  )}
                </div>
              </div>

              <Stack
                direction='row'
                spacing={3}
                alignItems='center'
                sx={{ mt: 2 }}
              >
                <Typography>Status</Typography>
                <Toggle
                  {...register('status')}
                  onChange={(e) => {
                    setValue('status', e.target.checked ? 1 : 0);
                  }}
                  defaultChecked
                  checked={watch('status')}
                />
                <div>
                  {errors?.status && (
                    <FormHelperText sx={{ color: 'red' }}>
                      {errors.status.message}
                    </FormHelperText>
                  )}
                </div>
              </Stack>

              <Stack
                direction='row'
                spacing={3}
                alignItems='center'
                sx={{ mt: 2 }}
              >
                <Typography>Group </Typography>
                <Toggle
                  {...register('isGroup')}
                  onChange={(e) => {
                    setValue('isGroup', e.target.checked);
                  }}
                  defaultChecked={true}
                  checked={watch('isGroup')}
                />
                <div>
                  {errors?.isGroup && (
                    <FormHelperText sx={{ color: 'red' }}>
                      {errors.isGroup.message}
                    </FormHelperText>
                  )}
                </div>
              </Stack>
            </Box>

            {/* submit button */}
            <Box sx={styles.submitButton}>
              <Button variant='contained' type='submit'>
                Add Camera
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddCamera;

const styles = {
  main: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      xs: '70%',
      md: '35%',
      xl: '30%',
    },
    bgcolor: 'background.paper',
    p: 4,
    overflowX: 'auto',
    height: {
      xs: '60vh',
      md: '80vh',
      xl: 'auto',
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'end',
    ':hover': {
      cursor: 'pointer',
    },
  },

  submitButton: {
    display: 'flex',
    justifyContent: 'start',
    my: '10px',
  },
};
