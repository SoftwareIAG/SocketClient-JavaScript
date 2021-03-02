const net = require("net");
const client = new net.Socket();

client.connect(25503, "127.0.0.1", () => {
    console.log("Connected");
    client.write("First Ping ... \n");
});

client.on("data", (data) => {
   console.log("Received: " + data);

   setTimeout(() => {
       let sent = "Pong ... \n";
       client.write(sent);
       console.log("Send: " + sent);
   }, 3000);
});

client.on("close", () => {
    console.log("Connection closed");
});
