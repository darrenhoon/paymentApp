
const products = [
  {
    id: 1,
    name: "Item A",
    brand: "Hustle",
    desc: "A way of living",
    price: 6,
    image: "https://i.picsum.photos/id/684/200/200.jpg?hmac=Al0pymCRQr_mB6OlD9xW3UsgmSKDgnNPq2JLj3_CfUY"
  },
  {
    id: 2,
    name: "Item B",
    brand: "Loyalty",
    desc: "An action",
    price: 1,
    image: "https://i.picsum.photos/id/11/200/200.jpg?hmac=LBGO0uEpEmAVS8NeUXMqxcIdHGIcu0JiOb5DJr4mtUI"
  },
  {
    id: 3,
    name: "Item C",
    brand: "Respect",
    desc: "The recognition from others to you",
    price: 9,
    image: "https://i.picsum.photos/id/575/200/200.jpg?hmac=u8uMtAWK-6Ug08Vo4nf84xQLlwJqyrXpfzsU9a3YpCY"
  },
];
const getProducts = async (req, res) => {
  res.send(products)
  return
}

exports.getProducts = getProducts;
