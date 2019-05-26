const Telegraf = require('telegraf')
const { Markup } = Telegraf

const app = new Telegraf('700982767:AAETn2qkf6J8l7myALHaCL0grSQA8xThv-s')
const PAYMENT_TOKEN = '632593626:TEST:i56982357197'
app.command('start', ({ reply }) => reply('Добрый день, здесь вы можете заказать пудры или румяны, просто напишите "заказать"'))

const products = [{

    name: 'NARS Компактная пудра Soft Velvet',
    price: 2949,
    description: 'Ровный тон. Стойкий макияж. Безупречная кожа.',
    photoUrl: 'https://www.letu.ru/common/img/uploaded/skuImageFolder/NRS1457NSGT.jpg'
},
{
    name: 'GIORGIO ARMANI Пудра-хайлайтер NEO NUDE POWDER',
    price: 5249,
    description: 'Современный темп жизни диктует свои требования к красоте для женщин, которые стремятся достичь всего практически на бегу.',
    photoUrl: 'https://www.letu.ru/common/img/uploaded/skuImageFolder/GA7963600GT.jpg'
},
{
    name: 'MAC Румяна для лица Powder Blush',
    price: 2090,
    description: 'Румяна для лица сочетают в себе насыщенный естественный цвет, легкость нанесения и стойкость.',
    photoUrl: 'https://www.letu.ru/common/img/uploaded/skuImageFolder/MACM22015GT.jpg'
},
{
    name: 'ARTDECO Бронзирующие румяна для лица Bronzing Blush',
    price: 1899,
    description: 'Румяна Bronzing Blush придают свежесть образу и делают его максимально обаятельным.',
    photoUrl: 'https://www.letu.ru/common/img/uploaded/skuImageFolder/DEC043665_mainEX.jpg'
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
app.hears(/^заказать.*/i, ({ replyWithMarkdown }) => replyWithMarkdown(
    products
        .map((p) => `*${p.name}* - ${p.price} ₽`)
        .join('\n'),
    Markup
        .keyboard(products.map(p => p.name))
        .oneTime()
        .resize()
        .extra()
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
