const botclient = require("./bot");
const config = require("./config.json");
const disbut = require('discord-buttons');
const { MessageMenuOption, MessageMenu } = require("discord-buttons")
const Nuggies = require('nuggies');
const fs = require('fs');
const Discord = require('discord.js');
const {
    MessageButton,
    MessageActionRow
} = require("discord-buttons");
const {
    MessageEmbed,
    MessageAttachment
} = require("discord.js");
const Guild = require('./database/schemas/Guild')

const discord = require('discord.js')
const AdminWebhook = new Discord.WebhookClient("690285096489582632", "X19IKqPC3qCPxMha_XmToKYqmJXovGU0sSXiF7bCbdISyGmcneBWDtwiZHXKmlBD8t8X")

const snipes = new Discord.Collection()


// define the client
const bot = new botclient(config);

// load colors
bot.color = require('./colors.js');

//load emojis
bot.emoji = require('./emojis.js');

disbut(bot);

bot.accounts = new discord.Collection


//start the bot
bot.start();




bot.on("clickButton", async (button) => {

      try {  

           await button.reply.defer()



            let buttonMember = button.clicker.member;
            let guild = button.guild;

            
            function msToTime(ms) {
                let fullFill = (a, limit) => ("0".repeat(69) + a.toString()).slice(limit ? -limit : -2);

                let daet = new Date(ms);

                let day = fullFill(daet.getDate());
                let month = fullFill(daet.getMonth());
                let year = fullFill(daet.getFullYear(), 4);

                let hours = fullFill(daet.getHours());
                let mins = fullFill(daet.getMinutes());
                let secs = fullFill(daet.getSeconds());

                return `${day}/${month}/${year} ${hours}:${mins}:${secs}`;
            }
        } catch (err) {
            throw err
        }

})









  