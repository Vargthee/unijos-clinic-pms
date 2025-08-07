
import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Loading = ({ size = 'md', className }: LoadingProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={cn(
      "animate-spin rounded-full border-2 border-muted border-t-primary will-change-transform", 
      sizeClasses[size], 
      className
    )} />
  );
};

export const LoadingSpinner = ({ text = "Loading...", className }: { text?: string; className?: string }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4", className)}>
      <Loading size="md" className="sm:h-8 sm:w-8 lg:h-12 lg:w-12" />
      <p className="text-muted-foreground text-xs sm:text-sm font-medium text-center">{text}</p>
    </div>
  );
};
