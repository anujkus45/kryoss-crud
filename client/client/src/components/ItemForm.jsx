import React, { useState, useEffect } from "react";

export default function ItemForm({ initial, onSubmit, mode }) {
  const [form, setForm] = useState(initial || { name: "", description: "", price: 0 });

  useEffect(() => {
    setForm(initial || { name: "", description: "", price: 0 });
  }, [initial]);

  const submit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === "function") onSubmit(form);
    // reset only when creating a new item
    if (!initial || !initial.id) {
      setForm({ name: "", description: "", price: 0 });
    }
  };

  return (
    <form className="item-form" onSubmit={submit}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) || 0 })}
      />
      <button type="submit">{mode || "Create"}</button>
    </form>
  );
}
