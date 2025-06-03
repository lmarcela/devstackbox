'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import Link from 'next/link';
import { ResourceFormValues, resourceSchema } from '@/schemas/resourceSchema';
import { Resource } from '@/types/resource';
import { availableTags, categories } from '@/utils/common';
import { ReturnToResources } from './ReturnToResources';

type ResourceFormProps = {
  onSubmit: (data: ResourceFormValues) => Promise<{
    success: boolean;
  }>;
  loadedValues?: Resource;
};
export default function ResourceForm({ onSubmit, loadedValues }: ResourceFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ResourceFormValues>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      title: loadedValues?.title || '',
      url: loadedValues?.url || '',
      category: loadedValues?.category || '',
      tags: loadedValues?.tags || [],
      description: loadedValues?.description || '',
    },
  });

  const onInternalSubmit = async (data: ResourceFormValues) => {
    await onSubmit(data);
    !loadedValues && reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onInternalSubmit)}
      noValidate
      className="max-w-[600px] mx-auto"
    >
      <Typography variant="h5" mb={2} className="text-center">
        {`${loadedValues ? 'Edit' : 'Add'}  resource`}
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Title"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
          fullWidth
        />

        <TextField
          label="URL"
          {...register('url')}
          error={!!errors.url}
          helperText={errors.url?.message}
          fullWidth
        />

        <FormControl fullWidth error={!!errors.category}>
          <InputLabel>Category</InputLabel>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Category">
                {categories.map(cat => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.category?.message}</FormHelperText>
        </FormControl>

        <FormControl fullWidth error={!!errors.tags}>
          <InputLabel>Tags</InputLabel>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                multiple
                input={<OutlinedInput label="Tags" />}
                renderValue={selected => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map(value => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {availableTags.map(tag => (
                  <MenuItem key={tag} value={tag}>
                    {tag}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.tags?.message}</FormHelperText>
        </FormControl>

        <TextField
          label="Description (optional)"
          {...register('description')}
          multiline
          rows={3}
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary">
          Save resource
        </Button>
        <ReturnToResources />
      </Stack>
    </Box>
  );
}
