import { Grid } from '@mui/material';
import React from 'react';
import { getAuthUserId } from '../../utils/auth';
import Content from './Content';
import RightSideArea from './RightSideArea';

const BackDisplayContent = () => {
  if (!getAuthUserId()) return 'You are not authorized';
  return (
    <div>
      <Grid container>
        <Grid sx={12} sm={12} md={8} lg={9}>
          <Content />
        </Grid>
        <Grid xs={12} sm={12} md={4} lg={3}>
          <RightSideArea />
        </Grid>
      </Grid>
    </div>
  );
};

export default BackDisplayContent;
