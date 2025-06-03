import { Container, Grid } from '@mui/material';
import ToggleThemeButton from '@/components/ToggleThemeButton';

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="p-4">
      <ToggleThemeButton />
      {children}
    </Container>
  );
}
