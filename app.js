const net = require("net");
const client = new net.Socket();

const token = '$2y$10$9z/ch9hTc5rNQF9ks7cQoui5ISEeTCa73Ixm3c2UiJawY33WrnuuG';

client.connect(25053, "127.0.0.1", () => {
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
}, 3000);
