import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { Resource } from '@/types/resource';

type ResourceCardprops = {
  resource: Resource;
};
export default function ResourceCard({ resource }: ResourceCardprops) {
  return (
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
  );
}
