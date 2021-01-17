const { client } = require('../admin/client');

module.exports = () => {
	client.user.setPresence({
		status: 'online',
		activity: {
			name: 'UPSSITECH',
			type: 'WATCHING',
		},
	});
	console.log('Ready!');
};
