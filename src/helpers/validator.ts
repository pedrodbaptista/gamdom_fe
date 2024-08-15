import { toast } from "react-toastify";

export function isValidUser(name: string, email: string, password: string) {
  if ("" === name) {
    toast.error("Please enter your name");
    return false;
  }

  if ("" === email) {
    toast.error("Please enter your email");
    return false;
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    toast.error("Please enter a valid email");
    return false;
  }

  if ("" === password) {
    toast.error("Please enter a password");
    return false;
  }

  if (password.length < 7) {
    toast.error("The password must be 8 characters or longer");
    return false;
  }

  return true;
}
