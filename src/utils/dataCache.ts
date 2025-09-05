// In-memory cache for static data to prevent re-computation
const dataCache = new Map<string, any>();

export const getCachedData = <T>(key: string, factory: () => T): T => {
  if (dataCache.has(key)) {
    return dataCache.get(key);
  }
  
  const data = factory();
  dataCache.set(key, data);
  return data;
};

export const clearCache = (key?: string) => {
  if (key) {
    dataCache.delete(key);
  } else {
    dataCache.clear();
  }
};

// Precomputed indexes for fast searching
export const createSearchIndex = (items: any[], searchFields: string[]) => {
  const index = new Map<string, Set<number>>();
  
  items.forEach((item, idx) => {
    searchFields.forEach(field => {
      const value = item[field]?.toString().toLowerCase();
      if (value) {
        value.split(' ').forEach(word => {
          if (!index.has(word)) {
            index.set(word, new Set());
          }
          index.get(word)!.add(idx);
        });
      }
    });
  });
  
  return index;
};

export const searchWithIndex = (
  items: any[],
  index: Map<string, Set<number>>,
  query: string
): any[] => {
  if (!query.trim()) return items;
  
  const words = query.toLowerCase().split(' ').filter(w => w.length > 0);
  if (words.length === 0) return items;
  
  let resultIndices: Set<number> | null = null;
  
  words.forEach(word => {
    const wordIndices = new Set<number>();
    
    // Find all words that start with the search word (prefix matching)
    for (const [indexWord, indices] of index.entries()) {
      if (indexWord.startsWith(word)) {
        indices.forEach(idx => wordIndices.add(idx));
      }
    }
    
    if (resultIndices === null) {
      resultIndices = wordIndices;
    } else {
      // Intersection for AND search
      resultIndices = new Set([...resultIndices].filter(idx => wordIndices.has(idx)));
    }
  });
  
  return resultIndices ? [...resultIndices].map(idx => items[idx]) : [];
};