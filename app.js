const GAS_URL = "PASTE_GAS_WEBAPP_URL_HERE";

async function saveVisit() {
  const data = {
    nid: document.getElementById("nid").value,
    visitType: document.getElementById("visitType").value,
    findings: document.getElementById("findings").value,
    actions: document.getElementById("actions").value,
    timestamp: new Date().toISOString()
  };
  await dbAdd(data);
  document.getElementById("status").innerText = "Saved offline";
}

async function syncData() {
  const visits = await dbGetAll();
  for (let v of visits) {
    await fetch(GAS_URL, {
      method: "POST",
      body: JSON.stringify(v)
    });
  }
  await dbClear();
  document.getElementById("status").innerText = "Synced successfully";
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
