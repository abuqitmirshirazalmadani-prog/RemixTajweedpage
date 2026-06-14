import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Handles professional email actions across desktop & mobile.
 * On desktop, it copies the email to clipboard and opens Gmail Web composer in a new tab.
 * On mobile, it triggers email native deep-linking (mailto:).
 */
export function handleEmailClick(e: React.MouseEvent<any>, subject: string = "Tajweedpage Quran Classes Inquiry") {
  e.preventDefault();
  const email = "hello@abuqitmirlabs.tech";
  
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email);
    }
  } catch (err) {
    console.warn("Clip copy ignored", err);
  }

  const isMobile = typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  } else {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  }
}
