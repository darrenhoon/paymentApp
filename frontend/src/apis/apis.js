import axios from "axios";
import {productsServiceUrl} from "../slices/api"

export const apis = {
    getAllProducts
};

async function getAllProducts() {
    console.log('Called getAllProducts API');
    return await axios
    .get(productsServiceUrl + "/products")
    .then((res)=>{
        console.log(res);
        return res
    }).catch(err => {
        console.log(err);
        return err
    })
}
