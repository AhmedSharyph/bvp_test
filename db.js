let db;
const request = indexedDB.open("VisitDB", 1);

request.onupgradeneeded = e => {
  db = e.target.result;
  db.createObjectStore("visits", { autoIncrement: true });
};

request.onsuccess = e => db = e.target.result;

function dbAdd(data) {
  return new Promise(resolve => {
    const tx = db.transaction("visits", "readwrite");
    tx.objectStore("visits").add(data);
    tx.oncomplete = resolve;
  });
}

function dbGetAll() {
  return new Promise(resolve => {
    const tx = db.transaction("visits", "readonly");
    const req = tx.objectStore("visits").getAll();
    req.onsuccess = () => resolve(req.result);
  });
}

function dbClear() {
  return new Promise(resolve => {
    const tx = db.transaction("visits", "readwrite");
    tx.objectStore("visits").clear();
    tx.oncomplete = resolve;
  });
}
