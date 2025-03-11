"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const DialogContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>({
  open: false,
  onOpenChange: () => { },
});

function Dialog({
  open = false,
  onOpenChange,
  children,
}: DialogProps) {
  return (
    <DialogContext.Provider value={{ open, onOpenChange: onOpenChange || (() => { }) }}>
      {children}
    </DialogContext.Provider>
  );
}

function DialogTrigger({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = React.useContext(DialogContext);

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

function DialogClose({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = React.useContext(DialogContext);

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

function DialogContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open, onOpenChange } = React.useContext(DialogContext);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div
        className={cn(
          "fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 rounded-lg",
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

function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};
