// Import the Redux store that you've configured.
import store from "@/src/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Import the Provider component from 'react-redux' to connect your React components to the Redux store.
import { Provider } from "react-redux";

// Import your global styles (e.g., SCSS).
import "@/styles/global.scss";
import { Toaster } from "@/components/ui/toaster";
import Protected from "@/components/common/Protected";

// Define your main application component.
export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    // Wrap your entire application with the Provider component to make the Redux store available to your components.
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Protected />
        {/* Render the current page component (e.g., Home, About, etc.) with its props. */}
        <Toaster />
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
}
