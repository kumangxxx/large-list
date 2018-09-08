'use strict'

const sillyname = require('sillyname')
const UUID = require('uuid/v4')

const randomIndex = () => Math.floor( Math.random() * 4000 )

let data = []

for (var i = 0; i < 4000; i++) {
    let date = new Date()
    let name = sillyname()
    let firstname = name.split(' ')[0]
    let lastname = name.replace(firstname + ' ', '')
    let profilepic = 'https://placeholdit.co//i/60x60?&bg=95a5a6&text=' + firstname[0] + lastname[0]
    let channels = [
        {
            isBotOn: true,
            config: {
                App: 'Telegram',
                chatId: UUID()
            }
        }
    ]
    data.push({
        isBotOn: true,
        first_name: firstname,
        last_name: lastname,
        full_name: name,
        lastMsg: sillyname(),
        lastMsgTime: date,
        timestamp: date.getTime(),
        profilepic,
        channels
    })
}

setInterval(() => {
    let first = data.shift()
    data.push(first)
}, 3000)

const sockets = {}

setInterval(() => {
    let item = data[randomIndex()]
    let date = new Date()
    item.lastMsgTime = date
    item.timestamp = date.getTime()
    item.lastMsg = sillyname()

    Object.keys(sockets).map( k => sockets[k] ).filter( s => s !== '' ).forEach(s => {
        s.emit('newMessage', item)
    })
}, 200)

const App = require('express')()
const CORS = require('cors')
const HTTPServer = require('http').Server(App)
const io = require('socket.io')(HTTPServer)

App.use(CORS())

App.get('/data', (req, res) => {
    res.json(data)
})

io.on('connection', (socket) => {
    console.log('new socket conncetion', socket.id)
    sockets[socket.id] = socket
    socket.on('disconnect', () => {
        sockets[socket.id] = ''
    })
})

HTTPServer.listen(4000, null, () => {
    console.log('ok')
})