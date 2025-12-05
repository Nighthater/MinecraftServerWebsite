/* ========= MAIN APPLICATION ========= */

class ServerManager {
  constructor() {
    this.currentTab = TabTypes.ACTIVE;
    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      // Mark body as loaded to trigger initial animation
      document.body.classList.add('loaded');
      
      this.createTabBar();
      this.activateTab(TabTypes.ACTIVE);
      this.startStatusPolling();
      ModlistModal.init(); // Initialize modal functionality
      // Particle system is initialized automatically in particles.js
    });
  }

  createTabBar() {
    const header = document.querySelector("h1");
    const tabBar = createElement('div', 'tab-bar');

    tabBar.innerHTML = `
      <button id="tab-active" class="tab-button active">Active Servers</button>
      <button id="tab-archived" class="tab-button">Archived Servers</button>
    `;

    header.insertAdjacentElement("afterend", tabBar);

    document.getElementById("tab-active").addEventListener("click", () => this.activateTab(TabTypes.ACTIVE));
    document.getElementById("tab-archived").addEventListener("click", () => this.activateTab(TabTypes.ARCHIVED));
  }

  async activateTab(tab) {
    this.currentTab = tab;
    
    // Update tab buttons
    document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
    document.getElementById(`tab-${tab}`).classList.add("active");

    // Render appropriate servers with animation
    if (tab === TabTypes.ACTIVE) {
      await ServerRenderer.renderServers(activeServers, false);
    } else {
      await ServerRenderer.renderServers(archivedServers, true);
    }
  }

  startStatusPolling() {
    setInterval(() => {
      if (this.currentTab === TabTypes.ACTIVE) {
        ServerStatusAPI.updateAllActiveServers();
      }
    }, CONFIG.STATUS_REFRESH_MS);
  }
}

// Initialize the application
new ServerManager();