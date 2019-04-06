const TelegramBot = require('node-telegram-bot-api')

const TOKEN = '891501897:AAGjvILpffE9-JfBlFNUjdtlB_Mp8mg5U_E'

const bot = new TelegramBot(TOKEN, {polling: true}) 

bot.onText(/\/start/, msg=> {
    const text = 'Добрый день, вас приветствует сеть компаний "Летуаль", что вы хотите сделать?'
    bot.sendMessage(msg.chat.id, text, {
        reply_markup:{
            keyboard: [
                [kb.mainMenu.catalog],
                [kb.mainMenu.contacts],
                [kb.mainMenu.aboutUs]
            ]
        }
    })
})


const kb = {
    mainMenu: {
        catalog: '🧾Каталог товаров',
        contacts: '📲Контакты',
        aboutUs: 'ℹ️О компании'
    },
    list1: {
        forFace:'👩🏻Продукты для лица',
        forEyes:'👁Продукты для глаз',
        forLips:'👄Продукты для губ'
    },
    back: {
        backToMainMenu:'Обратно в меню ⤴️',
        backToList1:'Назад2'
    },
    list11: {
        powder: 'Пудра',
        blusher: 'Румяна'
    },
    list12: {
        shade:'Тени',
        mascara:'Тушь'
    },
    list13: {
        gloss:'Блеск для губ',
        lipstick:'Помада'
    }

}

bot.on('message', msg => {
    switch(msg.text){
        case kb.mainMenu.catalog:
            List1(msg.chat.id)
            break

        case kb.mainMenu.contacts:
            bot.sendMessage(msg.chat.id, 'Наша почта: 123@gmail.com ')
            bot.sendMessage(msg.chat.id, 'Наш номер телефона:  8-800-200-23-45')
            break

        case kb.mainMenu.aboutUs:
            AboutUs(msg.chat.id)
            break

        case kb.back.backToMainMenu:
            backToMainMenu(msg.chat.id)
            break

        case kb.list1.forFace:
            List11(msg.chat.id)
            break

        case kb.back.backToList1:
            List1(msg.chat.id)
            break

        case kb.list1.forEyes:
            List12(msg.chat.id)
            break

        case kb.list1.forLips:
            List13(msg.chat.id)
            break
    }
})


    function List13(chatId){
        bot.sendMessage(chatId, "Наши товары в этом отделе", {
            reply_markup: {
                keyboard:[
                    [kb.list13.lipstick],
                    [kb.list13.gloss],
                    [kb.back.backToList1]
                ]
            }
        })
    }
      function List12(chatId){
        bot.sendMessage(chatId, "Наши товары в этом отделе", {
            reply_markup: {
                keyboard:[
                    [kb.list12.mascara],
                    [kb.list12.shade],
                    [kb.back.backToList1]
                ]
            }
        })
    }
    function List11(chatId){
        bot.sendMessage(chatId, "Наши товары в этом отделе", {
            reply_markup: {
                keyboard:[
                    [kb.list11.powder],
                    [kb.list11.blusher],
                    [kb.back.backToList1]
                ]
            }
        })
    }
    function backToMainMenu(chatId){
        bot.sendMessage(chatId, "Главное меню", {
            reply_markup: {
                keyboard:[
                    [kb.mainMenu.catalog],
                    [kb.mainMenu.contacts],
                    [kb.mainMenu.aboutUs]
                ]
            }
        })
    }
    function List1(chatId){
        bot.sendMessage(chatId, "Наши продукты", {
            reply_markup: {
                keyboard:[
                    [kb.list1.forFace],
                    [kb.list1.forEyes],
                    [kb.list1.forLips],
                    [kb.back.backToMainMenu]
                ]
            }
        })
    }   
    function AboutUs(chatId, ){
        bot.sendMessage(chatId, "hello")
    }      
