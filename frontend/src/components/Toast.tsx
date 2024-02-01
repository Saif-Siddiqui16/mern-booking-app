import { useEffect } from "react";

type Props = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const styles =
    type == "SUCCESS"
      ? "fixed p-2 mt-12 top-10 right-10 bg-green-500 text-white font-semibold border rounded-lg"
      : "fixed p-2 mt-12 top-10 right-10 bg-red-500 text-white font-semibold border rounded-lg";

  return <div className={styles}>{message}</div>;
};

export default Toast;
