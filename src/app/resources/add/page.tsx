'use client';

import { Grid, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import ResourceForm from '@/components/ResourceForm';
import ToggleThemeButton from '@/components/ToggleThemeButton';
import { addResource } from '@/lib/api';
import { ResourceFormValues } from '@/lib/zodSchemas';

type Resource = ResourceFormValues & { id: string };

export default function AddResourcePage() {
  const queryClient = useQueryClient();
  const { mutate: createResource } = useMutation({
    mutationFn: addResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
  });

  const handleAddResource = (data: ResourceFormValues) => {
    const newResource: Resource = {
      ...data,
      id: uuidv4(),
    };
    createResource(newResource);
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
