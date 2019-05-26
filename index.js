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
    },
}
bot.on('message', msg => {
    switch(msg.text){
        case kb.mainMenu.catalog:
            List1(msg.chat.id)
            break

        case kb.mainMenu.contacts:
            bot.sendMessage(msg.chat.id, 'Наша почта: info@letu.ru')
            bot.sendMessage(msg.chat.id, 'Наш номер телефона: 8-800-200-23-45')
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
        bot.sendMessage(chatId, "Чтобы сделать заказ перейдите на @lipglossbot")
    }
      function List12(chatId){
        bot.sendMessage(chatId, "Чтобы сделать заказ перейдите на @eyesshopbot")}

    function List11(chatId){
        bot.sendMessage(chatId, "Чтобы сделать заказ перейдите на @powdershopbot")}
            
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
        bot.sendMessage(chatId, "ООО «Брокард-Украина» является крупнейшим оператором парфюмерно-косметического рынка Украины в сегменте luxury и управляет магазинами под торговым знаком BROCARD, эксклюзивно развивает бренд М.А.С в Украине. С 2016 г. портфолио марок пополнилось культовым брендом Kiehl's (Килс). На сегодняшний день компания Брокард-Украина насчитывает 97 торговых точек BROCARD, и M.A.C в 25 городах общей площадью более 31 тыс. кв. м. Сеть посещают более 1 миллиона постоянных клиентов. Магазин BROCARD в ТЦ «Универмаг «Украина» площадью 1000 кв. м стал наибольшим магазином с самым широким ассортиментом парфюмерии и косметики категории luxury в Украине. С 2013 года, кроме стационарных магазинов BROCARD, сеть предлагает покупателям совершать покупки online на сайте www.letu.ua, который стал первым официальным интернет-магазином парфюмерии и косметики в Украине. По результатам 2015 года общий оборот сети составил около 2,4 млрд. гривен. С 2006 по 2010 гг. компания 5 раз становилась обладателем престижной награды «Выбор года» в номинации Сеть года парфюмерно-косметических магазинов. По результатам независимых исследований, сеть BROCARD является также лидером по качеству обслуживания на розничном рынке Украины. BROCARD трижды становился победителем премии Retail Awards в номинации «Сеть парфюмерно-косметических магазинов». В конкурсе «Лучшее корпоративное медиа Украины» журнал BROCARD PARFUMS четыре раза получал самые высокие награды. www.brocard.ua")
    }      

    
