// components/ui/dialog.tsx
import React, { useEffect, useState } from "react";

interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Dialog: React.FC<DialogProps> = ({ children, open, onOpenChange }) => {
  const [isMounted, setIsMounted] = useState(open); // controls DOM mount
  const [isVisible, setIsVisible] = useState(open); // controls animation

  useEffect(() => {
    if (open) {
      setIsMounted(true);
      setTimeout(() => setIsVisible(true), 10);

      // 🚫 Disable body scroll
      document.body.style.overflow = "hidden";
    } else {
      setIsVisible(false);

      // ✅ Re-enable scroll when closing
      document.body.style.overflow = "";
    }

    // Cleanup (in case component unmounts while open)
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsMounted(false);
      onOpenChange(false);
    }, 300); // match transition duration
  };

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end items-start transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } bg-black bg-opacity-50`}
      onClick={handleClose}
    >
      <div
        className={`bg-white w-5/6 md:w-1/2 h-full transform transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogContent: React.FC<DialogContentProps> = ({ children, className }) => (
  <div className={` ${className}`}>{children}</div>
);

export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-4">{children}</div>
);

export const DialogTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-xl font-bold">{children}</h2>
);
