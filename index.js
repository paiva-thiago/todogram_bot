const TelegramBot = require( `node-telegram-bot-api` )
const dotenv = require('dotenv')
dotenv.config()

const TOKEN = process.env.API_KEY

const bot = new TelegramBot( TOKEN, { polling: true } ) 

 bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `Olá ${msg.from.first_name}, bem vindo ao ToDoGram!! `)
    bot.sendMessage(msg.chat.id, "🇧🇷 \nPara adicionar tarefa digite /n <nomeDaTarefa>\nPara listar as tarefas digite /ls \nPara concluir tarefa digite /ok <nomeDaTarefa>");    
    bot.sendMessage(msg.chat.id, "🇬🇧 \nTo add a task write /n <nameOfTheTask>\nTo list all the tasks write /ls \nTo finish a task write /ok <nameOfTheTask>");    
 })

 bot.onText(/\/n/, (msg) => {
    bot.sendMessage(msg.chat.id, 'EM DESENVOLVIMENTO')
    console.log(msg.text)
 })
 
 bot.onText(/\/ls/, (msg) => {
    bot.sendMessage(msg.chat.id, 'EM DESENVOLVIMENTO')
    console.log(msg.text)
 })

 bot.onText(/\/ok/, (msg) => {
    bot.sendMessage(msg.chat.id, 'EM DESENVOLVIMENTO')
    console.log(msg.text)
 })