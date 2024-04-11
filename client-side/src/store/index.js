// Import the configureStore function from Redux Toolkit.
import { configureStore } from "@reduxjs/toolkit";

// Import the counterSlice reducer that you've created earlier.
import authReducer from "./features/authSlice";

// Configure your Redux store.
const store = configureStore({
  // Define your reducers here as an object.
  reducer: {
    // Create a 'counter' slice in the Redux store and associate it with the 'counterSlice' reducer.
    auth: authReducer,
    // You can add more slices and reducers here if needed.
    // For example:
    // someFeature: someFeatureReducer,
  },
});

// Export the configured Redux store.
export default store;
