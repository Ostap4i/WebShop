import React from "react";
import "./App.css";
import ProductList from "./components/ProductList"; // Імпортуємо компонент ProductList

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Список продуктів</h1>
        <ProductList /> {/* Використовуємо компонент ProductList */}
      </header>
    </div>
  );
}

export default App;
