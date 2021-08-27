import React from "react";

export default function InputField({ label, placeholder, type, name, id, error, handleChange, handleBlur }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        className="form-control"
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {error && <small className="form-text text-danger">{error}</small>}
    </div>
  );
}
