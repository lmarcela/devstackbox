import { Resource } from '@/types/resource';

const STORAGE_KEY = 'mock-resources';

const loadFromStorage = (): Resource[] => {
  const data = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
  return data ? JSON.parse(data) : [];
};

const saveToStorage = (resources: Resource[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
};

export const getResources = async (): Promise<Resource[]> => {
  const resources = loadFromStorage();
  return Promise.resolve(resources);
};

export const addResource = async (res: Resource): Promise<void> => {
  const resources = loadFromStorage();
  const updated = [...resources, res];
  saveToStorage(updated);
  return Promise.resolve();
};
