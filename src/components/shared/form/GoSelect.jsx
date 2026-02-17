import { useFormContext } from "react-hook-form";

export default function GoSelect({
  required = false,
  label,
  name,
  data,
  placeholder,
  defaultValue = "",
}) {
  const { register } = useFormContext();

  return (
    <div style={{ position: "relative" }}>
      <label> {label}</label>
      <select defaultValue={defaultValue} {...register(name, { required })}>
        <option selected disabled value="">
          {placeholder}
        </option>
        {data?.map((item, i) => {
          return (
            <option key={i} value={item?.key}>
              {item?.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
