import { HoverCard } from "../ui/hover-card";
import { Button } from "../ui/button";
import { Home as HomeIcon, Settings, Info, CreditCard, Wallet, PiggyBank, LineChart } from "lucide-react";

export function HomePage() {
  const features = [
    {
      id: 1,
      title: "Expense Tracking",
      description: "Track your daily expenses and categorize them automatically.",
      icon: <CreditCard className="h-6 w-6" />,
    },
    {
      id: 2,
      title: "Split Bills",
      description: "Easily split bills among friends and family without any hassle.",
      icon: <Wallet className="h-6 w-6" />,
    },
    {
      id: 3,
      title: "Budget Planning",
      description: "Create and manage budgets to keep your finances on track.",
      icon: <PiggyBank className="h-6 w-6" />,
    },
    {
      id: 4,
      title: "Financial Insights",
      description: "Get detailed insights into your spending patterns and habits.",
      icon: <LineChart className="h-6 w-6" />,
    },
    {
      id: 5,
      title: "Cross Platform",
      description: "Use on any device - mobile, tablet, or desktop.",
      icon: <HomeIcon className="h-6 w-6" />,
    },
    {
      id: 6,
      title: "Easy to Use",
      description: "Simple and intuitive interface that anyone can use.",
      icon: <Settings className="h-6 w-6" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Split Bills and Track Expenses
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  The simple way to manage shared expenses with friends, family, and roommates.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg">Get Started</Button>
                <Button size="lg" variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Features
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Everything you need to manage your finances effectively.
                </p>
              </div>
            </div>
            <HoverCard items={features} className="mt-8" />
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Ready to get started?
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Join thousands of users who already manage their finances with FinDutch.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">Download Now</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2024 FinDutch. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
} 