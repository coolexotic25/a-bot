const Discord = require("discord.js");
const schema = require('../../modules/code');
const moment = require('moment');
const { MessageEmbed } = require('discord.js');

var voucher_codes = require('voucher-code-generator');

const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'genkey',
        aliases: [ 'addcode', 'gencode', 'genkey' ],
        description: `Gens a code`,
        category: 'Owner',
        ownerOnly: false
      });
    }

    async run(message, args) {
        if (message.member.roles.cache.has('966616558879244328')){
            let codes = [];
        
        
            const plan = args[0];
            const plans = ["weekly","monthly","lifetime"];
    
            if(!plan) return message.channel.send(`**> Please provide coupon plan**`)
    
            if(!plans.includes(args[0])) return message.channel.send(`**Invalid Plan, available plans:** ${plans.join(", ")}`)
    
    9
            let time;
    
            if(plan === "daily") time = Date.now() + 86400000
            if(plan === "weekly") time = Date.now() + (86400000 * 7)
            if(plan === "monthly") time = Date.now() + (86400000 * 30)
            if(plan === "lifetime") time =  Date.now() + (86400000 * 9999)
    
            
            let amount = args[1];
            if(!amount) amount = 1;
    
            for (var i = 0; i <  amount; i++) {
    
                const codePremium = voucher_codes.generate({
                    pattern: `${plan}-######################`,
                });
                
                const code = codePremium.toString().toLowerCase();
                
                const find = await schema.findOne({
                code: code
                })
    
                if(!find){
                    schema.create({
                        code:code,
                        plan:plan,
                        expiresAt: time
                    });
    
                    codes.push('> ' + code)
    
                }
    
                
    
    
            };
    
            message.author.send(new Discord.MessageEmbed()
            .setColor('#9007f2')
            .setTitle('License Generated')
            .setDescription(`\n\n${codes.join("\n")}`)
            .addField("Susbcription Plan:", "```" + plan + "```", false)
            .addField("Expiration Date:", "```" +  moment(time).format("dddd, MMMM Do YYYY") + "```", false)
            .setThumbnail('https://cdn.discordapp.com/attachments/966617319163973672/989246782670254131/standard.gif')
            .setImage('https://cdn.discordapp.com/attachments/966617319163973672/990003120845254656/standard_1.gif')
            
            )
            const SentEmbed = new MessageEmbed()
            .setColor('#17cf38')
            .setTitle('License Generated')
            .setDescription(`${message.author}, Sent you **${amount} ${plan} license(s)!**`)
            .setThumbnail('https://cdn.discordapp.com/attachments/966617319163973672/989246782670254131/standard.gif')
            .setImage('https://cdn.discordapp.com/attachments/966617319163973672/990003120845254656/standard_1.gif')
            message.channel.send(SentEmbed)
    }
         else {
            const ErrorEmbed = new MessageEmbed()
            .setColor('#fc0303')
            .setTitle('No Permissions')
            .setDescription(`${message.author}, Sorry you do not have the correct permissions for this.`)
            .setThumbnail('https://cdn.discordapp.com/attachments/966617319163973672/989246782670254131/standard.gif')
            .setImage('https://cdn.discordapp.com/attachments/966617319163973672/990003120845254656/standard_1.gif')
            message.channel.send(ErrorEmbed)
        }
    }}