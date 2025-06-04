import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteResource } from '@/services/resources';
import { ResourceProps } from '@/types/resource';
import ConfirmDialog from './ConfirmDialog';

const ResourceActions = ({ resource }: ResourceProps) => {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const queryClient = useQueryClient();

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
    <Fragment>
      <IconButton color="error" onClick={() => setConfirmOpen(true)}>
        <DeleteIcon />
      </IconButton>
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          handleDelete(resource.id);
          setConfirmOpen(false);
        }}
        title="Delete resource?"
        description="This action will permanently delete the resource."
        confirmText="Delete"
        cancelText="Cancel"
      />
      <IconButton onClick={() => router.push(`/resources/${resource.slug}/edit`)} color="info">
        <EditIcon />
      </IconButton>
    </Fragment>
  );
};

export default ResourceActions;
