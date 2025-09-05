import { Suspense, memo } from 'react';
import { LoadingSpinner } from '@/components/ui/loading';
import { ErrorBoundary } from '@/components/ui/error-boundary';

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  name?: string;
}

export const LazyWrapper = memo(({ 
  children, 
  fallback, 
  name = "component" 
}: LazyWrapperProps) => (
  <ErrorBoundary>
    <Suspense 
      fallback={
        fallback || <LoadingSpinner text={`Loading ${name}...`} />
      }
    >
      {children}
    </Suspense>
  </ErrorBoundary>
));

LazyWrapper.displayName = 'LazyWrapper';