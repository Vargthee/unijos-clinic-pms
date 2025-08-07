
import { useState, useCallback } from 'react';
import { useLocation } from 'wouter';
import { TabType } from '@/types';

export const useNavigation = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [, setLocation] = useLocation();

  const handleTabChange = useCallback((tab: TabType) => {
    console.log(`Navigating to tab: ${tab}`);
    setActiveTab(tab);
  }, []);

  const handleSignOut = useCallback(() => {
    console.log("Signing out...");
    // In a real app, you'd clear authentication tokens here
    setLocation("/");
  }, [setLocation]);

  return {
    activeTab,
    setActiveTab: handleTabChange,
    handleSignOut,
  };
};
