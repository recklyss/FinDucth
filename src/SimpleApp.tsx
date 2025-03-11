import React, { useState } from 'react';
import { Header } from "./components/header";
import { SimpleChatContainer } from "./components/chat/SimpleChatContainer";
import "./globals.css";

export default function SimpleApp() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header onOpenLogin={() => setLoginOpen(true)} />
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">FinDutch App</h1>
        <p className="mb-4">Expense splitting made simple with chat-based interface.</p>

        <div className="h-[500px]">
          <SimpleChatContainer />
        </div>
      </main>
    </div>
  );
} 