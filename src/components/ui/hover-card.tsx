import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { useState, useRef, ReactNode } from "react";

interface HoverCardProps {
  items: {
    id: number;
    title: string;
    description: string;
    icon?: ReactNode;
  }[];
  className?: string;
}

export const HoverCard = ({ items, className }: HoverCardProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="relative group block p-6 bg-background h-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="relative z-10">
            <div className="p-3 mb-3 inline-flex rounded-lg bg-primary/10">
              {item.icon}
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </div>
          </div>

          {hoveredIndex === idx && (
            <motion.div
              className="absolute inset-0 bg-primary/5 rounded-lg"
              layoutId="hoverBackground"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.15 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.15, delay: 0.2 },
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}; 