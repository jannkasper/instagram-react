import React from "react";
import '../styles/globals.css'
import { ScrollProvider } from "../store/scroll";


function MyApp({ Component, pageProps }) {

  return (
      <ScrollProvider>
          <Component {...pageProps} />
      </ScrollProvider>
  )
}

export default MyApp
