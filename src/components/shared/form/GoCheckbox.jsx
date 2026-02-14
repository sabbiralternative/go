import { useFormContext } from "react-hook-form";

export default function GoCheckbox({
  required = false,
  type = "text",
  label,
  name,
  placeholder,
  defaultChecked,
}) {
  const { register } = useFormContext();

  return (
    <label
      style={{
        display: "flex",
        width: "fit-content",
        gap: "10px",
        marginBottom: "20px",
      }}
    >
      <input
        defaultChecked={defaultChecked}
        style={{ width: "fit-content" }}
        type={type}
        {...register(name, { required })}
        placeholder={placeholder}
      />
      {label}
    </label>
  );
}
