import { memo } from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'text' | 'avatar' | 'button';
}

const Skeleton = memo(({ className, variant = 'default' }: SkeletonProps) => {
  const baseClasses = "animate-pulse bg-muted rounded";
  
  const variantClasses = {
    default: "h-4 w-full",
    card: "h-32 w-full",
    text: "h-3 w-3/4",
    avatar: "h-10 w-10 rounded-full",
    button: "h-9 w-20"
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      aria-hidden="true"
    />
  );
});

Skeleton.displayName = 'Skeleton';

export { Skeleton };

// Common skeleton patterns
export const CardSkeleton = memo(() => (
  <div className="p-4 space-y-3 border border-border rounded-lg bg-card">
    <div className="flex items-center space-x-3">
      <Skeleton variant="avatar" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
    <Skeleton variant="card" className="h-20" />
    <div className="flex justify-between">
      <Skeleton variant="button" />
      <Skeleton variant="button" />
    </div>
  </div>
));

CardSkeleton.displayName = 'CardSkeleton';

export const TableSkeleton = memo(({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-2">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex space-x-4 p-2">
        <Skeleton variant="avatar" className="shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton variant="button" />
      </div>
    ))}
  </div>
));

TableSkeleton.displayName = 'TableSkeleton';