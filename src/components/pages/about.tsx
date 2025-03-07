import { Button } from "../ui/button";

export function AboutPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">About FinDutch</h1>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-muted-foreground">
            FinDutch was created with a simple mission: to make splitting bills and tracking shared expenses as painless as possible. We believe financial management should be straightforward and accessible to everyone.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">The Problem We Solve</h2>
          <p className="text-muted-foreground">
            Managing shared expenses can be awkward and time-consuming. Keeping track of who owes what, sending reminders, and calculating splits takes the fun out of shared experiences. FinDutch eliminates these pain points with a user-friendly interface that makes expense tracking and bill splitting intuitive and even enjoyable.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Approach</h2>
          <p className="text-muted-foreground">
            We've built FinDutch using modern web technologies to ensure a smooth, responsive experience across all your devices. As a cross-platform application, FinDutch works seamlessly on iOS, Android, and desktop, ensuring you can manage your finances no matter where you are or what device you're using.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Looking Forward</h2>
          <p className="text-muted-foreground">
            We're constantly working to improve FinDutch with new features and refinements based on user feedback. Our roadmap includes enhanced budgeting tools, deeper financial insights, and even more ways to make financial management simpler and more effective.
          </p>
        </div>

        <div className="pt-6 text-center">
          <Button size="lg">Get Started Today</Button>
        </div>
      </div>
    </div>
  );
} 