const statusDiv = document.getElementById('status');
const tabs = document.querySelectorAll('.tab');
let currentVersion = 'java';

async function fetchServerStatus(version) {
  let apiUrl = '';
  if (version === 'java') {
    apiUrl = 'https://api.mcstatus.io/v2/status/java/1gsrv.falixsrv.me:25565';
  } else if (version === 'bedrock') {
    apiUrl = 'https://api.mcstatus.io/v2/status/bedrock/1gsrv.falixsrv.me:19132';
  }

  statusDiv.innerHTML = 'Lade Statusdaten...';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    statusDiv.innerHTML = '';

    if (data.online) {
      statusDiv.innerHTML = `
        <div class="online">✅ Server ist ONLINE (${version.toUpperCase()})</div>
        <div class="info">MOTD: ${data.motd.clean}</div>
        <div class="info">Spieler: ${data.players.online}/${data.players.max}</div>
        <div class="info">Version: ${data.version.name}</div>
        <div class="info">Ping: ${data.latency}ms</div>
      `;
    } else {
      statusDiv.innerHTML = `<div class="offline">❌ Server ist OFFLINE (${version.toUpperCase()})</div>`;
    }
  } catch (error) {
    statusDiv.innerHTML = '❌ Fehler beim Laden der Statusdaten!';
    console.error(error);
  }
}

// Tabs Umschalten
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentVersion = tab.dataset.version;
    fetchServerStatus(currentVersion);
  });
});

// Initial laden
fetchServerStatus(currentVersion);

// Automatisch alle 60 Sekunden neu laden
setInterval(() => {
  fetchServerStatus(currentVersion);
}, 60000);
