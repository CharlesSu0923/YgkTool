import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import siteConfig from "../site.config.js";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
// import UserContextProvider from "../components/UserContextProvider";
import theme from "../utils/theme";
import "./App.css";

function MyApp({ Component, pageProps }) {
	const [dark, setDark] = useState(false);

	useEffect(() => {
		if (localStorage.getItem("dark")) {
			setDark(!!localStorage.getItem("dark"));
		}
		window.setDark = (state) => {
			setDark(state);
		};
		console.log("Some global functions to nerds: Window.setDark()");

		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles && jssStyles.parentNode)
			jssStyles.parentNode.removeChild(jssStyles);
	}, []);

	const {
		currentPage = {
			title: "404",
		},
		locale = "zh-CN",
		menuItems = [],
	} = pageProps;

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider
				theme={theme({
					darkTheme: dark,
				})}
			>
				<Layout
					siteConfig={siteConfig}
					locale={locale}
					currentPage={currentPage}
					menuItems={menuItems}
				>
					<Component {...pageProps} siteConfig={siteConfig} />
				</Layout>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//     // calls page's `getInitialProps` and fills `appProps.pageProps`
//     const appProps = await App.getInitialProps(appContext);

//     console.log(appProps);

//     return { ...appProps };
// };

export default MyApp;
