const express = require('express');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const cors = require('cors');
const cluster = require('cluster');
const fs = require('fs');
const socketIo = require("socket.io");
const GroupController = require('./controllers/group-controller');


const key = fs.readFileSync('./private/ssl/private.key');
const cert = fs.readFileSync( './private/ssl/certificate.crt' );
const ca = fs.readFileSync( './private/ssl/ca_bundle.crt' );

if (cluster.isMaster) {
    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for dying workers
    cluster.on('exit', function (worker) {

        // Replace the dead worker, we're not sentimental
        console.log('Worker %d died :(', worker.id);
        cluster.fork();

    });
} else {
    const db = require('./db');
    // const apiRouter = require('./routes/api-router');
    const groupRouter = require('./routes/group-router');
    const excelRouter = require('./routes/excel-router');
    const scoreRouter = require('./routes/score-router');
    
    const app = express();
    const options = {
        key: key,
        cert: cert,
        ca: ca,
        passphrase: 'bonsey_team'
    }

    const apiPort = 3000;
    const apiHttpsPort = 443;
    
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cors())
    app.use(bodyParser.json())
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Request-Headers", "*");
        res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT, PATCH');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Credentials", true);
        next();
    });

    db.on('error', console.error.bind(console, 'MongoDB connection error:'))
    
    app.use('/api/group', groupRouter);
    app.use('/api/excel', excelRouter);
    app.use('/api/score', scoreRouter);
    
    console.log('=======process.env=========');
    let server = null;
    let port = apiPort;
    if(process.env === 'production') {
        console.log('=======production=========');
        http.createServer(app).listen(apiPort, () => {
            console.log(`Server running on port ${apiPort}`);
            console.log('Worker %d running!', cluster.worker.id);
        });
        server = https.createServer(options, app);
        port = apiHttpsPort;
    } else {
        console.log('=======development=========');
        server = http.createServer(app);
    }

    const io = socketIo(server);

    io.on("connection", async socket => {
        console.log("New client connected");
    
        // //Here we listen on a new namespace called "incoming data"
        socket.on("UPDATE_GROUP", async () => {
            //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
            const dataGroup = await GroupController.socketGetGroups();
            socket.broadcast.emit("GET_DATA_GROUPS", JSON.stringify(dataGroup));
        });
    
        //A special namespace "disconnect" for when a client disconnects
        socket.on("disconnect", () => console.log("Client disconnected"));
    });

    server.listen(port, () => {
        console.log(`Http listening on port ${port}`);
        console.log('Worker %d running!', cluster.worker.id);
    })
}