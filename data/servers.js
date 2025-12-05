/* ========= SERVER DATA ========= */

const ServerCategories = {
  ACTIVE: 'active',
  ARCHIVED: 'archived'
};

// Active / playable servers
const activeServers = [
  {
    category: ServerCategories.ACTIVE,
    name: "Server 1",
    preview: "images/server1.png",
    address: "example.com",
    mapUrl: "https://map.example.com",
    modlistUrl: "#", // Add modlist URL
    description: "Description",
    serverIp: "example.com",
    serverPort: 25565,
    type: "Vanilla",
    version: "1.XX.X"
  },
];

// Archived / no longer playable servers
const archivedServers = [
  {
    category: ServerCategories.ARCHIVED,
    name: "Archived Server Name",
    preview: "images/server2.png",
    address: "N/A",
    mapUrl: "N/A",
    worldDownload: "downloads/oldworld1.zip",
    description: "Description",
    version: "Minecraft 1.XX.X",
    mods: "Vanilla",
    statusText: "May 2021 - Oct 2022"
  },
];