/* ========= MODLIST MODAL ========= */

class ModlistModal {
  static init() {
    if (!document.getElementById('modlist-modal')) {
      const modal = createElement('div', 'modal', `
        <div class="modal-content">
          <div class="modal-header">
            <h2 id="modal-title">Modlist</h2>
            <div class="modal-actions">
              <button id="modal-download-btn" class="btn-download-modlist" style="display: none;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download Modpack
              </button>
              <button class="modal-close">&times;</button>
            </div>
          </div>
          <div class="modal-body">
            <div id="modlist-content"></div>
          </div>
        </div>
      `);
      modal.id = 'modlist-modal';
      document.body.appendChild(modal);

      modal.querySelector('.modal-close').addEventListener('click', () => this.close());
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.close();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
          this.close();
        }
      });
    }
  }

  static open(serverName) {
    const modal = document.getElementById('modlist-modal');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modlist-content');
    const downloadBtn = document.getElementById('modal-download-btn');

    title.textContent = `${serverName} - Modlist`;
    
    const mods = getModlist(serverName);
    const downloadUrl = getModlistDownloadUrl(serverName);
    
    // Show/hide download button
    if (downloadUrl) {
      downloadBtn.style.display = 'flex';
      downloadBtn.onclick = () => window.open(downloadUrl, '_blank');
    } else {
      downloadBtn.style.display = 'none';
    }
    
    if (mods.length === 0) {
      content.innerHTML = `
        <div class="no-mods">
          <p>This server does not require any mods.</p>
        </div>
      `;
    } else {
      content.innerHTML = `
        <div class="mods-count">Total mods: ${mods.length}</div>
        <div class="mods-list">
          ${mods.map(mod => `
            <div class="mod-item">
              <div class="mod-name">${escapeHtml(mod.name)}</div>
              <div class="mod-version">${escapeHtml(mod.version)}</div>
              <div class="mod-description">${escapeHtml(mod.description)}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  static close() {
    const modal = document.getElementById('modlist-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ModlistModal.init();
});