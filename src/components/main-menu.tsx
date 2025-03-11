import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { HiMenu } from "react-icons/hi";
import { HiHome, HiOutlineViewList, HiUsers, HiCog } from "react-icons/hi";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

function MenuItem({ icon, label, href }: MenuItemProps) {
  return (
    <a
      href={href}
      className="flex items-center gap-2 p-2 hover:bg-muted rounded-md transition-colors"
    >
      <span className="text-muted-foreground">{icon}</span>
      {label}
    </a>
  );
}

export function MainMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" size="sm">
          <HiMenu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="py-4">
          <h2 className="text-lg font-semibold mb-4">Menu</h2>
          <nav className="flex flex-col gap-2">
            <MenuItem
              icon={<HiHome className="h-5 w-5" />}
              label="Home"
              href="#"
            />
            <MenuItem
              icon={<HiOutlineViewList className="h-5 w-5" />}
              label="My Expenses"
              href="#"
            />
            <MenuItem
              icon={<HiUsers className="h-5 w-5" />}
              label="Friends"
              href="#"
            />
            <MenuItem
              icon={<HiCog className="h-5 w-5" />}
              label="Settings"
              href="#"
            />
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
} 