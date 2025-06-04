'use client';

import { Brightness4, Brightness7 } from '@mui/icons-material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useColorMode } from '@/theme/ColorModeContext';

export default function ToggleThemeButton() {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  return (
    <Box className="w-full flex justify-end">
      <DarkModeIcon onClick={toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </DarkModeIcon>
    </Box>
  );
}
