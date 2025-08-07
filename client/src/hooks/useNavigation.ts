
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TabType } from '@/types';

export const useNavigation = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const navigate = useNavigate();

  const handleTabChange = useCallback((tab: TabType) => {
    console.log(`Navigating to tab: ${tab}`);
    setActiveTab(tab);
  }, []);

  const handleSignOut = useCallback(() => {
    console.log("Signing out...");
    // In a real app, you'd clear authentication tokens here
    navigate("/");
  }, [navigate]);

  return {
    activeTab,
    setActiveTab: handleTabChange,
    handleSignOut,
  };
};
