interface TrajImage {
    positions?: number[][];
    numbers?: number[];
    cell?: number[][];
    energy?: number;
    [key: string]: any;
}

export function parseASETrajectoryFromText(fileContent: string): TrajImage[] {
    const images: TrajImage[] = [];
    const len = fileContent.length;
    let index = 0;

    while (index < len) {
        const startIndex = fileContent.indexOf("{", index);
        if (startIndex === -1) {
            break;
        }

        let braceCount = 1;
        let endIndex = startIndex + 1;

        while (endIndex < len && braceCount > 0) {
            const char = fileContent[endIndex];
            if (char === "{") {
                braceCount++;
            } else if (char === "}") {
                braceCount--;
            }
            endIndex++;
        }

        if (braceCount === 0) {
            const jsonStr = fileContent.substring(startIndex, endIndex);
            try {
                // Remove any control characters that might interfere with parsing
                const sanitizedJsonStr = jsonStr.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
                const json = JSON.parse(sanitizedJsonStr);
                const image = extractRelevantData(json);
                images.push(image);
            } catch (e) {
                // If parsing fails, move past the current '{' character
                index = startIndex + 1;
                continue;
            }
            // Move index to the end of the current JSON block
            index = endIndex;
        } else {
            // Unbalanced braces; no more valid JSON blocks
            break;
        }
    }

    return images;
}

function extractRelevantData(json: any): TrajImage {
    const image: TrajImage = {};

    // Extract positions
    if (json["positions."]) {
        const positionsData = json["positions."];
        const positions = parseNdArray(positionsData);
        if (positions) image.positions = positions;
    }

    // Extract atomic numbers
    if (json["numbers."]) {
        const numbersData = json["numbers."];
        const numbers = parseNdArray(numbersData);
        if (numbers) image.numbers = numbers.map((num: number) => Math.round(num));
    }

    // Extract cell (lattice vectors)
    if (json["cell"]) {
        image.cell = json["cell"];
    }

    // Extract energy if available
    if (json["calculator."] && json["calculator."].energy) {
        image.energy = json["calculator."].energy;
    }

    return image;
}

function parseNdArray(ndarrayInfo: any): any {
    if (ndarrayInfo && ndarrayInfo.ndarray) {
        const [shape, dtype, dataStringOrOffset] = ndarrayInfo.ndarray;

        // Check if data is a base64-encoded string or an offset
        if (typeof dataStringOrOffset === "string") {
            // Data is a base64-encoded string
            const dataArray = decodeBase64Data(dataStringOrOffset, dtype);
            if (!dataArray) return null;
            return reshapeArray(Array.from(dataArray), shape);
        } else if (typeof dataStringOrOffset === "number") {
            // Data is an offset in the binary file
            // Since we're reading the file as text, we cannot access binary data via offset
            // So we'll skip these entries
            return null;
        }
    }

    return null;
}

function decodeBase64Data(dataString: string, dtype: string): Float64Array | BigInt64Array | null {
    // Decode the base64 string to get binary data
    const binaryString = atob(dataString);
    const byteLength = binaryString.length;
    const bytes = new Uint8Array(byteLength);

    for (let i = 0; i < byteLength; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    switch (dtype) {
        case "float64":
            return new Float64Array(bytes.buffer);
        case "int64":
            if (typeof BigInt64Array !== "undefined") {
                return new BigInt64Array(bytes.buffer);
            } else {
                console.error("BigInt64Array is not supported in this environment.");
                return null;
            }
        default:
            console.error(`Unsupported data type: ${dtype}`);
            return null;
    }
}

function reshapeArray(data: number[] | bigint[], shape: number[]): any {
    if (shape.length === 0) {
        return data[0];
    }

    const [size, ...restShape] = shape;
    const chunkSize = restShape.reduce((a, b) => a * b, 1);
    const result = [];

    for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        result.push(reshapeArray(chunk, restShape));
    }

    return result;
}
