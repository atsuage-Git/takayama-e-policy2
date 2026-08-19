// IndexedDB wrapper to persist uploaded slide images reliably across sessions

const DB_NAME = 'guidebook_images_db';
const DB_VERSION = 1;
const STORE_NAME = 'page_images';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveImagesToStorage(images: Record<number, string>): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    
    // Clear old entries
    await new Promise<void>((resolve, reject) => {
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });

    // Put new entries
    for (const [key, value] of Object.entries(images)) {
      store.put(value, Number(key));
    }

    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('Failed to save images to IndexedDB:', err);
  }
}

export async function loadImagesFromStorage(): Promise<Record<number, string>> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    
    return new Promise((resolve) => {
      const request = store.openCursor();
      const result: Record<number, string> = {};
      
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          result[Number(cursor.key)] = cursor.value;
          cursor.continue();
        } else {
          resolve(result);
        }
      };
      
      request.onerror = () => {
        resolve({});
      };
    });
  } catch (err) {
    console.warn('Failed to load images from IndexedDB:', err);
    return {};
  }
}

export async function clearImagesFromStorage(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.clear();
  } catch (err) {
    console.warn('Failed to clear images from IndexedDB:', err);
  }
}
