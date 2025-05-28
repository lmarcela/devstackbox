'use client';

import {
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getResources } from '@/lib/api';

export default function ResourceManager() {
  const { data: resources, isLoading } = useQuery({
    queryKey: ['resources'],
    queryFn: getResources,
  });

  if (isLoading) return <CircularProgress />;

  return (
    <Container maxWidth="sm">
      <Link href="/resources/add">Add resource</Link>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>
        Saved resources
      </Typography>
      <Stack spacing={2}>
        {resources?.map(resource => (
          <Card key={resource.id} variant="outlined">
            <CardContent>
              <Typography variant="h6">{resource.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  {resource.url}
                </a>
              </Typography>
              <Typography variant="subtitle2" mt={1}>
                Category: {resource.category}
              </Typography>
              <Stack direction="row" spacing={1} mt={1}>
                {resource.tags.map(tag => (
                  <Chip key={tag} label={tag} size="small" />
                ))}
              </Stack>
              {resource.description && (
                <Typography variant="body2" mt={1}>
                  {resource.description}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
