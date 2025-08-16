const mineflayer = require('mineflayer')
const express = require('express')

const bot = mineflayer.createBot({
  host: 'xdoblox1111.aternos.me', // IP
  port: 25565,                    // Port (غيره حسب سيرفرك)
  username: 'AFK_Bot',            // Bot username
  version: '1.21.1'               // Your server version
})

const PASSWORD = '123456' // change this to your password

bot.on('spawn', () => {
  console.log('✅ Bot joined the server!')
})

// Auto login/register
bot.on('message', (jsonMsg) => {
  const msg = jsonMsg.toString().toLowerCase()
  console.log('[Server] ' + msg)

  if (msg.includes('register')) {
    bot.chat(`/register ${PASSWORD} ${PASSWORD}`)
    console.log('🔐 Sent /register')
  } else if (msg.includes('login')) {
    bot.chat(`/login ${PASSWORD}`)
    console.log('🔑 Sent /login')
  }
})

// Anti AFK
function antiAFK() {
  bot.setControlState('jump', true)
  setTimeout(() => bot.setControlState('jump', false), 500)
}
setInterval(antiAFK, 60000)

// Small web server for Render
const app = express()
app.get('/', (req, res) => res.send('Bot is alive!'))
app.listen(3000, () => console.log('🌐 Web server running'))
