const discord = require("discord.js");
const User = require('../../modules/user');
const ReactionMenu = require('../../menu/reactionMenu')
const moment = require('moment');

const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'checksub',
        aliases: [ 'cs' ],
        description: `Check subscription data`,
        category: 'Owner',
        ownerOnly: true
      });
    }

    async run(message, args) {


           const userId = args[0];
           if(args[0] && args[0].toLowerCase() === "all"){

           const all = await User.find({ isPremium: "true"});

           if(!all.length) return message.channel.send(`No Users found`)
           
           let i = 0;
           const array = []; 

           for(let a of all){
           i++
           const b = await message.client.users.cache.get(a.userId)
           console.log(b)
           array.push(`\`${i}-\` ${b.username ? b.username : "Unkown Username"} - ${b.id}`)
           }

           const interval = 15;

           const embed = new discord.MessageEmbed()
           .setTitle(`Premium Users`)
           .setDescription(array.join("\n") || "None")
           .setColor("GREEN")
           .setFooter(message.author.tag,  
               message.author.displayAvatarURL({ dynamic: true })
             )
       
       if (array.length <= interval) {
           
           const range = (array.length == 1) ? '[1]' : `[1 - ${array.length}]`;
             message.channel.send(embed
               .setTitle(`Premium Users | ${range}`)
               .setDescription(array.join("\n") || "None")
               .setColor("GREEN")
               .setFooter(message.author.tag,  
                   message.author.displayAvatarURL({ dynamic: true })
                 )
             );
       
           } else {
       
             embed
               .setTitle(`Premium Users`)
               .setDescription(array.join("\n") || "None")
               .setColor("GREEN")
               .setFooter(message.author.tag,  
                 message.author.displayAvatarURL({ dynamic: true })
               );
       
             new ReactionMenu(message.client, message.channel, message.member, embed, array, interval);
           }
       
   
   

            return
        }
       
        const userA = message.client.users.cache.get(userId);
        if (!userA) return message.channel.send(`could not find this user`)
        
        const findPremium = await User.findOne({
            userId: userA.id,
            isPremium: "true"
        });

        if(findPremium){
            
            if(findPremium.premium.plan === "lifetime") {

            message.channel.send(new discord.MessageEmbed().setColor('0xfccf03')
            .setTitle(`${userA.username} | Subscription Information!`).setThumbnail('https://media.discordapp.net/attachments/910551689390600192/920108656400412682/IMG_2104.gif')
            .setDescription("**Redeemed By: **<@" + findPremium.premium.redeemedBy.id + ">\n**Subscription: ** ``✅: Active`` \n**Redeemed At: ** ``" + moment(parseInt(findPremium.premium.redeemedAt)).format("dddd, MMMM Do YYYY HH:mm:ss") + "``\n**Plan: **``Lifetime Plan``"))
            } else {
       

            message.channel.send(new discord.MessageEmbed().setColor('0xfccf03')
            .setTitle(`${userA.username} | Subscription Information!`).setThumbnail('https://media.discordapp.net/attachments/910551689390600192/920108656400412682/IMG_2104.gif')
            .setDescription("**Redeemed By: **<@" + findPremium.premium.redeemedBy.id + ">\n**Subscription: ** ``✅: Active`` \n**Redeemed At: ** ``" + moment(parseInt(findPremium.premium.redeemedAt)).format("dddd, MMMM Do YYYY HH:mm:ss") +"`` \n**Expiration Date: ** ``" + moment(parseInt(findPremium.premium.expiresAt)).format("dddd, MMMM Do YYYY HH:mm:ss") + "``" + "\n**Expiration From Now: **``" + moment(parseInt(findPremium.premium.expiresAt)).fromNow() + "``")
            )

            }

      } else return message.channel.send('This user isnt premium')
}
};