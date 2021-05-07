const net = require("net");
const client = new net.Socket();
const { v4: uuidv4 } = require('uuid');

// @todo token authentication
const token = '$2y$10$9z/ch9hTc5rNQF9ks7cQoui5ISEeTCa73Ixm3c2UiJawY33WrnuuG';

client.on("data", (data) => {
   console.log("R: " + data);
});

client.on("close", () => {
    console.log("Connection closed");
});

const schema = (uuid, command, params) => `cmd={"uuid":"${uuid}","name":"${command}","params":"${params}"}`;

setInterval(() => {
    let command = "get", params = "DB_NAME", query = schema(uuidv4(), command, params);
    console.log("S: " + query);
    client.write(query);
}, 3000);

client.connect(25053, "127.0.0.1", () => {
    let command = "auth", params = token, query = schema(uuidv4(), command, params);
    console.log("Connected established");
    client.write(query, "utf8");
});
