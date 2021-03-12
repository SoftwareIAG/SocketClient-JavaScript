require('dotenv').config();

const net = require('net');
const client = new net.Socket();

client.connect(process.env.SERVER_PORT, process.env.SERVER_IP, () => {
    console.log("Connected");
    client.write("First Ping ... \n");
});

client.on("data", (data) => {
   console.log("Received: " + data);

   setTimeout(() => {
       let sent = "Pong ... \n";
       client.write(sent);
       console.log("Send: " + sent);
   }, process.env.DEFAULT_PONG_INTERVAL);
});

client.on("close", () => {
    console.log("Connection closed");
});
