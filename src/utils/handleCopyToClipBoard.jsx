import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

export const handleCopyToClipBoard = (text) => {
  copy(text);
  toast.success("Copied to clipboard.");
};
