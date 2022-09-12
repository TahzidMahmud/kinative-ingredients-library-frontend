import "../styles/globals.css";
import { wrapper } from "../store/store";
import ErrorBoundary from "@/components/ErrorBoundary";
import ToasterContainer from "@/components/ToasterContainer";

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
      <ToasterContainer />
    </ErrorBoundary>
  );
}

export default wrapper.withRedux(MyApp);
