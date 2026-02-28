import { clientColor } from "../../../constant/constant";

const ClientColor = ({ client }) => {
  return (
    <span
      style={{
        backgroundColor: clientColor?.[client?.color],
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        display: "inline-block",
        marginRight: "5px",
      }}
    ></span>
  );
};

export default ClientColor;
