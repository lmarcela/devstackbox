'use client';

import { CircularProgress, Grid, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import FilterBar from '@/components/FilterBar';
import ResourceManager from '@/components/ResourceManager';
import ToggleThemeButton from '@/components/ToggleThemeButton';
import { useFilteredResources } from '@/hooks/useFilteredResources';

export default function ResourcesPage() {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    tags: [] as string[],
  });

  const [page, setPage] = useState(1);
  const pageSize = 2;

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const { isLoading, paginated, totalPages } = useFilteredResources(filters, page, pageSize);
  if (isLoading) return <CircularProgress />;

  return (
    <Grid container spacing={3} className="p-4">
      <ToggleThemeButton />
      <Grid size={{ xs: 12, sm: 4 }}>
        <FilterBar onChange={setFilters} />
        <Link href="/resources/add">Add resource</Link>
      </Grid>
      <Grid size={{ xs: 12, sm: 8 }}>
        <ResourceManager filtered={paginated} />
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            sx={{ mt: 2 }}
          />
        )}
      </Grid>
    </Grid>
  );
}
