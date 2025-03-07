import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">FinDutch</span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Home
            </a>
            <a
              href="/about"
              className="transition-colors hover:text-foreground/80 text-muted-foreground"
            >
              About
            </a>
            <a
              href="/settings"
              className="transition-colors hover:text-foreground/80 text-muted-foreground"
            >
              Settings
            </a>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
} 