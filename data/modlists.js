/* ========= MODLIST DATA ========= */

const modlists = {
  "Server 1": {
    downloadUrl: "https://example.com/",
    mods: [
      { name: "Create", version: "v0.5.1", description: "Adds mechanical contraptions" },
      { name: "Flywheel", version: "v0.6.1", description: "Create's rendering library" },
      { name: "Jei", version: "v1.0.0", description: "Just Enough Items" },
      { name: "JourneyMap", version: "v5.9.7", description: "Real-time mapping" },
      { name: "AppleSkin", version: "v2.5.1", description: "Food-related information" }
    ]
  }
};

function getModlist(serverName) {
  return modlists[serverName] ? modlists[serverName].mods : [];
}

function getModlistDownloadUrl(serverName) {
  return modlists[serverName] ? modlists[serverName].downloadUrl : null;
}