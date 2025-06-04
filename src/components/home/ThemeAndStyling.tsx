import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Box, Divider, Stack, Typography } from '@mui/material';

export default function ThemeAndStyling() {
  return (
    <Box className="max-w-4xl mx-auto mt-12 mb-4 px-4">
      <Typography variant="h5" className="flex items-center gap-2 mb-2">
        <DarkModeIcon fontSize="medium" /> Theme & Styling
      </Typography>
      <Divider className="mb-4" />
      <Stack spacing={2}>
        <Typography variant="body1">
          ✨ The app includes a <strong>theme toggle button</strong> located in the top bar. You can
          easily switch between <strong>Light</strong> and <strong>Dark</strong> modes to enhance
          your user experience and comfort.
        </Typography>
        <Typography variant="body1">
          🧩 The project was carefully configured to combine <strong>Material UI</strong>
          &rsquo;s powerful components and theming system with the flexibility of{' '}
          <strong>Tailwind CSS</strong> utility classes.
        </Typography>
        <Typography variant="body1">
          This setup gives you the best of both worlds: MUI&rsquo;s accessibility and design
          patterns, and Tailwind&rsquo;s utility-first rapid styling — with full support for
          responsive layouts and dark mode.
        </Typography>
        <Typography variant="body1">
          Custom themes are managed via MUI&rsquo;s <code>ThemeProvider</code>, while global styles
          and additional utility classes are powered by Tailwind&rsquo;s configuration.
        </Typography>
      </Stack>
    </Box>
  );
}
