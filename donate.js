const express = require('express');
const router = express.Router();
// app.js already makes these routes start at /donate!

// Donation form.
router.get('/', function(req, res) {
  res.render('donate.pug');
});

// Thanks page.
router.post('/thanks', function(req, res) {
  res.render('thanks.pug', { title: 'Thanks!' });
});

router.post('/', async (req, res, next) => {
  // TO ADD: data validation, storing errors in an `errors` variable!
  const name = req.body.name;
  const email = req.body.email;
  const amount = req.body.amount;
  if (true) { // Data is valid!
    try {
      // Create a PI:
      const stripe = require('stripe')('sk_test_51GtMsPFAGhs53rSMwsWbw1hztaRtPWlRcCTfUcfzy1qnValNuCtsq7YkmudEZ7e3aPuNuD3LHsV3qOqnBwEkcCoy00YFanLh3j');
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // In Yen
        currency: 'jpy',
        receipt_email: email,
      });
      res.render('card.pug', {name: name, amount: amount, intentSecret: paymentIntent.client_secret });
    } catch(err) {
      console.log('Error! ', err.message);
    }
  } else {
    res.render('donate', { title: 'Donate', errors: errors });
  }
});

module.exports = router