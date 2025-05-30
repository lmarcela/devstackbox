'use client';

import { Box, Chip, CircularProgress, Link, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getResources } from '@/lib/api';
import { Resource } from '@/types/resource';

export default function ResourceDetailPage() {
  const params = useParams();
  const { data: resources = [], isLoading } = useQuery<Resource[]>({
    queryKey: ['resources'],
    queryFn: getResources,
  });
  const resource: Resource | undefined = resources.find(r => r.id === params.id);

  if (isLoading) return <CircularProgress />;
  if (!resource) return <p>Resource not found</p>;

  return (
    <Box className="p-6">
      <Typography variant="h4" gutterBottom>
        {resource.title}
      </Typography>

      <Typography variant="body1">{resource.description}</Typography>

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
