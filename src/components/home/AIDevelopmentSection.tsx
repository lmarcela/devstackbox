import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Box, Divider, Stack, Typography } from '@mui/material';

export default function AIDevelopmentSection() {
  return (
    <Box className="max-w-4xl mx-auto mt-12 px-4">
      <Typography variant="h5" className="flex items-center gap-2 mb-2">
        <SmartToyIcon fontSize="medium" /> AI-powered Development
      </Typography>
      <Divider className="mb-4" />
      <Stack spacing={2}>
        <Typography variant="body1">
          🤖 This project was enhanced using <strong>Generative AI tools</strong> like ChatGPT for
          architectural guidance, syntax refinement, UI ideas, and boilerplate generation — saving
          hours of repetitive coding and research.
        </Typography>
        <Typography variant="body1">
          🧠 AI played a key role in debugging, structuring custom hooks, composing pagination
          strategies, and writing optimized TypeScript logic.
        </Typography>
        <Typography variant="body1">
          By leveraging AI as a coding assistant, development became faster, more focused, and
          knowledge was expanded across unfamiliar tech like Firebase queries.
        </Typography>
      </Stack>
    </Box>
  );
}
