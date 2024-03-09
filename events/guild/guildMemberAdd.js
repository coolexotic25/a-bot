const Event = require('../../structures/Event');
const discord = require('discord.js');


module.exports = class extends Event {

  async run(member) {
  
   const welcomeEmbed = new discord.MessageEmbed()
        .setColor("#3f60f2")
        .setTitle('**Welcome to SuperGen**')
        .setDescription(`**[EN] Hello ${member}! Welcome to SuperGen! Do $prices to see our prices, and head to purchase channel!`)
      member.send(welcomeEmbed).catch(() => { })
    
  }
};