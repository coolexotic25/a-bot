const Discord = require("discord.js");
const schema = require('../../modules/code');
const User = require('../../modules/user')
const moment = require('moment');

var voucher_codes = require('voucher-code-generator');
const { Schema } = require("mongoose");

const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'redeem',
        aliases: [ 'r'],
        description: `Redeems SuperGen License`,
        category: 'SUPER Generator',
      });
    }

    async run(message, args) {


     // if(message.channel.id !== "857575776686047252") return message.channel.send(new Discord.MessageEmbed().setColor('0xff0000').setDescription(`**You cannot use this command in this channel!**`))
        let user = await User.findOne({
            userId: message.author.id
          });
        
        
          
       let code = args[0]
    
        if(!code) return message.channel.send(new Discord.MessageEmbed().setColor('0xff0000').setDescription(`**Please specify the code you want to redeem!**`))
        
        if(!user){
           await User.create({
                userId: message.author.id,
                isPremium: "false"
            });

            user = await User.findOne({
                userId: message.author.id
              });
        }

        if(user && user.isPremium === "true") {
    
          return message.channel.send(new Discord.MessageEmbed().setColor('0xff0000').setDescription(`**> You already have active premium code redeemed!**`))
        }
    
        const premium = await schema.findOne({
          code: code
        })
    
        if(premium){
    
    const expires = moment(Number(premium.expiresAt)).format("dddd, MMMM Do YYYY HH:mm:ss")
    
    
        user.isPremium = "true";
        user.premium.redeemedBy.id = message.author.id;
        user.premium.redeemedBy.tag = message.author.tag;
        user.premium.redeemedAt = Date.now()
        user.premium.expiresAt = premium.expiresAt;
        user.premium.plan = premium.plan;
    
        await user.save().catch(()=>{});
    
        await premium.deleteOne().catch(()=>{});

        message.channel.send(new Discord.MessageEmbed()
        .setTitle("SuperGen - License Redeemed")
        .setDescription(`*> Expires at: ${expires}* \n> ${message.author}, Thanks for purchase!`)
        .setColor('#9007f2')
        .setThumbnail(message.author.avatarURL()));

        const role = await message.guild.roles.cache.get(process.env.role);
        if(role){
            await message.member.roles.add(role).catch(()=>{})
        }
    
        } else {
            return message.channel.send(new Discord.MessageEmbed()
            .setColor('0xff0000').setFooter(message.author.username)
            .setThumbnail(message.author.displayAvatarURL)
            .setDescription(`**The code is invalid. Please try and using valid one!**`))
        }

}
};