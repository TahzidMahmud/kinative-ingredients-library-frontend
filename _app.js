import "../styles/globals.css";
import { wrapper } from "../store/store";
import ErrorBoundary from "@/components/ErrorBoundary";

function MyApp({ Component, pageProps }) {
  return (
    // <ErrorBoundary>
    <Component {...pageProps} />
    // </ErrorBoundary>
  );
}

export default wrapper.withRedux(MyApp);
