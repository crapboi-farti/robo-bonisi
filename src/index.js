require("dotenv").config();
const { BONIS_PREFIX, BONIS_TOKEN, SERVER_ID, TEST_SERVER_ID, TEST_NEW_ROLE_ID, NEW_ROLE_ID, CHANNEL_PREFIX, TEST_CATEGORY_ID, TEST_HALA_MADANIYA } = process.env;
const { CommandoClient } = require('discord.js-commando');
const client = new CommandoClient({commandPrefix: BONIS_PREFIX});

client.once("ready", () => {
    client.user.setStatus("idle");
});

client.on("ready", () => {
    console.log(`logged in as ${client.user.username}`);
});

client.on("guildMemberAdd", async member => {
    let server = client.guilds.cache.get(TEST_SERVER_ID);
    let role = server.roles.cache.get(TEST_NEW_ROLE_ID);
    await member.roles.add(role.id);
    server.channels.create(`${CHANNEL_PREFIX}${member.id}`).then(guest_channel => {
        server.channels.cache.forEach(server_channels => {
            if(server_channels.id === guest_channel.id) return;
            server_channels.updateOverwrite(member.id, {VIEW_CHANNEL: false}).catch(console.error);
        });
        guest_channel.setParent(TEST_CATEGORY_ID);
        guest_channel.send(`Greetings Mr./Ms. ${member.user.username}, please provide us with your Facebook name below.`);
        client.on("message", message => {
            if(message.channel.id !== guest_channel.id) return;
            const last_message = guest_channel.lastMessage;
            if(last_message.author.bot) return;
            const hala_madanya = client.channels.cache.get(TEST_HALA_MADANIYA);
            console.log(last_message.content);
            hala_madanya.send(`${last_message.author}'s Facebook is: ${last_message.content}`);
            server.channels.cache.forEach(guild_channels => {
                guild_channels.updateOverwrite(member.id, {VIEW_CHANNEL: true}).catch(console.error);
            })
            guest_channel.delete();
            member.roles.remove(role.id);
        });
    });
    
});

client.login(BONIS_TOKEN);