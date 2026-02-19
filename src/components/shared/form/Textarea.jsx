import { useFormContext } from "react-hook-form";

export default function GoTextarea({
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
      <textarea
        readOnly={readOnly}
        type={type}
        {...register(name, { required })}
        placeholder={placeholder}
      />
      {children}
    </div>
  );
}
