import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box, IconButton, Link as MuiLink, Stack, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box className="mt-16 py-6 text-center border-t border-gray-300 dark:border-gray-700">
      <Stack direction="row" spacing={2} justifyContent="center" mb={1}>
        <IconButton
          component="a"
          href="https://github.com/lmarcela"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.linkedin.com/in/marcela-malaver/?locale=en_US"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </IconButton>
      </Stack>
      <Typography variant="body2">
        Built by{' '}
        <MuiLink
          href="https://github.com/MarcelaMalaver"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          Marcela Malaver
        </MuiLink>{' '}
        — 2025
      </Typography>
    </Box>
  );
}
