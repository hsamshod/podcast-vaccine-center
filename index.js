require('dotenv').config()

const {Telegraf, Markup} = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)
const centres = require('./centers')
const lib = require('./lib')

bot.start((ctx) => {
    ctx.reply("Welcome! I'll help you find nearest vaccination center");
    ctx.reply("Please send your location", Markup.keyboard([
        {text: '๐ Send location', 'request_location': true},
    ]).oneTime(true));
})

bot.on('location', (ctx) => {
    let userLocation = ctx.message.location
    centres.forEach(location => {
        if (lib.distance(userLocation.latitude, userLocation.longitude, location.location[0], location.location[1]) < 10) {
            ctx.replyWithHTML(
                `๐ฅ <b>${location.name}</b>\n` +
                `โ๏ธ<b> ${lib.formatPhone(location.phone)}</b>\n` +
                `๐ <b>${location.address}</b>\n` +
                '๐ <b>าะฐะฝะดะฐะน ะฑะพัะธะปะฐะดะธ</b>\n' +
                `http://maps.google.com/maps?q=${location.location[0]},${location.location[1]}`
            )
        }
    })
    ctx.reply("Please choose the service", Markup.keyboard([
        {text: '๐ Vaccine centers', 'request_location': true},
        {text: '๐ Hospitals'},
        {text: '๐ About'},
    ]));
})

bot.hears('๐ About', (ctx) => {
    ctx.reply('Product of "Have a nice" Team')
})

bot.hears('๐ Hospitals', (ctx) => {
    ctx.reply('List of Hospitals:')
    ctx.reply('Hospital 1')
    ctx.reply('Hospital 2')
    ctx.reply('Hospital 3')
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))