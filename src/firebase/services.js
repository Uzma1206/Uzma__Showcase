import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  getDoc,
} from 'firebase/firestore';

import { db } from './config';

const MEMORIES = 'memories';

/* -------------------- FETCH ALL MEMORIES -------------------- */
export async function fetchMemories() {
  const q = query(
    collection(db, MEMORIES),
    orderBy('createdAt', 'desc')
  );

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

/* -------------------- FETCH SINGLE MEMORY -------------------- */
export async function fetchMemory(id) {
  const snap = await getDoc(doc(db, MEMORIES, id));

  return snap.exists()
    ? {
        id: snap.id,
        ...snap.data(),
      }
    : null;
}

/* -------------------- IMGBB IMAGE UPLOAD -------------------- */
export async function uploadFile(file) {
  try {
    const formData = new FormData();

    formData.append('image', file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await response.json();

    console.log('IMGBB Response:', result);

    if (!result.success) {
      console.error('IMGBB Error:', result);
      throw new Error('IMGBB upload failed');
    }

    return (
      result.data.display_url ||
      result.data.image?.url ||
      result.data.url
    );
  } catch (error) {
    console.error('Upload Error:', error);
    throw error;
  }
}

/* -------------------- CLOUDINARY VIDEO UPLOAD -------------------- */
export async function uploadVideoToCloudinary(file) {
  try {
    const formData = new FormData();

    formData.append('file', file);
    formData.append(
      'upload_preset',
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/video/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await response.json();

    console.log('Cloudinary Response:', result);

    if (!result.secure_url) {
      console.error(result);
      throw new Error('Cloudinary upload failed');
    }

    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw error;
  }
}

/* -------------------- CREATE MEMORY -------------------- */
export async function createMemory(data) {
  return await addDoc(collection(db, MEMORIES), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

/* -------------------- UPDATE MEMORY -------------------- */
export async function updateMemory(id, data) {
  return await updateDoc(doc(db, MEMORIES, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/* -------------------- DELETE MEMORY -------------------- */
export async function deleteMemory(id) {
  return await deleteDoc(doc(db, MEMORIES, id));
}

/* -------------------- DELETE FILE -------------------- */
export async function deleteFileByUrl() {
  return true;
}