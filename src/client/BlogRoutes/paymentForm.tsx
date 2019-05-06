import * as React from "react"
import {useState} from "react"
import { CardElement, injectStripe, ReactStripeElements} from "react-stripe-elements"
import { json as fwt} from "../utils/api"
const PaymentForm: React.SFC<IPaymentFormProps> = (props) => {

    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")

    const handleSubmit=async (e:React.ChangeEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try{
            let { token } = await props.stripe.createToken({name})
            await fwt("/donate","POST",{token, amount})
        }catch(e){
            throw e
        }
    }

    return (
        <main className ="container">
            <h1 className="text-center">Donations</h1>
            <form 
            className ="form-group mt-3 p-3 border border-primary rounded shadow-lg"
            onSubmit={handleSubmit}
            >
                <label>Name</label>
                <input 
                type="text"
                placeholder="Type name"
                className="input-group my-1 p-1 border border-secondary"
                value={name}
                onChange={(e:any) =>{setName(e.target.value)}}
                />
                <label>Amount</label>
                <input 
                type="text"
                placeholder="Enter Amount"
                className="input-group my-1 p-1 border border-secondary"
                value={amount}
                onChange={(e:any) =>{setAmount(e.target.value)}}
                />
                <label>CreditCardNumber -- Exp. Date -- CVC</label>
               <CardElement className="p-2 border border-secondary"/>
        <button className="btn btn-primary border border-dark mt-2">Submit</button>
            </form>
        </main>
    )
}

interface IPaymentFormProps extends ReactStripeElements.InjectedStripeProps {

}

export default injectStripe(PaymentForm) 