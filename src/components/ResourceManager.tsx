'use client';

import { Divider, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';
import { Resource } from '@/types/resource';
import ResourceCard from './ResourceCard';

type ResourceManagerProps = {
  filtered: Resource[];
};

export default function ResourceManager({ filtered }: ResourceManagerProps) {
  return (
    <Fragment>
      <Divider className="my-8 flex sm:hidden" />
      <Typography variant="h6" gutterBottom>
        Resources
      </Typography>
      <Stack spacing={2}>
        {filtered?.map(resource => <ResourceCard key={resource.id} resource={resource} />)}
      </Stack>
    </Fragment>
  );
}
