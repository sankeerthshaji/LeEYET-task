import React from "react";
import { useField } from "formik";

function CustomInput({ label, ...props }) {
  const [field, meta] = useField(props);
  const showError = meta.touched && meta.error;
  return (
    <div>
      <label htmlFor={label} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...props}
        {...field}
        className={`w-full border-gray-400 rounded-lg shadow-sm ${
          showError ? "border-red-500 border-2" : ""
        }`}
      />
      {showError ? (
        <p className="text-red-500 mt-1">{meta.error || errorMessage}</p>
      ) : null}
    </div>
  );
}

export default CustomInput;
