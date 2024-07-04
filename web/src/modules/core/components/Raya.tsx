// src/LineCanvas.tsx
import React, { useRef, useEffect } from 'react';

interface LineCanvasProps {
    height?: number;
    color?: string;
}

export const Raya: React.FC<LineCanvasProps> = ({ height=1, color='gray' }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
                context.beginPath();
                context.moveTo(canvas.width / 2, 0); // Empieza en el medio del canvas (ancho)
                context.lineTo(canvas.width / 2, height);
                context.strokeStyle = color;
                    // Dibuja hacia abajo hasta la altura especificada
                context.stroke();
            }
        }
    }, [height]);

    return <canvas ref={canvasRef} width="4" height={height} />;
};
