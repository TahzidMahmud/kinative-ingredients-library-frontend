import React from "react";
import Image from "next/image";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      {
        setTimeout(() => {
          location.reload();
        }, 500);
      }
      // You can render any custom fallback UI
      return (
        <div className="container ">
          <div className="flex justify-center items-center h-screen w-screen">
            <div className="flex justify-center items-center">
              <Image
                src="/glowscam-loader.svg"
                alt="loading"
                width={450}
                height={450}
                className="py-2"
              />
            </div>
          </div>
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
