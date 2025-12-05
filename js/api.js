/* ========= API FUNCTIONS ========= */

class ServerStatusAPI {
  static getApiUrl(server) {
    const hostPort = `${server.serverIp}:${server.serverPort}`;
    return `${CONFIG.API_BASE_URL}${hostPort}`;
  }

  static async fetchServerStatus(server) {
    if (!server.serverIp) return null;

    try {
      const response = await fetch(this.getApiUrl(server));
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch status for ${server.name}:`, error);
      return null;
    }
  }

  static async updateServerStatus(server) {
    const sid = safeId(server.name);
    const statusEl = document.getElementById(`status-${sid}`);
    const playersEl = document.getElementById(`players-${sid}`);
    const pingEl = document.getElementById(`ping-${sid}`);
    const versionEl = document.getElementById(`version-${sid}`);

    if (!statusEl || !playersEl || !pingEl) return;

    const data = await this.fetchServerStatus(server);

    if (!data || !data.online) {
      this.setOfflineStatus(statusEl, playersEl, pingEl, versionEl, server);
      return;
    }

    this.setOnlineStatus(data, statusEl, playersEl, pingEl, versionEl, server);
  }

  static setOfflineStatus(statusEl, playersEl, pingEl, versionEl, server) {
  statusEl.textContent = "Offline";
  statusEl.classList.add('offline');
  statusEl.classList.remove('online');
  playersEl.textContent = "";
  pingEl.textContent = "Ping: -- ms";
  if (versionEl) {
    versionEl.textContent = `${server.type} ${server.version}`;
  }
}

static setOnlineStatus(data, statusEl, playersEl, pingEl, versionEl, server) {
  statusEl.textContent = "Online";
  statusEl.classList.add('online');
  statusEl.classList.remove('offline');

  const online = data.players?.online ?? 0;
  const max = data.players?.max ?? "?";
  playersEl.textContent = `Players: ${online}/${max}`;

  // TODO Add ping, just randomise for now
  const ping = Math.floor(Math.random() * 100) + 20;
  pingEl.textContent = `Ping: ${ping} ms`;

  const version = data.version || data.software || server.version;
  if (versionEl) {
    versionEl.textContent = `${server.type} ${version}`;
  }
}

  static updateAllActiveServers() {
    activeServers.forEach(server => {
      if (server.category === ServerCategories.ACTIVE) {
        this.updateServerStatus(server);
      }
    });
  }
}