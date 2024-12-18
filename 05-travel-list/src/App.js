import { useState } from "react";

import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

export default function App() {
  const [items, setItems] = useState([]);

  function addItem(newItem) {
    setItems((currentItems) => {
      return [...currentItems, newItem];
    });
  }

  function deleteItem(id) {
    setItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }

  function toggleItem(id) {
    setItems((currentItems) => {
      return currentItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      );
    });
  }

  function clearList() {
    const confirmed = window.confirm(
      "Are you sure you want to clear the list?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={addItem} />
      <PackingList
        items={items}
        onDeleteItem={deleteItem}
        onToggleItem={toggleItem}
        onClearList={clearList}
      />
      <Stats items={items} />
    </div>
  );
}
