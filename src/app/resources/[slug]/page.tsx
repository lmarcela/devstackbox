'use client';

import { Box, Chip, CircularProgress, Link, Skeleton, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getResourceBySlug, getResources } from '@/services/resources';
import { Resource } from '@/types/resource';

export default function ResourceDetailPage() {
  const { slug } = useParams();
  const {
    data: resource,
    isLoading,
    isError,
  } = useQuery<Resource | null>({
    queryKey: ['resource', slug],
    queryFn: () => getResourceBySlug(slug as string),
    enabled: !!slug,
  });

  if (isLoading) return <Skeleton height={200} />;

  if (isError || !resource)
    return (
      <Typography variant="h4" gutterBottom>
        Resource not found
      </Typography>
    );
  return (
    <Box className="p-6">
      <Typography variant="h4" gutterBottom>
        {resource.title}
      </Typography>

      <Typography variant="body1" className="whitespace-pre-line">
        {resource.description}
      </Typography>

      <Box className="mb-4 flex gap-2 flex-wrap">
        {resource.tags.map(tag => (
          <Chip key={tag} label={tag} />
        ))}
      </Box>

      <Link href={resource.url} target="_blank" rel="noopener">
        {resource.url}
      </Link>
    </Box>
  );
}
