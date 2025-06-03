'use client';

import { Grid, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ResourceForm from '@/components/ResourceForm';
import { useSnackbar } from '@/components/SnackbarProvider';
import ToggleThemeButton from '@/components/ToggleThemeButton';
import { ResourceFormValues } from '@/schemas/resourceSchema';
import { addResource } from '@/services/resources';

export default function AddResourcePage() {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  const { mutateAsync: createResourceAsync } = useMutation({
    mutationFn: addResource,
    onSuccess: () => {
      showSnackbar(`Resource successfully created!`, 'success');
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
    onError: error => {
      showSnackbar(`${error}`, 'error');
    },
  });

  const handleAddResource = async (data: ResourceFormValues) => {
    try {
      const resourceId = await createResourceAsync(data);
      return { success: true, id: resourceId };
    } catch (error) {
      throw error;
    }
  };

  return (
    <Grid spacing={2} className="p-4">
      <ToggleThemeButton />
      <Typography variant="h5" mb={2}>
        Add new resource
      </Typography>
      <ResourceForm onSubmit={handleAddResource} />
    </Grid>
  );
}
