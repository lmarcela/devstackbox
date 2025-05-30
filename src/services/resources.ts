import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Resource } from '@/types/resource';

const resourcesRef = collection(db, 'resources');

export const getResources = async (): Promise<Resource[]> => {
  const snapshot = await getDocs(resourcesRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Resource[];
};

export const getResourceById = async (id: string): Promise<Resource | null> => {
  const ref = doc(db, 'resources', id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;

  return { id: snapshot.id, ...snapshot.data() } as Resource;
};

export const addResource = async (resource: Omit<Resource, 'id' | 'createdAt'>) => {
  const docRef = await addDoc(resourcesRef, {
    ...resource,
    createdAt: Timestamp.now(),
  });
  console.log('docRef');
  console.log(docRef);
  return docRef.id;
};

export const updateResource = async (id: string, data: Partial<Resource>) => {
  const ref = doc(db, 'resources', id);
  await updateDoc(ref, data);
};

export const deleteResource = async (id: string) => {
  await deleteDoc(doc(db, 'resources', id));
};
