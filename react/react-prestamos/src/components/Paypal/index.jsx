import React from "react";

function PaypalButton(){
    function renderPaypalButton(){
        paypal
      .Buttons({
        createOrder: async ()=> {
            try {
              const response = await axios({
                url: "http://localhost:3000/pagar",
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                data: pagos
            })
            return response.data.id
            } catch (error) {
              console.log(error);
            }
        },
        onCancel: function (data) {
          console.log("Compra cancelada");
        },
        onApprove: function (data, actions) {
          console.log(data);
          return actions.order.capture();
        },
      })
      .render("#paypal-button-container");
    }
    return (
        <div>
            <div id="paypal-button-container">  </div>
        </div>
    )
}

export default PaypalButton