import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import axios from "axios";

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = "http://localhost:5000";
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
