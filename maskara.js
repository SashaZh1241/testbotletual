const Telegraf = require('telegraf')
const { Markup } = Telegraf

const app = new Telegraf('632548476:AAGY-l1ROK4YhRp5tYyMoid0pW4ZKEweRso')
const PAYMENT_TOKEN = '632593626:TEST:i56982357197'
app.command('start', ({ reply }) => reply('Добрый день, здесь вы можете заказать тени для глаз или тушь, просто напишите "заказать"'))

const products = [{

    name: 'NARS Тушь EXCESS',
    price: 2199,
    description: 'Тушь NARS EXCESS - инновационная тушь с легкой, невесомой формулой, которая придает ресницам максимальную длину и объем, без утяжеления.',
    photoUrl: 'https://www.letu.ru/common/img/uploaded/skuImageFolder/NRS7018NS_mainEX.jpg'
},
{
    name: 'SHISEIDO Тушь-Империал MascaraInk: длина, объем, разделение',
    price: 2449,
    description: 'Тушь-Империал MascaraInk: длина, объем, разделение позволяет идеально подчеркнуть, удлинить и разделить ресницы.',
    photoUrl: 'https://www.letu.ru/common/img/uploaded/productImageFolder/SHI0001SHTL.jpg'
},
{
    name: 'GIORGIO ARMANI Квартет теней для век Eyes To Kill Quads',
    price: 5649,
    description: 'Черпая вдохновение в виртуозной игре легендарных актрис, линейка EYE DRAMA предлагает широкий выбор оттенков и текстур — безграничные возможности для творчества.',
    photoUrl: 'https://www.letu.ru/common/img/uploaded/skuImageFolder/GA9531000_mainEX.jpg'
},
{
    name: 'LANCOME Палетка теней для век Hypnose Doll',
    price: 5399,
    description: 'Палетка теней для век Hypnose Doll от косметологов-визажистов компании LANCOME включает пять теплых оттенков, позволяющих экспериментировать с образом.',
    photoUrl: 'https://www.letu.ru/common/img/uploaded/productImageFolder/KLM290900LG.jpg'
}
]

function createInvoice (product) {
    return {
        provider_token: PAYMENT_TOKEN,
        start_parameter: 'foo',
        title: product.name,
        description: product.description,
        currency: 'RUB',
        photo_url: product.photoUrl,
        is_flexible: false,
        need_shipping_address: false,
        prices: [{ label: product.name, amount: Math.trunc(product.price * 100) }],
        payload: {}
    }
}


// Show offer
app.hears(/^заказать.*/i, ({ replyWithMarkdown }) => replyWithMarkdown(`

${products.reduce((acc, p) => {
    return (acc += `*${p.name}* - ${p.price} ₽\n`)
    }, '')}    
`,
    Markup.keyboard(products.map(p => p.name)).oneTime().resize().extra()
))

// Order product
products.forEach(p => {
    app.hears(p.name, (ctx) => {
        console.log(`${ctx.from.first_name} is about to buy a ${p.name}.`);
        ctx.replyWithInvoice(createInvoice(p))
    })
})

// Handle payment callbacks
app.on('pre_checkout_query', ({ answerPreCheckoutQuery }) => answerPreCheckoutQuery(true))
app.on('successful_payment', (ctx) => {
    console.log(`${ctx.from.first_name} (${ctx.from.username}) just payed ${ctx.message.successful_payment.total_amount / 100} ₽.`)
})

app.startPolling()