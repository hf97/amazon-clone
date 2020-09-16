const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51HRxpYFiopHTY411SC15r3SlFoc1YIhxRABg0v53lKr5YFthPSIB5Rus5wEMEhgJQtsbEJy1GTel0CJpLOtXQfE600TTRrrBZc');

// API


// App config
const app = express();


// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());


// API routes
app.get('/', (req, res) => res.status(200).send('Hello World'));

app.post('/payments/create', async (req, res) => {
    const total = req.query.total;
    console.log("payment request recieve", total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "eur",
    })
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})


// Listener
exports.api = functions.https.onRequest(app);