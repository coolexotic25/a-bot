const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const Accounts = require('../../database/schemas/accounts')
const User = require('../../modules/user')
const moment = require('moment')

const Command = require('../../structures/Command')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'generate',
      aliases: ['generateaccount', 'gen'],
      description: `Generate an account from a cateogry`,
      category: 'SUPER Generator',
      cooldown: 3
    })
  }


  
  async run (message, args) {
    const Embed203 = new Discord.MessageEmbed()
      .setColor('0xff0000')
      .setDescription("**Your'e executing the command in wrong channel!**")

    const Embed204 = new Discord.MessageEmbed()
      .setColor('0xff0000')
      .setDescription('**You do not have the gen role to use this command**')

    if (message.channel.id !== '994584785055916072')
      return message.channel.send(Embed203)
    const genRole = message.guild.roles.cache.get('994584046128607243')

    if (
      !message.member.roles.cache.find(
        r => r.name.toLowerCase() === genRole.name.toLowerCase()
      )
    )
      return message.channel.send(Embed204)

    let user = await User.findOne({
      userId: message.author.id
    })

    if (!user) {
      await User.create({
        userId: message.author.id,
        Day: 1,
        NextUpdate: Date.now() + 86400000
      })

      user = await User.findOne({
        userId: message.author.id
      })
    }

    if (user.isPremium === 'false') {
      return message.channel.send(
        new MessageEmbed()
      .setTitle(`No account activated!`)
      .setThumbnail('https://cdn.discordapp.com/attachments/966617319163973672/989246782670254131/standard.gif')
      .setColor('0xff0000')
      .setDescription("> You can buy a plan from here! https://superspoof.sellix.io/group/62b33a5b5a274")
      .setFooter(`TokenStore - GEN`)
      )
    }

    if (user.Generated >= (user.defaultGens || 5)) {
      const errorEmbed = new MessageEmbed()
        .setTitle(`Account Limit Reached`)
        .setThumbnail('https://cdn.discordapp.com/attachments/966617319163973672/989246782670254131/standard.gif')
        .setDescription(
          `You have already generated **${user.defaultGens ||
            5} accounts**.\n\nYou can generate more in \`${moment.duration(user.NextUpdate - Date.now()).format("H [hours and] m [minutes]")}\``
        )
        .setFooter('TokenStore - GEN')
        .setColor('0xff0000')

      return message.channel.send(errorEmbed)
    }
   const categories = [
      'unverified',
      'email',
      'phone'
    ]
    if (!args[0])
      return message.channel.send(new MessageEmbed()
      .setTitle(`Invalid account!`)
      .setThumbnail('https://cdn.discordapp.com/attachments/966617319163973672/989246782670254131/standard.gif')
      .setColor('0xff0000')
      .setDescription(
        `${categories.join(
          ' - '
        )}`
      )
      .setFooter(`TokenStore - GEN`)
      )
    if (!categories.includes(args[0].toLowerCase()))
      return message.channel.send(new MessageEmbed()
      .setTitle(`Invalid account!`)
      .setThumbnail('https://cdn.discordapp.com/attachments/966617319163973672/989246782670254131/standard.gif')
      .setColor('0xff0000')
      .setDescription(
        `${categories.join(
          ' : '
        )}`
      )
      .setFooter(`TokenStore - GEN`)
      )

    let accountsDB = await Accounts.findOne()
    if (!accountsDB) {
      await Accounts.create({
        netflix: []
      })

      accountsDB = await Accounts.findOne()
    }

    const account = args[0].toLowerCase()

    const outOfStock = new MessageEmbed()
      .setTitle(`Accounts not in stock!`)
      .setColor('#ff5500')
      .setThumbnail('https://cdn.discordapp.com/attachments/966617319163973672/989246782670254131/standard.gif')
      .setDescription(
        `Sorry, ${message.author}! **${account}** accounts are currently out of stock! There will be restocks weekly, please do not complain and just wait!`
      )

    if (!accountsDB[account].length) return message.channel.send(outOfStock)

    const random = Math.floor(Math.random() * accountsDB[account].length)
    const response = accountsDB[account][random]
    const now1 = Date.now()

    try {
      await message.author.send(
        new MessageEmbed()
          .setTitle(`**TokenStore - GEN - ${account} Generated**`)
          .setColor("#eb8034")
          .setThumbnail('https://cdn.discordapp.com/attachments/966593624097833000/966616371217702952/bf34611d89cb4e9e62fc4997a1d329f2.gif')
          .setDescription(
            `${response}\n\nDaily Gens Remain: ${user.defaultGens - (user.Generated + 1)||
              5 - (user.Generated + 1)}`
          )
      )
    } catch (err) {
      console.log(err)
      return message.reply(
        new MessageEmbed()
          .setTitle(`Closed DMs!`)
          .setDescription(
            `Could not send you your ${account} account because your dms are closed!\n\n**Please open your dms**`
          )
          .setColor('0xff0000')
          .setFooter('TokenStore - GEN')
      )
    }

    const now2 = Date.now()

    message.reply(
      new MessageEmbed()
          .setTitle(`Account Generated!`)
          .setDescription(
            `> ${message.author} Successfully sent you a **${account}** account in **${now2 - now1}ms**!`
          )
          .setColor('#fa6e0a')
          .setFooter('TokenStore - GEN ~ Account Recieved')
          .setTimestamp()
        .setThumbnail('https://cdn.discordapp.com/attachments/966617319163973672/989246782670254131/standard.gif')
        .setImage('https://cdn.discordapp.com/attachments/966617319163973672/990003120845254656/standard_1.gif')
      )
    
    let newArray = accountsDB[account]
    newArray.splice(newArray.indexOf(response), 1)
    accountsDB[account] = newArray
    await accountsDB.save()
    message.client.accounts.set('accounts', accountsDB)

    user.Generated++
    await user.save()
  }
}
