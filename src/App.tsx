import { ThemeProvider } from "./components/theme-provider";
import { Header } from "./components/Header";
import { ChatContainer } from "./components/chat/ChatContainer";
import './components/chat/chat.css';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <ChatContainer />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
