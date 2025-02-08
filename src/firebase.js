// Import the necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check"; // Updated import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC21MEC0lsGbEXMK-TLYREVeyryvhxGlF4",
  authDomain: "travelhogs-c4278.firebaseapp.com",
  projectId: "travelhogs-c4278",
  storageBucket: "travelhogs-c4278.firebasestorage.app",
  messagingSenderId: "922852238767",
  appId: "1:922852238767:web:180cc8884f20afa02afb5a",
  measurementId: "G-XF6THNMRGM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize App Check with ReCaptcha Enterprise provider
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider("your-site-key"), // Replace with your site key
  isTokenAutoRefreshEnabled: true, // Optional: Enable automatic token refresh
});

export { appCheck }; // Export the appCheck object to use it in other parts of your app
