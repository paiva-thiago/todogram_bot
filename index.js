const TelegramBot = require( `node-telegram-bot-api` )
const fauna = require('./lib/connect.js')
const dotenv = require('dotenv')
const emoji = require('node-emoji').emoji
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
bot.onText(/\/about/, (msg) => {
   let about = 
`
ToDoGram
https://github.com/paiva-thiago/todogram_bot

Thiago Paiva
http://www.thiagopaiva.com/
@paiva_thiago
`
   bot.sendMessage(msg.chat.id, about)
});
 bot.onText(/\/start/, (msg) => {
    let welcome = 
`
   ${emoji['flag-br']}
   Olá ${msg.from.first_name}, bem vindo ao ToDoGram!! 
   Para adicionar tarefa digite /new nomeDaTarefa               
   Para listar as tarefas digite /list
   Para concluir tarefa digite /ok nomeDaTarefa

   ${emoji.gb}
   Hello ${msg.from.first_name}, welcome to ToDoGram!!
   To add a task write /new nameOfTheTask
   To list all the tasks write /list
   To finish a task write /ok nameOfTheTask

   @paiva_thiago 

`

    bot.sendMessage(msg.chat.id, welcome)
    
 })

 bot.onText(/\/new/, async (msg) => {
   let name = msg.text.replace(/\/new/,'') 
   let document = {
      "from": msg.from.id,
      "name": name,
      "createdAt": new Date().toJSON(),
      "done": false
    }
    await fauna.createDocument(document)
    bot.sendMessage(msg.chat.id, `Tarefa ${name} criada!`)
    console.log(msg)
 })
 
 bot.onText(/\/list/, async (msg) => {
    let items = await fauna.getByAuthor(msg.from.id)
    console.log(items)
    bot.sendMessage(msg.chat.id, 'TODO:')
    for(let i of items){      
      bot.sendMessage(msg.chat.id, i.name + (i.done?emoji.white_check_mark:emoji.x))
    }
    console.log(msg)
 })

 bot.onText(/\/ok/, (msg) => {
    bot.sendMessage(msg.chat.id, 'EM DESENVOLVIMENTO')
    console.log(msg)
 })