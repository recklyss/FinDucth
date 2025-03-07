import { Button } from "../ui/button";
import { useTheme } from "../theme-provider";
import { Moon, Sun, Monitor } from "lucide-react";

export function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">Settings</h1>

        <div className="space-y-6 bg-card p-6 rounded-lg shadow">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Appearance</h2>
            <div className="space-y-2">
              <p className="text-muted-foreground mb-4">
                Customize how FinDutch looks on your device.
              </p>

              <div className="flex flex-col space-y-2">
                <h3 className="font-medium">Theme</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    className="flex items-center gap-2"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-4 w-4" />
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    className="flex items-center gap-2"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-4 w-4" />
                    Dark
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    className="flex items-center gap-2"
                    onClick={() => setTheme("system")}
                  >
                    <Monitor className="h-4 w-4" />
                    System
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Manage how and when you receive notifications.
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive updates and reminders via email
                  </p>
                </div>
                <div className="flex items-center h-6 w-11 bg-muted rounded-full p-1 cursor-pointer transition-colors duration-200 focus:outline-none">
                  <div className="h-4 w-4 bg-background rounded-full shadow-sm transform translate-x-0 transition-transform duration-200"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications on your device
                  </p>
                </div>
                <div className="flex items-center h-6 w-11 bg-primary rounded-full p-1 cursor-pointer transition-colors duration-200 focus:outline-none">
                  <div className="h-4 w-4 bg-background rounded-full shadow-sm transform translate-x-5 transition-transform duration-200"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-2xl font-semibold mb-4">Account</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your account settings and preferences
                </p>
                <Button variant="outline" size="sm">Edit Profile</Button>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Password</h3>
                <p className="text-sm text-muted-foreground">
                  Update your password
                </p>
                <Button variant="outline" size="sm">Change Password</Button>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-destructive">Danger Zone</h3>
                <p className="text-sm text-muted-foreground">
                  Delete your account and all associated data
                </p>
                <Button variant="destructive" size="sm">Delete Account</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
} 