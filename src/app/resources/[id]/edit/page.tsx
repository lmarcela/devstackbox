'use client';

import { CircularProgress, Grid, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import ResourceForm from '@/components/ResourceForm';
import { useSnackbar } from '@/components/SnackbarProvider';
import ToggleThemeButton from '@/components/ToggleThemeButton';
import { ResourceFormValues } from '@/schemas/resourceSchema';
import { getResourceById, updateResource } from '@/services/resources';

type Resource = ResourceFormValues & { id: string };

export default function EditResourcePage() {
  const { id: resourceId } = useParams();
  const queryClient = useQueryClient();

  const { showSnackbar } = useSnackbar();

  const { data: resource, isLoading } = useQuery({
    queryKey: ['resource', resourceId],
    queryFn: () => getResourceById(resourceId as string),
    enabled: !!resourceId,
  });

  const { mutateAsync: updateMutationAsync } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Resource> }) => updateResource(id, data),
    onSuccess: () => {
      showSnackbar(`Resource successfully updated!`, 'success');
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
    onError: error => {
      showSnackbar(`${error}`, 'error');
    },
  });

  const handleEditResource = async (data: ResourceFormValues) => {
    try {
      await updateMutationAsync({ id: resourceId as string, data });
      return { success: true, id: resourceId };
    } catch (error) {
      throw error;
    }
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
