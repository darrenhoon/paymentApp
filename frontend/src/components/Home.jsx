import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import React, { useState, useEffect } from 'react';
import { addToCart } from "../slices/cartSlice";
import {apis} from '../apis/apis.js';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  async function retrieveProducts() {
    apis.getAllProducts()
      .then(res => {
        console.log("getAllProducts() result:")
        console.log(res)
        setShopItems(res.data)
      })
      .catch(err => {
        console.log(err)
      }) 
  }

  const [shopItems, setShopItems] = useState()
  useEffect(() => {
    retrieveProducts()
  }, [])

  return (
    <div className="home-container">

      {shopItems ? (
        <>
          <h2>Items</h2>
          <div className="products">
            {shopItems &&
              shopItems?.map((product) => (
                <div key={product.id} className="product">
                  <h3>{product.name}</h3>
                  <img src={product.image} alt={product.name} />
                  <div className="details">
                    <span>{product.desc}</span>
                    <span className="price">${product.price}</span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Add To Cart
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}




    </div>
  );
};

export default Home;
