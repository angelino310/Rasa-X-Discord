const {client} = require('./admin/client');
const fs = require('fs');
const logger = require('./utils/admin/logger');
require('dotenv').config();
const TOKEN = process.env.TOKEN;

fs.readdir('./events/', (err, files) => {
	if (err) return logger.write(`An error occured while loading the client's events:\n${err.stack}`);
	files.forEach((file) => {
		if (!file.endsWith('.js')) return;
		client.on(file.split('.')[0], require(`./events/${file}`));
	});
});

(async () => {
	try {
		return client.login(TOKEN);
	} catch (err) {
		if (err) return logger.write(`There was an error connecting to the database or to Discord:\n${err.stack}`);
	}
})();