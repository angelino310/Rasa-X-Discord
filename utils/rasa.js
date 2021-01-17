const fetch = require('node-fetch');
const {Discord} = require('../admin/client')
const emojis = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟']
let payloads = []
//TODO : gestion conversation_id


// "POST" request to rasa server
const rasaRequest = (message, content) => {
	const question = content;
	const body = { 'message' : question };
	fetch('http://localhost:5005/webhooks/rest/webhook', {
		method: 'post',
		body:    JSON.stringify(body),
		headers: { 'content-type': 'application/json' },
	})  
	.then(res => res.json())
	.then(json => {
		displayResponse(json, message)
	});
}

// Convert rasa response from json to embed
const displayResponse = async (json,message) => {
	const responseEmbed = new Discord.MessageEmbed();
	let sentMsg;
	let buttonFlag = false;
	let nbEmoji;
	//console.log(json) // debug rasa response
	for (let i = 0 ; i < json.length ; i++){
		for (const [key, value] of Object.entries(json[i])) {
			switch(key) {
				case "text" :
					responseEmbed.setDescription(`${value}`)
					break
				case "image" : 
					responseEmbed.setImage(`${value}`)
					break
				case "buttons" :
					buttonFlag = true;
					nbEmoji = value.length
                    handleButton(responseEmbed, value)
                    
			}
		}
	}
	// console.log(responseEmbed) // debug 
	sentMsg = await message.channel.send(responseEmbed);

	// Add reactions to the message when the rasa response contains a "button" field
	if (buttonFlag) {
		addReactions(sentMsg,nbEmoji,message)
	}
}

// Update embed description according to the button payloads
const handleButton = (responseEmbed, value) => {
	for (let j = 1 ; j < value.length+1 ; j++){	
		responseEmbed.description = responseEmbed.description + `
		${emojis[j-1]} → ${value[j-1].title}`
		payloads.push(value[j-1].payload)
	}
}

// Adding reactions according to the number of the options given by rasa
const addReactions = (sentMsg,nbEmoji,message) => {
		const filter = (reaction, user) => {
			return emojis.includes(reaction.emoji.name) && user.id === message.author.id ;
		};
		const collector = sentMsg.createReactionCollector(filter, { max: 1, time: 1000000, errors: ['time'] });
		for (let e = 0 ; e < nbEmoji ; e++) {
			sentMsg.react(emojis[e])
		}
		collector.on('collect', async (reaction) => {
			payload = payloads[emojis.findIndex(emoji => emoji === reaction.emoji.name)]
			rasaRequest(message,payload)
		});
}

module.exports = rasaRequest;