const Discord = require("discord.js");
const {
    MessageEmbed
} = require('discord.js');
const Accounts = require("../../database/schemas/accounts");

const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'stock',
        aliases: [ 'accounts', 'stocks'],
        description: `Displays Current SuperGen Account Stock`,
        category: 'SUPER Generator',
      });
    }

    async run(message, args) {
        
      const account = message.client.accounts.get('accounts')
        
      const embed = new MessageEmbed()
      .setTitle(`TokenStore - Token Stock`)
      .setColor('#fa6e0a')
      .setFooter('TokenStore')
   
      .addField("Token - Unverified:",  `> ${account.unverified.length}` ? `> ${account.unverified.length}`  : "> No Stock!", false)
      .addField("Token - Email Verified:", `> ${account.email.length}` ? `> ${account.email.length}` : "> No Stock!", false)
      .addField("Token - Phone Verified:", `> ${account.phone.length}` ?  `> ${account.phone.length}` : "> No Stock!", false)
      .setTimestamp()
      .setThumbnail('https://cdn.discordapp.com/attachments/994269944718041129/994586195029934131/fe7e87b3347ba5328cd636b73ed9da52.png')

      return message.channel.send(embed)
      

  };
};