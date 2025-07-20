import React, { useRef, useEffect, useState, useCallback } from 'react';

interface CustomSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  actualValue?: number;
  showActual?: boolean;
  errorValue?: number;
  disabled?: boolean;
  marks?: { value: number; label: string }[];
}

export const CustomSlider: React.FC<CustomSliderProps> = ({
  value,
  onChange,
  min,
  max,
  step,
  actualValue,
  showActual = false,
  errorValue,
  disabled = false,
  marks = []
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState(300);
  
  const padding = Math.max(20, Math.min(40, canvasWidth * 0.08));
  const trackHeight = 8;
  const thumbRadius = 12;
  const canvasHeight = 80;

  // Convert value to x position
  const valueToX = useCallback((val: number) => {
    return padding + ((val - min) / (max - min)) * (canvasWidth - 2 * padding);
  }, [min, max, canvasWidth, padding]);

  // Convert x position to value
  const xToValue = useCallback((x: number) => {
    const ratio = (x - padding) / (canvasWidth - 2 * padding);
    const rawValue = min + ratio * (max - min);
    return Math.round(rawValue / step) * step;
  }, [min, max, step, canvasWidth, padding]);

  // Helper function to position text and prevent cutoff
  const positionTextWithinBounds = (ctx: CanvasRenderingContext2D, text: string, centerX: number) => {
    const textWidth = ctx.measureText(text).width;
    let textX = Math.round(centerX);
    
    if (centerX + textWidth / 2 > canvasWidth - padding) {
      // Too far right - align right
      ctx.textAlign = 'right';
      textX = Math.min(centerX, canvasWidth - padding);
    } else if (centerX - textWidth / 2 < padding) {
      // Too far left - align left  
      ctx.textAlign = 'left';
      textX = Math.max(centerX, padding);
    } else {
      // Center align (default)
      ctx.textAlign = 'center';
    }
    
    return textX;
  };

  // Draw the slider
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const trackY = canvasHeight / 2;
    const trackStart = padding;
    const trackEnd = canvasWidth - padding;

    // Draw track background
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(trackStart, trackY - trackHeight / 2, trackEnd - trackStart, trackHeight);

    // Draw filled track (from min to current value)
    const currentX = valueToX(value);
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(trackStart, trackY - trackHeight / 2, currentX - trackStart, trackHeight);

    // Enable crisp text rendering
    ctx.textBaseline = 'middle';
    ctx.imageSmoothingEnabled = false;

    // Draw marks
    ctx.font = '12px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    marks.forEach(mark => {
      const markX = valueToX(mark.value);
      
      // Draw mark line
      ctx.strokeStyle = '#6b7280';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(markX, trackY - trackHeight / 2 - 5);
      ctx.lineTo(markX, trackY + trackHeight / 2 + 5);
      ctx.stroke();

      // Draw mark label with crisp rendering
      ctx.fillStyle = '#6b7280';
      ctx.fillText(mark.label, Math.round(markX), trackY + 25);
    });

    // Draw error bar if error value is provided (BEHIND the actual value indicator)
    if (showActual && errorValue !== undefined) {
      const guessX = valueToX(value);
      const actualX = valueToX(actualValue!);
      
      // Draw error bar (horizontal line between guess and actual)
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(Math.min(guessX, actualX), trackY + 15);
      ctx.lineTo(Math.max(guessX, actualX), trackY + 15);
      ctx.stroke();

      // Draw error text
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
      const errorText = `Error: ${errorValue.toFixed(3)} eV/atom`;
      
      // Position error text in the middle of the error bar
      const errorBarCenterX = (guessX + actualX) / 2;
      const errorTextX = positionTextWithinBounds(ctx, errorText, errorBarCenterX);
      ctx.fillText(errorText, errorTextX, trackY + 35);
      
      // Reset text alignment
      ctx.textAlign = 'center';
    }

    // Draw actual value indicator (red line) if shown
    if (showActual && actualValue !== undefined) {
      const actualX = valueToX(actualValue);
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(actualX, trackY - 20);
      ctx.lineTo(actualX, trackY + 20);
      ctx.stroke();

      // Add "Actual" label with value
      ctx.fillStyle = '#dc2626';
      ctx.font = 'bold 12px system-ui, -apple-system, sans-serif';
      const actualText = `Actual: ${actualValue.toFixed(3)} eV/atom`;
      
      const textX = positionTextWithinBounds(ctx, actualText, actualX);
      ctx.fillText(actualText, textX, trackY - 25);
      
      // Reset text alignment for other text
      ctx.textAlign = 'center';
    }

    // Draw thumb
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(currentX, trackY, thumbRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // Add shadow to thumb
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetY = 2;
    ctx.beginPath();
    ctx.arc(currentX, trackY, thumbRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

  }, [value, min, max, canvasWidth, canvasHeight, marks, showActual, actualValue, errorValue, valueToX, trackHeight, thumbRadius, padding]);

  // Get position from mouse or touch event
  const getEventPosition = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    let clientX: number;

    if ('touches' in e) {
      // Touch event
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
    } else {
      // Mouse event
      clientX = e.clientX;
    }

    return clientX - rect.left;
  };

  // Get position from global mouse event (for document-level listeners)
  const getGlobalEventPosition = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    return e.clientX - rect.left;
  };

  // Handle mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    
    const x = getEventPosition(e);
    if (x === null) return;

    const newValue = xToValue(x);
    
    if (newValue >= min && newValue <= max) {
      onChange(Math.max(min, Math.min(max, newValue)));
      setIsDragging(true);
    }
  };

  // Document-level mouse move handler
  const handleDocumentMouseMove = useCallback((e: MouseEvent) => {
    if (disabled || !isDragging) return;

    const x = getGlobalEventPosition(e);
    if (x === null) return;

    const newValue = xToValue(x);
    onChange(Math.max(min, Math.min(max, newValue)));
  }, [disabled, isDragging, xToValue, onChange, min, max]);

  // Document-level mouse up handler
  const handleDocumentMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add/remove document-level mouse event listeners when dragging state changes
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDocumentMouseMove);
      document.addEventListener('mouseup', handleDocumentMouseUp);
    } else {
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.removeEventListener('mouseup', handleDocumentMouseUp);
    }

    // Cleanup on unmount
    return () => {
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.removeEventListener('mouseup', handleDocumentMouseUp);
    };
  }, [isDragging, handleDocumentMouseMove, handleDocumentMouseUp]);

  // Handle touch events with native event listeners (non-passive)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (disabled) return;
      
      // Prevent default to avoid scrolling
      e.preventDefault();
      
      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const newValue = xToValue(x);
      
      if (newValue >= min && newValue <= max) {
        onChange(Math.max(min, Math.min(max, newValue)));
        setIsDragging(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (disabled || !isDragging) return;

      // Prevent default to avoid scrolling
      e.preventDefault();

      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const newValue = xToValue(x);
      onChange(Math.max(min, Math.min(max, newValue)));
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    // Add non-passive event listeners
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [disabled, isDragging, xToValue, onChange, min, max]);

  // Resize observer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const updateCanvasWidth = () => {
      const parentWidth = parent.clientWidth;
      // Account for container padding (px-2 = 16px total)
      const availableWidth = parentWidth - 16;
      setCanvasWidth(Math.max(260, Math.min(availableWidth, 800)));
    };

    // Set initial width
    updateCanvasWidth();

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasWidth();
    });

    resizeObserver.observe(parent);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Redraw when dependencies change
  useEffect(() => {
    draw();
  }, [draw]);

  // Set canvas size with high-DPI support
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get device pixel ratio for crisp rendering on high-DPI displays
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    // Set actual canvas size in memory (scaled up)
    canvas.width = canvasWidth * devicePixelRatio;
    canvas.height = canvasHeight * devicePixelRatio;
    
    // Scale the canvas back down using CSS
    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';
    
    // Scale the drawing context so everything draws at the higher resolution
    ctx.scale(devicePixelRatio, devicePixelRatio);
    
    draw();
  }, [canvasWidth, canvasHeight, draw]);

  return (
    <div className="w-full max-w-full px-2">
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} block`}
        onMouseDown={handleMouseDown}
        style={{ 
          touchAction: 'none',
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`,
          maxWidth: '100%'
        }}
      />
    </div>
  );
}; 