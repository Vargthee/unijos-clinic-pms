import { memo, useEffect } from 'react';

// Performance monitoring and optimization utilities
class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTimer(name: string): void {
    this.metrics.set(name, performance.now());
  }

  endTimer(name: string): number {
    const start = this.metrics.get(name);
    if (!start) return 0;
    
    const duration = performance.now() - start;
    this.metrics.delete(name);
    
    // Log slow operations in development
    if (process.env.NODE_ENV === 'development' && duration > 100) {
      console.warn(`Slow operation detected: ${name} took ${duration.toFixed(2)}ms`);
    }
    
    return duration;
  }

  trackMemoryUsage(): void {
    if ('memory' in performance) {
      const memInfo = (performance as any).memory;
      console.log('Memory usage:', {
        used: `${(memInfo.usedJSHeapSize / 1048576).toFixed(2)}MB`,
        total: `${(memInfo.totalJSHeapSize / 1048576).toFixed(2)}MB`,
        limit: `${(memInfo.jsHeapSizeLimit / 1048576).toFixed(2)}MB`
      });
    }
  }
}

// Production performance hooks
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    const monitor = PerformanceMonitor.getInstance();
    
    // Monitor long tasks
    if ('PerformanceLongTaskTiming' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.duration > 50) {
            console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`);
          }
        });
      });
      observer.observe({ entryTypes: ['longtask'] });
      
      return () => observer.disconnect();
    }
  }, []);
};

// Error tracking for production
export const useErrorTracking = () => {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
      // In production, you would send this to your error tracking service
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      // In production, you would send this to your error tracking service
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);
};

// Resource preloading for critical assets
export const ResourcePreloader = memo(() => {
  useEffect(() => {
    // Preload critical fonts
    const preloadFont = (href: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    };

    // Preload critical images
    const preloadImage = (src: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = src;
      link.as = 'image';
      document.head.appendChild(link);
    };

    // Add your critical resources here
    // preloadImage('/path/to/hero-image.webp');
    
  }, []);

  return null;
});

ResourcePreloader.displayName = 'ResourcePreloader';

export { PerformanceMonitor };

// Export production utilities
export * from '@/utils/performance';