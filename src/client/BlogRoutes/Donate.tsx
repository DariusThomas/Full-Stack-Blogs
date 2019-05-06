import * as React from "react";
import { StripeProvider, Elements } from "react-stripe-elements"
import Form from "./paymentForm"
const Donate: React.SFC<IDonateProps> = (props) => {

    return (
        <StripeProvider apiKey="pk_test_CWPOOJsfxBmEzmZ4umo6Eshl0008xNzhy1">
            <Elements>
                <Form />
            </Elements>
        </StripeProvider>
    )
}

interface IDonateProps {

}

export default Donate