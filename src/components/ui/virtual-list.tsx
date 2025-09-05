import { memo, useMemo, useState, useCallback } from 'react';
import { useVirtualization } from '@/hooks/useVirtualization';

interface VirtualListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight: number;
  height: number;
  className?: string;
  overscan?: number;
}

export const VirtualList = memo(<T,>({
  items,
  renderItem,
  itemHeight,
  height,
  className = '',
  overscan = 5
}: VirtualListProps<T>) => {
  const { visibleItems, totalHeight, handleScroll } = useVirtualization(items, {
    itemHeight,
    containerHeight: height,
    overscan
  });

  return (
    <div
      className={`overflow-auto will-change-scroll ${className}`}
      style={{ height }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map(({ item, index, offsetTop }) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: offsetTop,
              height: itemHeight,
              width: '100%'
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
});

VirtualList.displayName = 'VirtualList';