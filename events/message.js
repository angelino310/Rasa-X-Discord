const  rasaRequest = require('../utils/rasa.js')

module.exports = (message) => {
    if (message.author.bot) return;
    rasaRequest(message, message.content);
}