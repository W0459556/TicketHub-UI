document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const concertId = parseInt(params.get("concertId"), 10);
    const concertIdField = document.getElementById("concertId");
    const concertTitle = document.getElementById("concertTitle");
    const submitBtn = document.getElementById("submitBtn");
  
    const concerts = {
      1: {
        name: "CCR Retina Circus Lights Show",
        color: "#fc3b74"
      },
      2: {
        name: "Beatles All Star Show",
        color: "#dfa901"
      },
      3: {
        name: "Beach Boys plus The Romans at Charlotte Coliseum",
        color: "#118ed6"
      }
    };
  
    if (concerts[concertId]) {
      concertIdField.value = concertId;
      concertTitle.textContent = concerts[concertId].name;
      submitBtn.style.backgroundColor = concerts[concertId].color;
    } else {
      concertTitle.textContent = "Unknown Concert";
      submitBtn.disabled = true;
      submitBtn.textContent = "Invalid Concert ID";
    }
  
    const form = document.getElementById("purchaseForm");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
  
      const data = {
        ConcertId: concertId,
        Email: document.getElementById("email").value.trim(),
        Name: document.getElementById("name").value.trim(),
        Phone: document.getElementById("phone").value.trim(),
        Quantity: parseInt(document.getElementById("quantity").value, 10),
        CreditCard: document.getElementById("creditCard").value.trim(),
        Expiration: document.getElementById("expiration").value.trim(),
        SecurityCode: document.getElementById("securityCode").value.trim(),
        Address: document.getElementById("address").value.trim(),
        City: document.getElementById("city").value.trim(),
        Province: document.getElementById("province").value.trim(),
        PostalCode: document.getElementById("postalCode").value.trim(),
        Country: document.getElementById("country").value.trim()
      };
  
      try {
        const response = await fetch("https://w0459556webd3000tickethub-bgfag0h8fvbsenaf.canadacentral-01.azurewebsites.net/api/Purchase", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
          },
          body: JSON.stringify(data)
        });
  
        if (response.ok) {
          alert("Purchase successful!");
          form.reset();
        } else {
          const error = await response.text();
          alert("Failed to submit: " + error);
        }
      } catch (err) {
        alert("An error occurred: " + err.message);
      }
    });
  });
  