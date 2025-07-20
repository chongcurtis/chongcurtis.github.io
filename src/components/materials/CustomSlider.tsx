import React, { useRef, useEffect, useState, useCallback } from 'react';

interface CustomSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  actualValue?: number;
  showActual?: boolean;
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
  marks = []
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState(600);
  
  const padding = 40;
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
      
      // Adjust text alignment based on position to prevent cutoff
      const textWidth = ctx.measureText(actualText).width;
      let textX = Math.round(actualX);
      
      if (actualX + textWidth / 2 > canvasWidth - padding) {
        // Too far right - align right
        ctx.textAlign = 'right';
        textX = Math.min(actualX, canvasWidth - padding);
      } else if (actualX - textWidth / 2 < padding) {
        // Too far left - align left  
        ctx.textAlign = 'left';
        textX = Math.max(actualX, padding);
      } else {
        // Center align (default)
        ctx.textAlign = 'center';
      }
      
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

  }, [value, min, max, canvasWidth, canvasHeight, marks, showActual, actualValue, valueToX, trackHeight, thumbRadius, padding]);

  // Handle mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newValue = xToValue(x);
    
    if (newValue >= min && newValue <= max) {
      onChange(Math.max(min, Math.min(max, newValue)));
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newValue = xToValue(x);
    
    onChange(Math.max(min, Math.min(max, newValue)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Resize observer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        setCanvasWidth(Math.max(300, width));
      }
    });

    resizeObserver.observe(canvas.parentElement!);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Redraw when dependencies change
  useEffect(() => {
    draw();
  }, [draw]);

  // Set canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    draw();
  }, [canvasWidth, canvasHeight, draw]);

  return (
    <div className="w-full py-4">
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="w-full cursor-pointer"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
}; 