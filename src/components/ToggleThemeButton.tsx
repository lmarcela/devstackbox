'use client';

import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useColorMode } from '@/theme/ColorModeContext';

export default function ToggleThemeButton() {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  return (
    <Box className="w-full flex justify-end">
      <IconButton onClick={toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Box>
  );
}
