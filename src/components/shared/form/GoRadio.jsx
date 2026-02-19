import { useFormContext } from "react-hook-form";

export default function GoRadio({
  required = false,
  type = "radio",
  label,
  name,
  value,
}) {
  const { register } = useFormContext();

  return (
    <label
      style={{
        display: "flex",
        width: "fit-content",
        gap: "5px",
        marginBottom: "5px",
        marginTop: "5px",
      }}
    >
      {label}
      <input
        value={value}
        style={{ width: "fit-content" }}
        type={type}
        {...register(name, { required })}
      />
    </label>
  );
}
