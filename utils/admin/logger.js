const fs = require('fs');

module.exports = {
	write: (log) => {
		const date = new Date();
		const formattedLog = `# ${date.toLocaleDateString()} - ${date.toLocaleTimeString()}\n${log}\n`;
		fs.appendFile(`${__dirname}/../../admin/logs.md`, formattedLog, function (err) {
			if (err) return console.error(err);
		});
	},
};
