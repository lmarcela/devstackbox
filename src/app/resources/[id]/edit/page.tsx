'use client';

import { CircularProgress, Grid, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import ResourceForm from '@/components/ResourceForm';
import ToggleThemeButton from '@/components/ToggleThemeButton';
import { ResourceFormValues } from '@/schemas/resourceSchema';
import { addResource, getResourceById, updateResource } from '@/services/resources';

type Resource = ResourceFormValues & { id: string };

export default function EditResourcePage() {
  const { id: resourceId } = useParams();
  const queryClient = useQueryClient();

  const { data: resource, isLoading } = useQuery({
    queryKey: ['resource', resourceId],
    queryFn: () => getResourceById(resourceId as string),
    enabled: !!resourceId,
  });

  const { mutate: updateMutation } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Resource> }) => updateResource(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
  });

  const handleEditResource = (data: ResourceFormValues) => {
    updateMutation({ id: resourceId as string, data });
  };

  if (isLoading) return <CircularProgress />;
  if (!resource) return <p>Resource not found</p>;

  return (
    <Grid spacing={2} className="p-4">
      <ToggleThemeButton />
      <Typography variant="h5" mb={2}>
        Edit resource
      </Typography>
      <ResourceForm onSubmit={handleEditResource} loadedValues={resource!} />
    </Grid>
  );
}
