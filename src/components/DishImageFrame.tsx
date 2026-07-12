import { cn } from "@/lib/utils";

interface DishImageFrameProps {
  src: string;
  alt: string;
  className?: string;
  rounded?: "sm" | "lg" | "none";
}

/** Shared 4:3 dish photo frame — matches scripts/lib/dish-image-preset.mjs output. */
export default function DishImageFrame({
  src,
  alt,
  className,
  rounded = "sm",
}: DishImageFrameProps) {
  return (
    <div
      className={cn(
        "w-full aspect-[4/3] overflow-hidden",
        rounded === "sm" && "rounded-sm",
        rounded === "lg" && "rounded-lg",
        className,
      )}
      style={{ background: "#2a2a22" }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}
