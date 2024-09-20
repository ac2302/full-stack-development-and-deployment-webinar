import axios from "axios";
import React from "react";
import config from "../config";

function ToDo() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${config.backendUrl}/api/todo`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((res) => {
        setItems(res.data.data);
      });
  }, []);

  return (
    <div>
      <h1>ToDo List</h1>

      {/* new item */}
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const data = {
            text: e.target.item.value,
          };

          console.log(data);

          axios
            .post(`${config.backendUrl}/api/todo`, data, {
              headers: { Authorization: `Bearer ${localStorage.token}` },
            })
            .then((res) => {
              console.log(res.data);

              window.location = "/todo";
            });
        }}
      >
        <input name="item" type="text" placeholder="New Item" />
        <button type="submit">Add</button>
      </form>

      {/* items */}
      <ul>
        {items.map((item, index) => (
          <ToDoItem key={index} items={items} index={index} />
        ))}
      </ul>
    </div>
  );
}

function ToDoItem({ items, index }) {
  return (
    <li>
      <button>🗑️</button>
      <button>{items[index].completed ? "❌" : "✅"}</button>
      <span
        style={{
          textDecoration: items[index].completed ? "line-through" : "none",
        }}
      >
        {items[index].text}
      </span>
    </li>
  );
}

export default ToDo;
