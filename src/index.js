require("dotenv").config();
const { BONIS_PREFIX, BONIS_TOKEN, SERVER_ID, TEST_SERVER_ID, TEST_NEW_ROLE_ID, NEW_ROLE_ID, CHANNEL_PREFIX, TEST_CATEGORY_ID } = process.env;
const { CommandoClient } = require('discord.js-commando');
const client = new CommandoClient({commandPrefix: BONIS_PREFIX});

client.once("ready", () => {
    client.user.setStatus("idle");
});

client.on("ready", () => {
    console.log(`logged in as ${client.user.username}`);
});

client.once("guildMemberAdd", async member => {
    let serverid = client.guilds.cache.get(TEST_SERVER_ID);
    let role = serverid.roles.cache.get(TEST_NEW_ROLE_ID);
    try {
        await member.roles.add(role.id);
    } catch (e) {
        console.error(e);
    }
    serverid.channels.create(`${CHANNEL_PREFIX}${member.id}`, "text").then(channel => {
        channel.setParent(TEST_CATEGORY_ID);
        channel.send(`greetings Mr./Ms. ${member.user.username}, please provide us with your Facebook name below.`);
    });
});

client.login(BONIS_TOKEN);