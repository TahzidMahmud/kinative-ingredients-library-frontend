import * as ReactDOMClient from "react-dom/client";
import Toast from "./Toast";

if (typeof window !== "undefined") {
  const root = ReactDOMClient.createRoot(
    document.getElementById("toast-container")
  );
}

const Toaster = {
  remove: () => {
    root.unmount();
    Toaster.currentToast = false;
    if (Toaster.timeout) {
      clearTimeout(Toaster.timeout);
      Toaster.timeout = null;
    }
  },
  currentToast: false,
  timeout: null,
  notify: (message, options = null) => {
    let duration = 5;
    let color = "grey";
    if (options) {
      if (options.duration) duration = options.duration;
      if (options.type === "info") color = "grey";
      if (options.type === "success") color = "green";
      if (options.type === "error") color = "red";
      if (options.type === "warn") color = "orange";
    }

    if (Toaster.currentToast) {
      Toaster.remove();
    }
    let trasitionPercentage = 0.3 * (100 / duration);

    root.render(
      <Toast
        message={message}
        slideIn={true}
        color={color || null}
        transitionPercentage={trasitionPercentage}
        duration={duration}
      />
    );
    Toaster.currentToast = true;
    Toaster.timeout = setTimeout(Toaster.remove, duration * 1000);
  },
};
export default Toaster;
