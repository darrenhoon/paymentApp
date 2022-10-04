import axios from "axios"
import {useSelector} from "react-redux"
import {stripeServiceUrl} from "../slices/api"

const PayButton = ({cartItems}) => {
    const user = useSelector((state) => state.auth);

    const handleCheckout = () => {
        console.log("handling checkout with these cart items:")
        console.log(cartItems)
        axios
            .post(`${stripeServiceUrl}/stripe/create-checkout-session`, {
            cartItems,
            userId: user._id,
            })
            .then((response) => {
                if (response.data.url) {
                    window.location.href = response.data.url; //can replace with navigate
                }
            })
            .catch((err) => console.log(err.message));
    }

    return (
        <button onClick={() => handleCheckout()}>Check Out</button>
    )
}

export default PayButton;