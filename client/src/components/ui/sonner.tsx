// Simplified toast implementation without sonner dependency
import { useTheme } from "next-themes"

// Basic toast implementation
const toast = {
  success: (message: string) => console.log('Toast success:', message),
  error: (message: string) => console.error('Toast error:', message),
  info: (message: string) => console.log('Toast info:', message),
}

type ToasterProps = {
  children?: React.ReactNode;
}

const Toaster = ({ ...props }: ToasterProps) => {
  return null; // Simplified implementation for now
}

export { Toaster, toast }
