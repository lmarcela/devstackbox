'use client';

import { Grid } from '@mui/material';
import FilterBar from '@/components/FilterBar';
import ResourceManager from '@/components/ResourceManager';
import ToggleThemeButton from '@/components/ToggleThemeButton';

export default function ResourcesPage() {
  return (
    <Grid container spacing={2} className="p-4">
      <ToggleThemeButton />
      <FilterBar onChange={() => {}} />
      <ResourceManager />
    </Grid>
  );
}
