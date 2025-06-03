import { Grid } from '@mui/material';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ResourceManager from '@/components/ResourceManager';
import { getResources } from '@/services/resources';
import { getQueryClient } from '../get-query-client';

export default async function ResourcesPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['resources'],
    queryFn: getResources,
  });

  return (
    <Grid container spacing={3} className="p-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ResourceManager />
      </HydrationBoundary>
    </Grid>
  );
}
