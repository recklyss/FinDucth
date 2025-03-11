import * as React from "react"
import { cn } from "../../lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function Avatar({ className, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <img
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  )
}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
