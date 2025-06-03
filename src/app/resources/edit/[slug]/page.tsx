'use client';

import { Box, Button, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ResourceForm from '@/components/ResourceForm';
import { ReturnToResources } from '@/components/ReturnToResources';
import { useSnackbar } from '@/components/SnackbarProvider';
import { ResourceFormValues } from '@/schemas/resourceSchema';
import { getResourceBySlug, updateResource } from '@/services/resources';

type Resource = ResourceFormValues & { id: string };

export default function EditResourcePage() {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const { showSnackbar } = useSnackbar();

  const { data: resource, isLoading } = useQuery({
    queryKey: ['resource', slug],
    queryFn: () => getResourceBySlug(slug as string),
    enabled: !!slug,
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
      await updateMutationAsync({ id: resource?.id as string, data });
      return { success: true, id: resource?.id };
    } catch (error) {
      throw error;
    }
  };

  return (
    <Grid spacing={2} className="p-4">
      {!isLoading && !resource && (
        <Box className="max-w-[600px] mx-auto">
          <Typography variant="h5" mb={2} className="text-center">
            Resource not found
          </Typography>
          <ReturnToResources />
        </Box>
      )}
      {isLoading && (
        <Box className="max-w-[600px] mx-auto">
          <Typography variant="h5" mb={2} className="text-center">
            Edit resource
          </Typography>
          <Stack spacing={2}>
            <Skeleton variant="rectangular" height={56} />
            <Skeleton variant="rectangular" height={56} />
            <Skeleton variant="rectangular" height={56} />
            <Skeleton variant="rectangular" height={56} />
            <Skeleton variant="rectangular" height={80} />
            <Skeleton variant="rectangular" height={48} />
            <Skeleton variant="rectangular" height={48} />
          </Stack>
        </Box>
      )}
      {!isLoading && resource && (
        <ResourceForm onSubmit={handleEditResource} loadedValues={resource} />
      )}
    </Grid>
  );
}
