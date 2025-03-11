import * as React from "react"
import { cn } from "../../lib/utils"

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const SheetContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side: "top" | "right" | "bottom" | "left";
}>({
  open: false,
  onOpenChange: () => { },
  side: "right",
});

function Sheet({
  open = false,
  onOpenChange,
  children,
}: SheetProps) {
  return (
    <SheetContext.Provider value={{ open, onOpenChange: onOpenChange || (() => { }), side: "right" }}>
      {children}
    </SheetContext.Provider>
  );
}

function SheetTrigger({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = React.useContext(SheetContext);

  return (
    <button
      className={cn("inline-flex items-center justify-center", className)}
      onClick={() => onOpenChange(true)}
      {...props}
    >
      {children}
    </button>
  );
}

function SheetClose({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = React.useContext(SheetContext);

  return (
    <button
      className={cn("", className)}
      onClick={() => onOpenChange(false)}
      {...props}
    >
      {children}
    </button>
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  side?: "top" | "right" | "bottom" | "left";
}) {
  const { open, onOpenChange } = React.useContext(SheetContext);

  if (!open) return null;

  const sideStyles = {
    right: "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l",
    left: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r",
    top: "inset-x-0 top-0 h-auto border-b",
    bottom: "inset-x-0 bottom-0 h-auto border-t",
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-background shadow-lg",
          sideStyles[side],
          className
        )}
        {...props}
      >
        {children}
        <button
          className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          onClick={() => onOpenChange(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
    </>
  );
}

function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

function SheetFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
