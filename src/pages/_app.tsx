import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Space_Grotesk } from "@next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] ,fallback:["system-ui","arial"]});

export default function App({ Component, pageProps }: AppProps) {

const router=useRouter();


  return (
    <UserProvider>
      <style jsx global>{`
        html {
          font-family: ${spaceGrotesk.style.fontFamily};
        }
      `}</style>
      <Provider store={store}>
      <Component {...pageProps} />
      </Provider>
    </UserProvider>
  );
}
