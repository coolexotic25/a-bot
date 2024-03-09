const Event = require('../structures/Event')
const Discord = require('discord.js')
const User = require('../modules/user')
const colour = require('cdcolours')
const TimeManager = require('../timeManager/timeManager')
const Accounts = require('../database/schemas/accounts')
const cron = require('node-cron')
module.exports = class extends Event {
  async run () {
    const client = this.client

    const accounts = await Accounts.findOne()
    client.accounts.set('accounts', accounts)

    let statuses = [
      'Token Store',
      '!!generate',
    ]
    
    let allUsers;
    setInterval(async function () {
      let status = statuses[Math.floor(Math.random() * statuses.length)]
      client.user.setActivity(status, {
        type: 'WATCHING'
      });
        
      allUsers = await User.find();
      allUsers.forEach(user => {
        TimeManager.checkDay(user.userId)
      });
        
    }, 3000)

    console.log(
      colour('[SUPER-GEN]', {
        textColour: 'green'
      }) + `BOT HAS STARTED : LOGGED IN AS : ${client.user.tag}`
    )

    //interval
    let results;
    cron.schedule('*/60 * * * * *', async () => {
      results = await User.find({ isPremium: 'true' });
        if (results && results.length) {
          for (const result of results) {
            if (result.premium.plan !== 'lifetime') {
              if (Date.now() >= parseInt(result.premium.expiresAt)) {
                 
                const guild = client.guilds.cache.get('966593399140528150')
                const user = guild.members.cache.get(result.userId)

                result.isPremium = 'false'
                result.premium.redeemedBy.id = null
                result.premium.redeemedBy.tag = null
                result.premium.redeemedAt = null
                result.premium.expiresAt = null
                result.premium.plan = null

                await result.save().catch(() => {})
                console.log('[*] SUBSCRIPTION EXPIRED FOR ' + user.user.username)

                const role = guild.roles.cache.get('966594431333589012')

                if (role) {
                  await user.roles.remove(role).catch(() => {})
                }

                if (user) {
                  const embed = new Discord.MessageEmbed()
                    .setColor('0xff0004')
                    .setDescription(
                      `**Hey** ${user.user.username}**, your SUPER Generator subscription has ended. If you want to buy a new make sure to check purchase channel!**`
                    )
                  return user.send(embed).catch(() => {})
                }
              }
            }
          }
        };
      
    })
  }
}
