import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6000,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10000,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12000,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12000,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15000,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18000,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // const style = {
  //   color: "red",
  //   fontSize: "48px",
  //   textTransform: "uppercase",
  // };

  return (
    <header className="header">
      <h1>KIYOMIN'S PIZZA</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;

  return (
    <main className="menu">
      <h2>MENU</h2>
      {pizzas ? (
        <ul className="pizzas">
          {pizzas.map((pizza) => (
            <Pizza
              key={pizza.name + "_" + pizza.price}
              name={pizza.name}
              ingredients={pizza.ingredients}
              photoName={pizza.photoName}
              price={pizza.price}
              soldOut={pizza.soldOut}
            />
          ))}
        </ul>
      ) : (
        <p>We're still workign on our menu. Please come back later :)</p>
      )}
    </main>
  );
}

function Pizza({ name, ingredients, photoName, price, soldOut }) {
  return (
    <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={photoName} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{soldOut ? "SOLD OUT" : "₩" + price}</span>
      </div>
    </li>
  );
}

function Footer() {
  const currentHour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = currentHour >= openHour && currentHour <= closeHour;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order openHour={openHour} closeHour={closeHour} />
      ) : (
        <p>
          Sorry we're CLOSED now. We're open from {openHour}:00 to {closeHour}
          :00.
        </p>
      )}
    </footer>
  );
}

function Order({ openHour, closeHour }) {
  return (
    <div className="order">
      <p>We're currently OPEN until {closeHour}:00.</p>
      <button className="btn">Order</button>
    </div>
  );
}

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
