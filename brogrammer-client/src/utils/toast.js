import Toastify from 'toastify-js';

export default function showToast(message = "Something went wrong") {
  Toastify({
    text: message,
    duration: 4000,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true,
    style: {
      background: "rgba(0,0,0,.5)",
      color: "white",
      borderRadius: "10px",
      border: "1px solid yellow",
    },
    offset: {
      x: 60,
      y: 20
    },
    onClick: function () { }, // Callback after click
  }).showToast();
}
