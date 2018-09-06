'use strict'

const sillyname = require('sillyname')
const UUID = require('uuid/v4')

const kumang = ' Rahadian Ahmad '
console.log(kumang.trim(), 'haha')

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

const App = require('express')()

App.get('/data', (req, res) => {
    res.json(data)
})

App.listen(4000, () => {
    console.log('ok')
})