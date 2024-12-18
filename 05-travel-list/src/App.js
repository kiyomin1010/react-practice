import { useState } from "react";

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

function Logo() {
  return <h1>🌴Travel List🧳</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false,
    };

    onAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What Do You Need For This Trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Description..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>ADD</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items.slice().sort((a, b) => {
      return a.description.localeCompare(b.description);
    });

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button
        onClick={() => {
          onDeleteItem(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list.</em>
      </footer>
    );

  const numItems = items.length;
  const numPackedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPackedItems / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go! ✈️"
          : `You have ${numItems} items on your list, and you already packed
        ${numPackedItems} (${percentage}%)`}
      </em>
    </footer>
  );
}
