import { Box, Container, Typography } from '@mui/material';
import ToggleThemeButton from '../ToggleThemeButton';
import AIDevelopmentSection from './AIDevelopmentSection';
import BuiltWith from './BuiltWith';
import Footer from './Footer';
import ResourcesSection from './ResourcesSection';
import ThemeAndStyling from './ThemeAndStyling';

const Welcome = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box className="mb-4">
        <ToggleThemeButton />
      </Box>

      <Typography variant="h3" gutterBottom fontWeight="bold" textAlign="center">
        Welcome to DevStackBox 🚀
      </Typography>

      <Typography variant="body1" textAlign="center" color="text.secondary" mb={4}>
        A modern web application built to showcase best practices with today’s top frontend
        technologies.
      </Typography>

      <BuiltWith />
      <ResourcesSection />
      <ThemeAndStyling />
      <AIDevelopmentSection />
      <Footer />
    </Container>
  );
};

export default Welcome;
