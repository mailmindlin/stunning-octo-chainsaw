const http = require('http');
const url = require('url');
const WebSocketServer = require('ws').Server;
const express = require('express');
//const PushNotifications = new require('node-pushnotifications');
const config = require('config');

var server = http.createServer();
var wss = new WebSocketServer({server: server});
var app = express();

var teams = {
	"strathhaven": {
		name: "Strath Haven"
	}
};

app.use('/', express.static(__dirname + '/static'));

app.get('/api', (req, res) => {
	res.json({
		"teams": {
			"GET": {
				"description": "List teams"
			}
		}
	});
});

app.get('/api/team/:name', (req, res)=>{
	if (!(req.params.name in teams))
		res.json(teams);
	else
		res.json(teams[req.params.name]);
});

wss.on('connection', (ws) => {
	console.log(ws.upgradeReq);
	var location = url.parse(ws.upgradeReq.url, true);
	ws.on('message', (message) => {
		console.log('Recieved message: %s', message);
	});
	ws.send('tmp');
});

var serverConfig = config.get('server');
server.on('request', app);
server.listen(serverConfig.port, () => {
	console.log('Listening on ' + JSON.stringify(server.address()));
});