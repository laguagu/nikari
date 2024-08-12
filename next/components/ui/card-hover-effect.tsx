import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 py-2",
        className,
      )}
    >
      {items.map((item, idx) => {
        const isLastItem = idx === items.length - 1;
        const isFirstItem = idx === 0;
        return (
          <Link
            href={item?.link}
            key={item?.link}
            className={`relative group block p-2 h-full w-full ${
              isLastItem ? "cursor-pointer" : "cursor-default"
            }`}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
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
            </AnimatePresence>
            <Card isLastItem={isLastItem} isFirstItem={isFirstItem} index={idx}>
              <CardTitle isLastItem={isLastItem}>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export const Card = ({
  className,
  children,
  isLastItem,
  isFirstItem,
  index,
}: {
  className?: string;
  children: React.ReactNode;
  isLastItem: boolean;
  isFirstItem?: boolean;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-zinc-300 bg-opacity-30 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 flex flex-col md:flex-row justify-center items-center",
        isLastItem ? "bg-zinc-200 bg-opacity-100" : "",
        className,
      )}
    >
      {isFirstItem && (
        <Image
          alt=""
          src={"/steps/step-1.webp"}
          height={175}
          width={175}
          className="aspect-square rounded-xl object-cover shadow-lg items-center justify-center align-middle flex flex-row order-last md:order-first lg:ml-4 xl:ml-0"
        />
      )}
      <div className="relative z-50">
        <div className={cn("p-4", isLastItem ? "flex items-center" : "")}>
          {children}
        </div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
  isLastItem,
}: {
  className?: string;
  children: React.ReactNode;
  isLastItem?: boolean;
}) => {
  return (
    <h4
      className={cn(
        "text-black font-bold tracking-wide",
        isLastItem ? "mt-0 tracking-tighter sm:tracking-normal" : "mt-4",
        className,
      )}
    >
      {children}
    </h4>
    // Tämä muuttaa Titlen näyttämään nappulalta
    //   <h4 className={cn("text-black font-bold tracking-wide mt-4", className)}>
    //   <div className={cn(isLastItem ? "border-2 p-2 bg-zinc-400 text-center rounded-full text-white inline-block" : "")}>
    //     {children}
    //   </div>
    // </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-700 tracking-wide leading-relaxed text-sm",
        className,
      )}
    >
      {children}
    </p>
  );
};
