# UNIJOS Clinic Management System

## Project Overview
A comprehensive medical clinic management system built for the University of Jos Health Center. This application provides healthcare professionals with tools to manage patients, appointments, medical records, and administrative tasks.

## Recent Changes (Latest Migration)
- **Date: 2025-01-07**
- Successfully migrated from Lovable to Replit environment
- Converted routing from React Router to Wouter (Replit requirement)
- Fixed corrupted component files (ViewRecordsDialog.tsx)
- Resolved import/export issues across all components
- Removed problematic sonner dependency, implemented simplified toast system
- Updated all navigation hooks to use Wouter instead of React Router
- Fixed TypeScript type mismatches between components
- **Enhanced Medical Records UI/UX**: Improved user-centric design with better visual hierarchy
- **Comprehensive Medical Records System**: Both staff and student records display properly with enhanced filtering
- **Modern Card-based Layout**: Clean, responsive design with hover effects and proper data organization
- **Advanced Search and Filtering**: Search by name, diagnosis, doctor, with role and priority filters
- **Tabbed Interface**: Separate views for all records, students, and staff with clear navigation
- **Vital Signs Display**: Visual representation of health metrics with color-coded status indicators
- Application now running successfully on Replit with enhanced medical records functionality

## Architecture
- **Frontend**: React with TypeScript, Vite bundler
- **Routing**: Wouter (Replit-compatible routing library)
- **UI Components**: Shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with dark mode support
- **State Management**: React Query for server state, React Context for theme
- **Backend**: Express.js with TypeScript
- **Storage**: In-memory storage (MemStorage) as per development guidelines
- **Development Environment**: Replit with Node.js 20

## Key Features
- Patient Management System
- Appointment Scheduling
- Comprehensive Medical Records
- Staff Management
- Dashboard with Analytics
- Dark/Light Theme Support
- Responsive Design
- Authentication System

## User Preferences
- Clean, professional medical interface
- University of Jos branding and colors
- Emphasis on data integrity and security
- Responsive design for various devices
- Simple navigation structure

## Technical Stack
- React 18 with TypeScript
- Wouter for routing
- Shadcn/ui component library
- Tailwind CSS for styling
- React Query for data fetching
- Express.js backend
- In-memory storage

## Deployment Status
- Successfully running on Replit
- Development workflow configured and operational
- All major dependencies resolved
- Ready for further development and customization