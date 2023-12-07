import { ToastPosition } from "react-toastify";

interface ToastConfig {
  position: ToastPosition | undefined;
  autoClose: number;
  hideProgressBar: boolean;
  newestOnTop: boolean;
  closeOnClick: boolean;
  rtl: boolean;
  pauseOnFocusLoss: boolean;
  draggable: boolean;
  pauseOnHover: boolean;
  theme: "light" | "dark" | "colored";
}
export const toastConfig: ToastConfig = {
  position: "bottom-center",
  autoClose: 3500,
  hideProgressBar: true,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: false,
  draggable: true,
  pauseOnHover: false,
  theme: "dark",
};
