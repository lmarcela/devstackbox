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
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { ResourceFormValues, resourceSchema } from '@/lib/zodSchemas';
import { availableTags, categories } from '@/utils/common';

export default function ResourceForm({
  onSubmit,
}: {
  onSubmit: (data: ResourceFormValues) => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ResourceFormValues>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      title: '',
      url: '',
      category: '',
      tags: [],
      description: '',
    },
  });

  const onInternalSubmit = (data: ResourceFormValues) => {
    onSubmit(data);
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onInternalSubmit)}
      noValidate
      sx={{ mt: 2, maxWidth: 600 }}
    >
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
      </Stack>
    </Box>
  );
}
