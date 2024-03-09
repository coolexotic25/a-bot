const Discord = require("discord.js");
const schema = require('../../modules/code');
const User = require('../../modules/user')
const moment = require('moment');


const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'subscription',
        aliases: [ 'sub'],
        description: `Displays Your current subscription status`,
        category: 'SUPER Generator',
      });
    }

    async run(message, args) {
        
        let user = await User.findOne({
            userId: message.author.id
          });
        
        
        
        if(!user){
           await User.create({
                userId: message.author.id,
                isPremium: "false"
            });

            user = await User.findOne({
                userId: message.author.id
              });

              return message.channel.send(`❌ : **You do not have a subscription active!**`)
        }

        if(user && user.isPremium === "true") {
            return message.channel.send(new Discord.MessageEmbed().setTitle("Subscription Information!").setThumbnail('https://cdn.discordapp.com/attachments/966617319163973672/989246782670254131/standard.gif').setColor('#9007f2').setDescription("**Name:**" + " ``" + message.author.tag + "``" + "\n**Subscription:** ``✅: Active``\n**Expiration:**" + " ``" + moment(Number(user.premium.expiresAt)).toNow(true) + "``"))
        } else {
            return message.channel.send(`❌ : **You do not have a subscription active!**`)
        }
    
}
};