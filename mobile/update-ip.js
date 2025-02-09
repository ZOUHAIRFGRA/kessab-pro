const { networkInterfaces } = require("os");
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, ".env");

const nets = networkInterfaces();
let localIP = "localhost";

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    if (net.family === "IPv4" && !net.internal) {
      localIP = net.address;
    }
  }
}

let envData = {};
if (fs.existsSync(envPath)) {
  const fileContent = fs.readFileSync(envPath, "utf-8");
  fileContent.split("\n").forEach((line) => {
    if (line.trim() && line.includes("=")) {
      const [key, value] = line.split("=");
      envData[key] = value;
    }
  });
}

envData["SERVER_IP"] = localIP;

const newEnvContent = Object.entries(envData)
  .map(([key, value]) => `${key}=${value}`)
  .join("\n");

fs.writeFileSync(envPath, newEnvContent);

console.log(`✅ Updated .env with SERVER_IP: ${localIP}`);
