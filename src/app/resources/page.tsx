import { Grid } from '@mui/material';
import ResourceManager from '@/components/ResourceManager';
import ToggleThemeButton from '@/components/ToggleThemeButton';

export default function ResourcesPage() {
  return (
    <Grid container spacing={2} className="p-4">
      <ToggleThemeButton />
      <ResourceManager />
    </Grid>
  );
}
