import {
  PayPalButtons,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";

/*
  PaypalButton:
  - Loads PayPal SDK
  - Creates order
  - Captures payment
*/
const PaypalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) =>
          actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: amount.toFixed(2).toString(),
                },
              },
            ],
          })
        }
        onApprove={(data, actions) =>
          actions.order.capture().then(onSuccess)
        }
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
