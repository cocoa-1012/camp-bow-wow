import { Box } from '@mui/system';
import React, { useEffect, useMemo, useState } from 'react';

import messageSound from '../../assets/sounds/new-message.mp3';
import useInnerSize from '../../hooks/useInnerSize';

const Item = ({ date, text, height = 100 }) => {
  const [isBlink, setIsBlink] = useState(false);
  useEffect(() => {
    const blinker = setInterval(() => {
      setIsBlink((p) => !p);
    }, 0.25 * 1000);
    setTimeout(() => {
      clearInterval(blinker);
      setIsBlink(false);
    }, 30 * 1000);
    return () => {
      setIsBlink(false);
      clearInterval(blinker);
    };
  }, []);

  const { width } = useInnerSize();

  useEffect(() => {
    const audio = new Audio(messageSound);
    audio.play();
  }, [text]);

  const fontSize = useMemo(() => {
    if (!text) return 0;
    let mul = 1;
    if (width > 1300) mul = 2;
    if (width > 1700) mul = 3;
    if (width > 2100) mul = 4;
    if (width > 2500) mul = 5.5;
    if (text.length > 99) return 25 * mul;
    if (text.length > 79) return 35 * mul;
    if (text.length > 49) return 45 * mul;
    if (text.length > 36) return 45 * mul;
    if (text.length > 19) return 50 * mul;
    return 60 * mul;
  }, [text, width]);

  return (
    <Box>
      <Box
        as={'div'}
        sx={{
          background: 'red',
          width: '100%',
          boxSizing: 'border-box',
          textAlign: 'center',
          py: '10px',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          px: '20px',
        }}
      >
        <Box as={'div'}></Box>
        <Box as={'h2'}>New Message</Box>
        <Box as={'h2'}>{date}</Box>
      </Box>
      <Box
        as={'h2'}
        sx={{
          background: isBlink ? 'yellow' : 'white',
          width: '100%',
          textAlign: 'center',
          py: '10px',
          color: '#000',
          fontSize,
          height: height - 10 - 60,
        }}
      >
        {text}
      </Box>
    </Box>
  );
};

export default Item;
