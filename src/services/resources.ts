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
import slugify from 'slugify';
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

export const getResourceBySlug = async (slug: string): Promise<Resource | null> => {
  const q = query(collection(db, 'resources'), where('slug', '==', slug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as Resource;
};

const getUniqueSlug = async (title: string): Promise<string> => {
  const baseSlug = slugify(title, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const q = query(resourcesRef, where('slug', '==', slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) break;

    slug = `${baseSlug}-${counter++}`;
  }

  return slug;
};

export const addResource = async (resource: Omit<Resource, 'id' | 'createdAt' | 'slug'>) => {
  const slug = await getUniqueSlug(resource.title);

  const newData = {
    ...resource,
    slug,
    createdAt: new Date().toISOString(),
  };

  const docRef = await addDoc(resourcesRef, newData);
  return docRef.id;
};

export const updateResource = async (id: string, data: Partial<Resource>) => {
  const ref = doc(db, 'resources', id);
  await updateDoc(ref, data);
};

export const deleteResource = async (id: string) => {
  await deleteDoc(doc(db, 'resources', id));
};
