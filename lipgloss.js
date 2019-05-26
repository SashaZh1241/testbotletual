const Telegraf = require('telegraf')
const { Markup } = Telegraf

const app = new Telegraf('894094345:AAElwUIIek5M0rGLfMpmplIA-W4IkK95_BU')
const PAYMENT_TOKEN = '632593626:TEST:i71464221847'
app.command('start', ({ reply }) => reply('Добрый день, здесь вы можете заказать помады или блески для губ, просто напишите "заказать"'))

const products = [{

    name: 'DIOR Помада Dior Addict Stellar Shine',
    price: 2906,
    description: 'Экстраординарное сияние и цвет на протяжении 8 часов! Перламутровые микро-частицы отлично отражают свет.',
    photoUrl: 'https://www.letu.ru/common/img/uploaded/skuImageFolder/F04800125_mainGT.jpg'
},
{
    name: 'BOBBI BROWN Помада для губ жидкая LUXE LIQUID HIGH SHINE',
    price: 2949,
    description: 'Роскошная жидкая помада с комфортной текстурой дарит губам яркий оттенок и глянцевый блеск.',
    photoUrl: 'https://www.letu.ru/common/img/uploaded/skuImageFolder/BOBEKHY08GT.jpg'
},
{
    name: 'SHU UEMURA Блеск для губ Lacque Supreme',
    price: 2399,
    description: 'Вдохновленный японскими лакированными изделиями (уруси), laque supreme сочетает в себе интенсивный цвет и изысканный блеск, который воплощается в ультрагладком сияющем покрытии, напоминающем лакированную поверхность.',
    photoUrl: 'https://www.letu.ru/common/img/uploaded/skuImageFolder/UEM950100EX.jpg'
},
{
    name: 'MAC Блеск для губ Boom, Boom, Bloom',
    price: 1520,
    description: 'Вдохновение пробуждающейся природы весной с новой лимитированной коллекцией обновленных оттенков и дымки Prep+Prime Fix+ c ароматом вишневого сада в упаковке, украшенной цветами в линии М.А.С Boom, Boom, Bloom!',
    photoUrl: 'https://www.letu.ru/common/img/uploaded/skuImageFolder/MACSG1K3GGT.jpg'
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