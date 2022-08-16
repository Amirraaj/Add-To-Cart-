const productDetails = [
  {
    id: 1,
    name: "Airpods Pro",
    price: 24900,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTJiKtlpQGkIeOyAPV3qQMNkl8uuRzfGWZtIDb_WgDnam8WjhpL&usqp=CAU",
    qty: 1,
    heading: "Wireless Noise Cancelling Earphones",
    
  },
  {
    id: 2,
    name: "Apple Watch",
    price: 40900,
    imageUrl: "https://purepng.com/public/uploads/large/apple-watch-pcq.png",
    qty: 1,
    heading: "You’ve never seen a watch like this",
    
  },
  {
    id: 3,
    name: "Macbook Pro",
    price: 199900,
    imageUrl: "https://pngimg.com/uploads/macbook/macbook_PNG8.png",
    qty: 1,
    heading: "The best for the brightest",
    
  },
  {
    id: 4,
    name: "iPhone 11 pro",
    price: 106600,
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-midnight-green-select-2019?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1566954990073",
    qty: 1,
    heading: "Pro cameras. Pro display. Pro performance",
   
  },
  {
    id: 5,
    name: "iPad Pro",
    price: 71900,
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-select-wifi-spacegray-202003_FMT_WHH?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1583553704156",
    qty: 1,
    heading: "Your next computer is not a computer",
  }
];

let cartDetails = [];
const cardBox = document.querySelector("#card-box");
const cartBox = document.querySelector("#cart-box");
const clearCart = document.querySelector(".clear--cart")

// function to render the product list
const displayCard =(data) =>{
  data.forEach(
    (items) =>{
      const card = document.createElement("div")
      card.classList.add("card")
      card.innerHTML =`
        <img src=${items.imageUrl} alt="" class="card--image" >
        <div class="card--details">
          <h1 class="card--name" > ${items.name}</h1>
          <p class="card--heading">
            ${items.heading}
          </p>
          <h2 class="card--price">₹ ${items.price}</h2>
        </div>
        <div class="card--cart">
          <button class="add--cart" onclick="addToCart(${items.id})">Add To Cart</button>
        </div>
      `
      cardBox.appendChild(card)
    }
  )
}

function noCart(){
  const display = document.createElement("div")
  display.classList.add("no--data")
  display.innerHTML = `No data available`
  cartBox.appendChild(display)
}
// function to render the cart list
const displayCart = (data) =>{
  cartBox.innerHTML = "";
  !data ? noCart() :
  data.forEach(
    (items) =>{
      const cart = document.createElement("div")
      cart.classList.add("cart--data")
      cart.innerHTML =`
          <h1 class="cart--data--name">${items.name}</h1>
          <div class="cart--button">
            <button class="btn plus" onclick="increaseQuantiy(${items.id}, ${items.qty})"><i class="fa-solid fa-plus"></i></button>
            <span class="cart--quantity">${items.qty}</span>
          <button class="btn minus" onclick="decreaseQuantiy(${items.id}, ${items.qty})"><i class="fa-solid fa-minus"></i></button>
          </div>
          <h1 class="cart--data--price">₹ ${items.qty*items.price}</h1>
          <button class="btn trash--can" onclick ="deleteItems(${items.id})"> <i class="fa-solid fa-trash-can"></i></button>
      `
      cartBox.appendChild(cart)
    }
  )
}
// function to add data to cart
function addToCart(id){
  const itemDetails = productDetails.map((item) => {
    item.id == id ? cartDetails.push(item) : item ;
  })
  displayCart(cartDetails);
}
// function to add quantity
function increaseQuantiy (id, qty){
  let quantityIncrement = qty;
  quantityIncrement++
  const quantityIncrease = cartDetails.map((item) => {
    return(
      item.id == id ? {...item, qty:quantityIncrement } : item
    )
  })
  cartDetails = quantityIncrease ;
  displayCart(cartDetails);
}
// function to subract quantity
function decreaseQuantiy (id, qty){
  if(qty > 1){
    let quantityDecrement = qty;
      quantityDecrement--
      const quantityDecrease = cartDetails.map((item) => {
        return(
          item.id == id ? {...item, qty:quantityDecrement } : item
        )
      })
      cartDetails = quantityDecrease ;
      displayCart(cartDetails);
  }    
}

// function to delete cart data individualy
function deleteItems(id){
  const indexOfObject = cartDetails.findIndex(item =>{
    return item.id == id;
  }) 
  cartDetails.splice(indexOfObject, 1);
  displayCart(cartDetails);

}




//Toggel for the cart
const navToggle = document.querySelector(".nav-toggle")

navToggle.addEventListener('click',() => {
  document.body.classList.toggle('cart--open');
})

// to clear all the cart 
clearCart.addEventListener('click',() =>{
 cartDetails = [];
 displayCart(cartDetails)
})

// function call for the rendering the products
displayCard(productDetails);
