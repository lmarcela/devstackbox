import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getResources } from '@/services/resources';
import { Resource } from '@/types/resource';

type Filters = {
  search: string;
  category: string;
  tags: string[];
};

export const useFilteredResources = (filters: Filters, page: number, pageSize: number) => {
  const { data: resources = [], isLoading } = useQuery<Resource[]>({
    queryKey: ['resources'],
    queryFn: getResources,
  });

  const filtered = useMemo(() => {
    return resources.filter(r => {
      const matchSearch =
        filters.search === '' ||
        r.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        r.description?.toLowerCase().includes(filters.search.toLowerCase());

      const matchCategory = filters.category === '' || r.category === filters.category;

      const matchTags =
        filters.tags.length === 0 || filters.tags.every(tag => r.tags.includes(tag));

      return matchSearch && matchCategory && matchTags;
    });
  }, [resources, filters]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const totalPages = Math.ceil(filtered.length / pageSize);

  return { isLoading, paginated, totalPages };
};
