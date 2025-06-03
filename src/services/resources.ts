import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Resource } from '@/types/resource';

const resourcesRef = collection(db, 'resources');

export const getResources = async (): Promise<Resource[]> => {
  const snapshot = await getDocs(resourcesRef);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    const createdAtValue =
      data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : null;

    return {
      id: doc.id,
      ...data,
      createdAt: createdAtValue,
    } as Resource;
  });
};

export const getResourceById = async (id: string): Promise<Resource | null> => {
  const ref = doc(db, 'resources', id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;

  return { id: snapshot.id, ...snapshot.data() } as Resource;
};

const generateBaseSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const addResource = async (resource: Omit<Resource, 'id' | 'createdAt' | 'slug'>) => {
  const titleQuery = query(resourcesRef, where('title', '==', resource.title));
  const titleSnapshot = await getDocs(titleQuery);

  if (!titleSnapshot.empty) {
    throw new Error('A resource with this title already exists.');
  }

  const baseSlug = generateBaseSlug(resource.title);
  let finalSlug = baseSlug;
  let counter = 1;
  let slugExists = true;

  while (slugExists) {
    const slugQuery = query(resourcesRef, where('slug', '==', finalSlug));
    const slugSnapshot = await getDocs(slugQuery);

    if (slugSnapshot.empty) {
      slugExists = false;
    } else {
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }
  }
  const docRef = await addDoc(resourcesRef, {
    ...resource,
    slug: finalSlug,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const updateResource = async (id: string, data: Partial<Resource>) => {
  const ref = doc(db, 'resources', id);
  await updateDoc(ref, data);
};

export const deleteResource = async (id: string) => {
  await deleteDoc(doc(db, 'resources', id));
};
