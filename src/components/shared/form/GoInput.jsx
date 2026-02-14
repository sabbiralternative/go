import { useFormContext } from "react-hook-form";

export default function GoInput({
  required = false,
  type = "text",
  label,
  name,
  placeholder,
  children,
  readOnly = false,
}) {
  const { register } = useFormContext();

  return (
    <div style={{ position: "relative" }}>
      <label> {label}</label>
      <input
        readOnly={readOnly}
        type={type}
        {...register(name, { required })}
        placeholder={placeholder}
      />
      {children}
    </div>
  );
}
