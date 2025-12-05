/* ========= RENDER FUNCTIONS ========= */

class ServerRenderer {
  static async renderServers(serverList, isArchived = false) {
    const container = document.getElementById("servers-container");
    
    // Fade out current content
    container.classList.add('fade-out');
    
    // Wait for fade out to complete
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Clear and update content
    container.innerHTML = "";
    
    serverList.forEach(server => {
      const card = this.createServerCard(server, isArchived);
      container.appendChild(card);
    });

    // Fade in new content
    container.classList.remove('fade-out');
    
    if (!isArchived) {
      ServerStatusAPI.updateAllActiveServers();
    }
  }

  static createServerCard(server, isArchived) {
    const sid = safeId(server.name);
    const card = createElement('div', 'server-card');
    card.id = `card-${sid}`;

    card.innerHTML = this.buildCardHTML(server, isArchived, sid);
    return card;
  }

  static buildCardHTML(server, isArchived, sid) {
  return `
    ${server.preview ? `<img class="server-preview" src="${escapeHtml(server.preview)}" alt="${escapeHtml(server.name)}">` : ''}
    
    <div class="card-header">
      <h2 class="server-name">${escapeHtml(server.name)}</h2>
      <div class="server-description">${escapeHtml(server.description)}</div>
    </div>

    <div class="card-content">
      ${this.buildServerInfoBlock(server, isArchived, sid)}
      ${this.buildStatusBlock(server, isArchived, sid)}
    </div>

    <div class="card-divider"></div>

    ${this.buildCardButtons(server, isArchived)}
  `;
}

  static buildServerInfoBlock(server, isArchived, sid) {
    if (isArchived) {
      return `
        <div class="info-block">
          <div class="info-item">
            <span class="info-text">${escapeHtml(server.address)}</span>
          </div>
          <div class="info-item">
            <span class="version-text">${escapeHtml(server.type)} ${escapeHtml(server.version)}</span>
          </div>
        </div>
      `;
    }

    return `
      <div class="info-block">
        <div class="info-item with-copy">
          <span class="info-text">${escapeHtml(server.address)}</span>
          <button class="btn-copy-small" onclick="navigator.clipboard.writeText('${escapeHtml(server.address)}'); showCopyToast();">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
        <div class="info-item">
          <span class="version-text" id="version-${sid}">${escapeHtml(server.type)} ${escapeHtml(server.version)}</span>
        </div>
      </div>
    `;
  }

    static buildStatusBlock(server, isArchived, sid) {
    if (isArchived) {
      return `
        <div class="status-block">
          <div class="status-item">
            <span class="status-text offline">${escapeHtml(server.statusText || "Archived")}</span>
          </div>
        </div>
      `;
    }

    return `
      <div class="status-block">
        <div class="status-item">
          <span class="status-text" id="status-${sid}">Loading status…</span>
        </div>
        <div class="status-item">
          <span class="players-text" id="players-${sid}"></span>
        </div>
        <div class="status-item">
          <span class="ping-text" id="ping-${sid}">Ping: -- ms</span>
        </div>
      </div>
    `;
  }

  static buildCardButtons(server, isArchived) {
  if (isArchived) {
    return `
      <div class="card-buttons">
        <button class="btn-download" onclick="window.open('${escapeHtml(server.worldDownload)}','_blank')">
          World Download
        </button>
      </div>
    `;
  }

  const buttons = [];
  
  if (server.modlistUrl || getModlist(server.name).length > 0) {
    buttons.push(`
      <button class="btn-modlist" onclick="ModlistModal.open('${escapeHtml(server.name)}')">
        Modlist
      </button>
    `);
  }

  if (server.mapUrl) {
    buttons.push(`
      <button class="btn-map" onclick="window.open('${escapeHtml(server.mapUrl)}','_blank')">
        Open Map
      </button>
    `);
  }

  return `
    <div class="card-buttons">
      ${buttons.join('')}
    </div>
  `;
  }
}