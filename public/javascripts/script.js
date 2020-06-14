// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys

window.onload = (event) => {
  const stripe = Stripe('pk_test_51GtMsPFAGhs53rSMgTOgBcykemNcaJFh5BmnDZunbFOxLSTbtL3RPKpW1aeLfRyON7knz9MvplyE3fmdSclZ0jK5009Z6okA3v');
  const elements = stripe.elements();

  const card = elements.create('card');
  card.mount("#card-element");

  // Handle real-time validation errors from the card Element.
  card.on('change', function (event) {
    const displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  });

  const cardholderName = document.getElementById('cardholder-name');
  const cardButton = document.getElementById('card-button');
  const clientSecret = cardButton.dataset.secret;

  // Upon button clicking, complete the payment:
  cardButton.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: { name: cardholderName.value },
        }
      });
      if (result.error) {
        document.getElementById('card-errors').textContent = result.error.message;
        return false;
      } else {
        document.getElementById('card').submit();
      }
    } catch (err) {
      document.getElementById('card-errors').textContent = err.message;
      return false;
    }
  });

}

