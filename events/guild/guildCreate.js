const Event = require('../../structures/Event');
const Discord = require('discord.js');


module.exports = class extends Event {

  async run(guild) {
  
    console.log(
      colour(`[+] Joined ${guild.name}`, {
        textColour: 'green'
      }) 
    )

  }
};