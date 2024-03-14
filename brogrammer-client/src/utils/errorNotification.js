import showToast from "./toast";

export default function errorNotification(message) {
  (message) ? showToast(message) : showToast("Something went wrong");
}