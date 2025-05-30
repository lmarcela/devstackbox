'use client';

import { CircularProgress, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Link from 'next/link';
import FilterBar from '@/components/FilterBar';
import ResourceManager from '@/components/ResourceManager';
import ToggleThemeButton from '@/components/ToggleThemeButton';
import { getResources } from '@/lib/api';
import { Resource } from '@/types/resource';

export default function ResourcesPage() {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    tags: [] as string[],
  });

  const { data: resources = [], isLoading } = useQuery<Resource[]>({
    queryKey: ['resources'],
    queryFn: getResources,
  });

  const filtered = resources.filter(r => {
    const matchSearch =
      filters.search === '' || r.title.toLowerCase().includes(filters.search.toLowerCase());

    const matchCategory = filters.category === '' || r.category === filters.category;

    const matchTags = filters.tags.length === 0 || filters.tags.every(tag => r.tags.includes(tag));

    return matchSearch && matchCategory && matchTags;
  });
  if (isLoading) return <CircularProgress />;

  return (
    <Grid container spacing={3} className="p-4">
      <ToggleThemeButton />
      <Grid size={{ xs: 12, sm: 4 }}>
        <FilterBar onChange={setFilters} />
        <Link href="/resources/add">Add resource</Link>
      </Grid>
      <Grid size={{ xs: 12, sm: 8 }}>
        <ResourceManager filtered={filtered} />
      </Grid>
    </Grid>
  );
}
