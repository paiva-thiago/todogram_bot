const TelegramBot = require( `node-telegram-bot-api` )
const fauna = require('./lib/connect.js')
const dotenv = require('dotenv')
dotenv.config()

const TOKEN = process.env.API_KEY

const SCHEMA = {
   "from": 0,
   "name": "",
   "createdAt" : "2020-02-11T18:55:19.286Z",
   "done": false
}
const createDoc = (from,name)=>{
   let ret = SCHEMA
   ret.from=from
   ret.name=name
   ret.createdAt=new String(new Date().toJSON())
   return ret
}

const bot = new TelegramBot( TOKEN, { polling: true } ) 

 bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `Olá ${msg.from.first_name}, bem vindo ao ToDoGram!! `)
    bot.sendMessage(msg.chat.id, "🇧🇷 \nPara adicionar tarefa digite /new <nomeDaTarefa>\nPara listar as tarefas digite /list \nPara concluir tarefa digite /ok <nomeDaTarefa>");    
    bot.sendMessage(msg.chat.id, "🇬🇧 \nTo add a task write /new <nameOfTheTask>\nTo list all the tasks write /list \nTo finish a task write /ok <nameOfTheTask>");    
 })

 bot.onText(/\/new/, (msg) => {
    bot.sendMessage(msg.chat.id, 'EM DESENVOLVIMENTO')
    console.log(msg)
 })
 
 bot.onText(/\/list/, async (msg) => {
    //bot.sendMessage(msg.chat.id, 'EM DESENVOLVIMENTO')
    let items = await fauna.getByAuthor(msg.from.id)
    console.log(items)
    for(let i of items){
      bot.sendMessage(msg.chat.id, 'TODO:')
      bot.sendMessage(msg.chat.id, i.name + (i.done?' DONE':''))
    }
    console.log(msg)
 })

 bot.onText(/\/ok/, (msg) => {
    bot.sendMessage(msg.chat.id, 'EM DESENVOLVIMENTO')
    console.log(msg)
 })