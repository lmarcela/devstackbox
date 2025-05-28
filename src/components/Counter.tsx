'use client';

import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Typography variant="body2">{count} likes</Typography>
      <Button size="small" onClick={() => setCount(count + 1)}>
        Click me!
      </Button>
    </>
  );
};
