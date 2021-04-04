require('dotenv').config();

const net = require('net');
const client = new net.Socket();

const token = process.env.APP_TOKEN;

client.connect(process.env.SERVER_PORT, process.env.SERVER_IP, () => {
    console.log("Connected");
    client.write("AUTHENTICATION=" + token, "utf8");
});

client.on("data", (data) => {
   console.log("Received: " + data + "\n");
});

client.on("close", () => {
    console.log("Connection closed");
});

setInterval(() => {
    let sent = "Pong ...";
    client.write(sent);
    console.log("Send: " + sent);
}, process.env.DEFAULT_PONG_INTERVAL);
