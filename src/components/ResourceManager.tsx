'use client';

import AddIcon from '@mui/icons-material/Add';
import {
  Alert,
  Button,
  Divider,
  Grid,
  Pagination,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { useFilteredResources } from '@/hooks/useFilteredResources';
import FilterBar from './FilterBar';
import ResourceCard from './ResourceCard';

export default function ResourceManager() {
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

  const { isLoading, paginated, totalPages, isError } = useFilteredResources(
    filters,
    page,
    pageSize
  );

  return (
    <Fragment>
      <Grid size={{ xs: 12, sm: 4 }}>
        <FilterBar onChange={setFilters} />
        <Button
          component={Link}
          href="/resources/add"
          className="rounded  text-white 
          dark:text-black 
          hover:opacity-90 px-4 py-2 normal-case w-full"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add resource
        </Button>
      </Grid>
      <Grid size={{ xs: 12, sm: 8 }}>
        <Divider className="my-8 flex sm:hidden" />
        <Typography variant="h6" gutterBottom>
          Resources
        </Typography>
        <Stack spacing={2}>
          {isError && (
            <Alert severity="error">
              An error occurred while loading the resources. Please try again.
            </Alert>
          )}
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  height={120}
                  animation="wave"
                  className="rounded-md"
                />
              ))
            : paginated?.map(resource => <ResourceCard key={resource.id} resource={resource} />)}
        </Stack>
        {!isLoading && totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            className="mt-4"
          />
        )}
      </Grid>
    </Fragment>
  );
}
