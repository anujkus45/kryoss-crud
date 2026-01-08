import React from "react";

export default function ItemList({ items = [], onEdit, onDelete }) {
  if (!items || items.length === 0) return <p className="no-items">No items yet.</p>;

  return (
    <ul className="item-list">
      {items.map((item) => (
        <li key={item.id}>
          <div>
            <strong>{item.name}</strong>
            <div>{item.description}</div>
            <div>${item.price}</div>
          </div>
          <div className="item-actions">
            <button onClick={() => onEdit && onEdit(item)}>Edit</button>
            <button onClick={() => onDelete && onDelete(item.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
