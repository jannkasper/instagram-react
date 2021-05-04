import http from "http";
import https from "https";
import app from "./app.js";
import config from "./config.js";

const protocol = config.protocol === 'http' ? http : https;
const server = protocol.createServer(app);

server.listen(config.port, () => {
    console.log(`Instagram-clone is online at port ${config.port}`);
});
