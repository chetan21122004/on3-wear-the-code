import { useState, useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";

export const FloatingWhatsApp = () => {
  const [position, setPosition] = useState({ x: 20, y: window.innerHeight - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // Load saved position
  useEffect(() => {
    const saved = localStorage.getItem("whatsapp-position");
    if (saved) {
      setPosition(JSON.parse(saved));
    }
  }, []);

  // Save position
  const savePosition = (pos: { x: number; y: number }) => {
    localStorage.setItem("whatsapp-position", JSON.stringify(pos));
  };

  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStart({
      x: clientX - position.x,
      y: clientY - position.y,
    });
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;

    const newX = clientX - dragStart.x;
    const newY = clientY - dragStart.y;

    // Constrain to viewport
    const maxX = window.innerWidth - 60;
    const maxY = window.innerHeight - 60;

    const constrainedPos = {
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    };

    setPosition(constrainedPos);
  };

  const handleEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      savePosition(position);
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) {
      e.preventDefault();
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Add global event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [isDragging, dragStart, position]);

  return (
    <a
      ref={buttonRef}
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-shadow cursor-grab active:cursor-grabbing"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: "none",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={(e) => {
        // Prevent navigation if dragged
        if (isDragging) {
          e.preventDefault();
        }
      }}
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};
