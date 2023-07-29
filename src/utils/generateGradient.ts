
    export const generateGradient = (steps: number) => {
        const resultingGradientColors = []
        
        // The colors represented in RGB format
        const colorStops = [
            { r: 0, g: 0, b: 255 }, // Blue
            { r: 173, g: 216, b: 230 }, // Light Blue
            { r: 255, g: 165, b: 0 }, // Orange
            { r: 255, g: 0, b: 0 }, // Red
        ];

        for (let i = 0; i < colorStops.length - 1; i++) {
            let startColor = colorStops[i];
            let endColor = colorStops[i + 1];

            for (let j = 0; j < steps; j++) {
                let r = startColor.r + ((endColor.r - startColor.r) * j) / steps;
                let g = startColor.g + ((endColor.g - startColor.g) * j) / steps;
                let b = startColor.b + ((endColor.b - startColor.b) * j) / steps;

                // Ensuring the color values stay within the valid range (0-255)
                r = Math.round(Math.max(Math.min(255, r), 0));
                g = Math.round(Math.max(Math.min(255, g), 0));
                b = Math.round(Math.max(Math.min(255, b), 0));

                resultingGradientColors.push(`rgb(${r},${g},${b})`);
            }
        }
        return resultingGradientColors;
    }