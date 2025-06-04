import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ResourceProps } from '@/types/resource';
import ResourceActions from './ResourceActions';

export default function ResourceCard({ resource }: ResourceProps) {
  const router = useRouter();

  return (
    <Card key={resource.id} variant="outlined">
      <CardContent>
        <Typography
          variant="h6"
          onClick={() => router.push(`/resources/${resource.slug}`)}
          className="underline"
        >
          {resource.title}
        </Typography>
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
          <Typography variant="body1" className="whitespace-pre-line line-clamp-2 pt-4">
            {resource.description}
          </Typography>
        )}
        <ResourceActions resource={resource} />
      </CardContent>
    </Card>
  );
}
