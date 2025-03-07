import { ThemeProvider } from "./components/theme-provider";
import { Header } from "./components/header";
import { Router } from "./lib/router";
import { HomePage } from "./components/pages/home";
import { AboutPage } from "./components/pages/about";
import { SettingsPage } from "./components/pages/settings";

function App() {
  const routes = [
    { path: "/", component: <HomePage /> },
    { path: "/about", component: <AboutPage /> },
    { path: "/settings", component: <SettingsPage /> },
  ];

  return (
    <ThemeProvider defaultTheme="system">
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
          <Router routes={routes} defaultRoute="/" />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
