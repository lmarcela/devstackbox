'use client';

import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { availableTags, categories } from '@/utils/common';

type Props = {
  onChange: (filters: { search: string; category: string; tags: string[] }) => void;
};

export default function FilterBar({ onChange }: Props) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    onChange({ search, category, tags: newTags });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    onChange({ search: val, category, tags: selectedTags });
  };

  const handleCategoryChange = (e: any) => {
    const val = e.target.value;
    setCategory(val);
    onChange({ search, category: val, tags: selectedTags });
  };

  return (
    <Stack spacing={2} className="mb-4">
      <TextField label="Search" value={search} onChange={handleSearch} fullWidth />

      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={handleCategoryChange} label="Categoría">
          <MenuItem value="">All</MenuItem>
          {categories.map(cat => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Stack direction="row" spacing={1} flexWrap="wrap">
        {availableTags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            color={selectedTags.includes(tag) ? 'primary' : 'default'}
            onClick={() => handleTagToggle(tag)}
          />
        ))}
      </Stack>
    </Stack>
  );
}
