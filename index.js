require('dotenv').config()

const {Telegraf, Markup} = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)
const centres = require('./centers')
const lib = require('./lib')

bot.start((ctx) => {
    ctx.reply("Welcome! I'll help you find nearest vaccination center");
    ctx.reply("Please send your location", Markup.keyboard([
        {text: '📍 Send location', 'request_location': true},
    ]).oneTime(true));
})

bot.on('location', (ctx) => {
    let userLocation = ctx.message.location
    centres.forEach(location => {
        if (lib.distance(userLocation.latitude, userLocation.longitude, location.location[0], location.location[1]) < 10) {
            ctx.replyWithHTML(
                `🏥 <b>${location.name}</b>\n` +
                `☎️<b> ${lib.formatPhone(location.phone)}</b>\n` +
                `📍 <b>${location.address}</b>\n` +
                '🚖 <b>Қандай борилади</b>\n' +
                `http://maps.google.com/maps?q=${location.location[0]},${location.location[1]}`
            )
        }
    })
    ctx.reply("Please choose the service", Markup.keyboard([
        {text: '📍 Vaccine centers', 'request_location': true},
        {text: '📍 Hospitals'},
        {text: '😊 About'},
    ]));
})

bot.hears('😊 About', (ctx) => {
    ctx.reply('Product of "Have a nice" Team')
})

bot.hears('📍 Hospitals', (ctx) => {
    ctx.reply('List of Hospitals:')
    ctx.reply('Hospital 1')
    ctx.reply('Hospital 2')
    ctx.reply('Hospital 3')
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))