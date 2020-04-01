require("dotenv").config();
const { BONIS_PREFIX, BONIS_TOKEN } = process.env;
const { CommandoClient } = require('discord.js-commando');
const client = new CommandoClient({commandPrefix: BONIS_PREFIX});

client.on("ready", () => {
    console.log(`logged in as ${client.user.username}`);
});

client.login(BONIS_TOKEN);