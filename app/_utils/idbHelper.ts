import { DBSchema, openDB } from 'idb';
import { Image } from '../(routes)/image/page';

const dbName = 'chatApp';
const storeName = 'images';

interface BenzouAiDB extends DBSchema {
  images: { value: Image; key: number };
}

async function getDb() {
  return openDB<BenzouAiDB>(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
}

export async function saveImage(image: Image) {
  const db = await getDb();
  const tx = db.transaction(storeName, 'readwrite');
  tx.store.add(image);
  await tx.done;
}

export async function getImages() {
  const db = await getDb();
  const tx = db.transaction(storeName, 'readonly');
  const images = await tx.store.getAll();
  await tx.done;
  return images;
}
