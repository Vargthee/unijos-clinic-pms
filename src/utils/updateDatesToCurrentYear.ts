// Utility to update all 2024 dates to 2025 across the application
export const updateDatesToCurrentYear = (text: string): string => {
  return text.replace(/2024-(\d{2}-\d{2})/g, '2025-$1');
};

// Function to format dates consistently
export const formatMedicalDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Function to get current year for medical records
export const getCurrentMedicalYear = (): string => {
  return '2025';
};