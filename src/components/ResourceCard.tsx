import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Card, CardContent, Chip, IconButton, Stack, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { deleteResource, updateResource } from '@/services/resources';
import { Resource } from '@/types/resource';

type ResourceCardprops = {
  resource: Resource;
};
export default function ResourceCard({ resource }: ResourceCardprops) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
  });

  const handleDelete = async (id: string) => {
    deleteMutation(id);
    queryClient.invalidateQueries({ queryKey: ['resources'] });
  };

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
        <IconButton onClick={() => handleDelete(resource.id)} color="error">
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={() => router.push(`/resources/${resource.id}/edit`)} color="info">
          <EditIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}
