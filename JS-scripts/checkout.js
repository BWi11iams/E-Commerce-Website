const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function(event) {
  event.preventDefault(); // prevent the form from submitting automatically
  
  // Check if all the fields are valid
  const form = document.querySelector("form");
  if (!form.checkValidity()) {
    alert("Please fill in all required fields.");
    return;
  }
  
  const cardholder = document.getElementById("cardholder").value;
  const cardnumber = document.getElementById("cardnumber").value;
  const expirationdate = document.getElementById("expirationdate").value;
  const cvv = document.getElementById("cvv").value;
  const cartTotal = parseFloat(localStorage.getItem('cartTotal')).toFixed(2);

  const confirmed = confirm(`Are you sure you want to pay $${cartTotal} with the card ending in ${cardnumber.slice(-4)} and the cardholder name ${cardholder}?`);

  if (confirmed) {
    // Clear localStorage
    localStorage.clear();
  
    // Display a "thank you" message
    alert("Thank you for your purchase!");
  } else {
    // do nothing
  }
});