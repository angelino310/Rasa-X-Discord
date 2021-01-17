# Rasa-X-Discord
Discord Bot for Rasa

This is a simple Discord Bot that converts received messages on Discord into requests to Rasa Bot. 
Then, converts back the Rasa Bot response into a Discord Message.

# Requierements
* [node.js](https://nodejs.org/en/)
* [discord.js](https://discord.js.org/#/)

# Discord Token
Create a `.env` file in the root folder of your Discord bot

Add the token with the following format :
`TOKEN=<token>`

# How to start the bot ?
First you need to host your Rasa Bot in your localhost using :
* `rasa run -m models --enable-api --cors "*" --debug`

And if you have custom actions : 

* `rasa run actions`

Then your bot is hosted and you just need to run the Discord bot with `node index.js`

# Infos
More info on [Discord JS bots](https://discord.js.org/#/)

More info on [Rasa X HTTP API](https://rasa.com/docs/rasa-x/pages/http-api)

# Contact
If you have any question, join the [Rasa Community Discord Server](http://discord.gg/VcPMETDPN7) and tag me `@Sourceae#1767`

*PS : this is a provisory readme...*