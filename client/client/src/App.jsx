import { useEffect, useState } from "react";
import { api } from "./api";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import "./App.css";

export default function App() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);

  // Load all items from backend
  const load = async () => {
    try {
      const { data } = await api.get("/items");
      setItems(data);
    } catch (err) {
      console.error("Error loading items:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Create new item
  const createItem = async (payload) => {
    try {
      await api.post("/items", payload);
      await load();
    } catch (err) {
      console.error("Error creating item:", err);
    }
  };

  // Update existing item
  const updateItem = async (id, payload) => {
    try {
      await api.put(`/items/${id}`, payload);
      setEditing(null);
      await load();
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    try {
      await api.delete(`/items/${id}`);
      await load();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <div className="container">
      <h2>Items CRUD App</h2>
      <ItemForm
        key={editing ? `edit-${editing.id}` : "create"}
        initial={editing || { name: "", description: "", price: 0 }}
        onSubmit={(payload) =>
          editing ? updateItem(editing.id, payload) : createItem(payload)
        }
        mode={editing ? "Update" : "Create"}
      />
      <ItemList items={items} onEdit={setEditing} onDelete={deleteItem} />
    </div>
  );
}
