import { Resource } from '@/types/resource';

let mockResources: Resource[] = [];

export const getResources = async (): Promise<Resource[]> => {
  return Promise.resolve(mockResources);
};

export const addResource = async (res: Resource): Promise<void> => {
  mockResources.push(res);
};
