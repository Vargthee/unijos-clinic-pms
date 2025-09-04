// Comprehensive date update utility for medical records
// Updates all 2024 dates to 2025 for consistency

export const updateAllMedicalDates = (content: string): string => {
  return content
    // Update all 2024 dates to 2025
    .replace(/2024-(\d{2}-\d{2})/g, '2025-$1')
    // Update nextDue dates that would be in 2024 to 2025
    .replace(/nextDue: "2024-/g, 'nextDue: "2025-')
    // Update lastVisit dates
    .replace(/lastVisit: "2024-/g, 'lastVisit: "2025-')
    // Update lastCheckup dates  
    .replace(/lastCheckup: "2024-/g, 'lastCheckup: "2025-')
    // Update lastAssessment dates
    .replace(/lastAssessment: "2024-/g, 'lastAssessment: "2025-')
    // Update prescribedDate
    .replace(/prescribedDate: "2024-/g, 'prescribedDate: "2025-')
    // Update appointment dates
    .replace(/nextAppointment: "2024-/g, 'nextAppointment: "2025-')
    // Update dueDate
    .replace(/dueDate: "2024-/g, 'dueDate: "2025-');
};