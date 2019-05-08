import * as React from "react"
import {useState} from "react"
import { CardElement, injectStripe, ReactStripeElements} from "react-stripe-elements"
import { json as fwt} from "../utils/api"
const PaymentForm: React.SFC<IPaymentFormProps> = (props) => {

    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [ThankYouDiv, setThankYouDiv] =useState(<></>)

    const handleSubmit=async (e:React.ChangeEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try{
            let { token } = await props.stripe.createToken({name})
            let  donation = await fwt("/donate","POST",{token, amount})
            if(donation.ok) {
                setThankYouDiv(<div className="alert alert-Success">Thank you for your donations</div>)
            }
        }catch(e){
           setThankYouDiv(<div className="alert alert-danger">error in processing</div>)
            throw e
        }
        setName("");
        setAmount("")
    }

    return (
        <main className ="container d-flex justify-content-center align-items-center h-75">
            
            <form 
            className ="form-group mt-3 w-50 p-4 border border-primary rounded shadow-lg"
            onSubmit={handleSubmit}
            >
            <h1 className="text-center">Donations</h1>
            {ThankYouDiv}
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