import React, { useRef, useEffect, useCallback, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
    findMiddleOfCoords,
    norm,
    spheresMap,
    subtract,
    fracCoordToCartesianCoord,
    getParallelepipedCornerCoords,
    getParallelepipedLatticeEdges,
} from "@/components/materials/crystalViewerHelpers";

// Mapping from atomic number to element name
const atomicNumberToElementName: { [key: number]: string } = {
    1: "H", 2: "He", 3: "Li", 4: "Be", 5: "B", 6: "C", 7: "N", 8: "O", 9: "F", 10: "Ne",
    11: "Na", 12: "Mg", 13: "Al", 14: "Si", 15: "P", 16: "S", 17: "Cl", 18: "Ar", 19: "K", 20: "Ca",
    21: "Sc", 22: "Ti", 23: "V", 24: "Cr", 25: "Mn", 26: "Fe", 27: "Co", 28: "Ni", 29: "Cu", 30: "Zn",
    31: "Ga", 32: "Ge", 33: "As", 34: "Se", 35: "Br", 36: "Kr", 37: "Rb", 38: "Sr", 39: "Y", 40: "Zr",
    41: "Nb", 42: "Mo", 43: "Tc", 44: "Ru", 45: "Rh", 46: "Pd", 47: "Ag", 48: "Cd", 49: "In", 50: "Sn",
    51: "Sb", 52: "Te", 53: "I", 54: "Xe", 55: "Cs", 56: "Ba", 57: "La", 58: "Ce", 59: "Pr", 60: "Nd",
    61: "Pm", 62: "Sm", 63: "Eu", 64: "Gd", 65: "Tb", 66: "Dy", 67: "Ho", 68: "Er", 69: "Tm", 70: "Yb",
    71: "Lu", 72: "Hf", 73: "Ta", 74: "W", 75: "Re", 76: "Os", 77: "Ir", 78: "Pt", 79: "Au", 80: "Hg",
    81: "Tl", 82: "Pb", 83: "Bi", 84: "Po", 85: "At", 86: "Rn", 87: "Fr", 88: "Ra", 89: "Ac", 90: "Th",
    91: "Pa", 92: "U", 93: "Np", 94: "Pu", 95: "Am", 96: "Cm", 97: "Bk", 98: "Cf", 99: "Es", 100: "Fm",
    101: "Md", 102: "No", 103: "Lr", 104: "Rf", 105: "Db", 106: "Sg", 107: "Bh", 108: "Hs", 109: "Mt", 110: "Ds",
    111: "Rg", 112: "Cn", 113: "Nh", 114: "Fl", 115: "Mc", 116: "Lv", 117: "Ts", 118: "Og"
};

export interface CrystalViewerProps {
    atomicNumbers: number[];
    coords: number[][];
    latticeParameters?: {
        a: number;
        b: number;
        c: number;
        alpha: number;
        beta: number;
        gamma: number;
    };
}

interface ProcessedCrystal {
    atomicNumbers: number[];
    cartesianCoords: number[][];
}

interface HoverInfo {
    elementName: string;
    mouseX: number;
    mouseY: number;
}

// Convert lattice parameters to lattice vectors
const latticeParametersToVectors = (params: {
    a: number;
    b: number;
    c: number;
    alpha: number;
    beta: number;
    gamma: number;
}): number[][] => {
    const { a, b, c, alpha, beta, gamma } = params;
    
    // Convert angles from degrees to radians
    const alphaRad = (alpha * Math.PI) / 180;
    const betaRad = (beta * Math.PI) / 180;
    const gammaRad = (gamma * Math.PI) / 180;
    
    // Calculate lattice vectors
    const cosAlpha = Math.cos(alphaRad);
    const cosBeta = Math.cos(betaRad);
    const cosGamma = Math.cos(gammaRad);
    const sinGamma = Math.sin(gammaRad);
    
    // Volume calculation
    const volume = a * b * c * Math.sqrt(1 + 2 * cosAlpha * cosBeta * cosGamma - cosAlpha * cosAlpha - cosBeta * cosBeta - cosGamma * cosGamma);
    
    // Lattice vectors
    const v1 = [a, 0, 0];
    const v2 = [b * cosGamma, b * sinGamma, 0];
    const v3 = [
        c * cosBeta,
        c * (cosAlpha - cosBeta * cosGamma) / sinGamma,
        volume / (a * b * sinGamma)
    ];
    
    return [v1, v2, v3];
};

export const CrystalViewer = ({ atomicNumbers, coords, latticeParameters }: CrystalViewerProps) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene>(new THREE.Scene());
    const cameraRef = useRef<THREE.PerspectiveCamera>();
    const rendererRef = useRef<THREE.WebGLRenderer>();
    const controlsRef = useRef<OrbitControls>();
    const currentSpheresRef = useRef<THREE.Mesh[]>([]);
    const currentLinesRef = useRef<THREE.Line[]>([]);
    const animationFrameIdRef = useRef<number>();
    const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
    const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
    const atomicNumbersRef = useRef<number[]>([]);
    
    const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);

    const clearObjects = useCallback(() => {
        // Remove spheres
        for (const sphere of currentSpheresRef.current) {
            if (sphere.geometry) {
                sphere.geometry.dispose();
            }
            if (sphere.material) {
                if (Array.isArray(sphere.material)) {
                    sphere.material.forEach((material) => material.dispose());
                } else {
                    sphere.material.dispose();
                }
            }
            sphere.removeFromParent();
        }
        currentSpheresRef.current = [];

        // Remove lines
        for (const line of currentLinesRef.current) {
            if (line.geometry) {
                line.geometry.dispose();
            }
            if (line.material) {
                if (Array.isArray(line.material)) {
                    line.material.forEach((material) => material.dispose());
                } else {
                    line.material.dispose();
                }
            }
            line.removeFromParent();
        }
        currentLinesRef.current = [];
    }, []);

    const drawCrystal = useCallback((processedCrystal: ProcessedCrystal, latticeVectors?: number[][], atomCentroid?: number[]) => {
        clearObjects();

        // Store atomic numbers for hover functionality
        atomicNumbersRef.current = [...processedCrystal.atomicNumbers];

        // Draw atoms
        const numAtoms = processedCrystal.atomicNumbers.length;
        for (let i = 0; i < numAtoms; i++) {
            const sphere = spheresMap.get(processedCrystal.atomicNumbers[i]);
            if (!sphere) {
                console.error(
                    `No sphere found for atomic number ${processedCrystal.atomicNumbers[i]}`
                );
                continue;
            }
            const cartPos = processedCrystal.cartesianCoords[i];

            const newSphere = sphere.clone();
            newSphere.position.set(cartPos[0], cartPos[1], cartPos[2]);
            sceneRef.current.add(newSphere);
            currentSpheresRef.current.push(newSphere);
        }

        // Draw lattice edges if lattice vectors are provided
        if (latticeVectors && atomCentroid) {
            // Position the unit cell so its origin is at the negative centroid
            // This aligns the lattice with the centered atoms
            const latticeOrigin = [-atomCentroid[0], -atomCentroid[1], -atomCentroid[2]];
            
            // Create corner coordinates starting from the shifted origin
            const cornerCoords = getParallelepipedCornerCoords(latticeVectors);
            const shiftedCornerCoords = cornerCoords.map(corner => [
                corner[0] + latticeOrigin[0],
                corner[1] + latticeOrigin[1],
                corner[2] + latticeOrigin[2]
            ]);
            
            const edges = getParallelepipedLatticeEdges(shiftedCornerCoords);
            
            for (const edge of edges) {
                const [p1, p2] = edge;
                const points = [
                    new THREE.Vector3(p1[0], p1[1], p1[2]),
                    new THREE.Vector3(p2[0], p2[1], p2[2])
                ];
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const material = new THREE.LineBasicMaterial({ color: 0x0000ff, opacity: 0.5, transparent: true });
                const line = new THREE.Line(geometry, material);
                sceneRef.current.add(line);
                currentLinesRef.current.push(line);
            }
        }
    }, [clearObjects]);

    const handleMouseMove = useCallback((event: MouseEvent) => {
        if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;

        const rect = mountRef.current.getBoundingClientRect();
        const mouse = mouseRef.current;
        
        // Calculate mouse position in normalized device coordinates (-1 to +1)
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Update the raycaster
        raycasterRef.current.setFromCamera(mouse, cameraRef.current);

        // Check for intersections with spheres
        const intersects = raycasterRef.current.intersectObjects(currentSpheresRef.current);

        if (intersects.length > 0) {
            const intersectedSphere = intersects[0].object;
            const sphereIndex = currentSpheresRef.current.indexOf(intersectedSphere as THREE.Mesh);
            
            if (sphereIndex !== -1 && atomicNumbersRef.current[sphereIndex]) {
                const atomicNumber = atomicNumbersRef.current[sphereIndex];
                const elementName = atomicNumberToElementName[atomicNumber] || `Element ${atomicNumber}`;
                
                setHoverInfo({
                    elementName,
                    mouseX: event.clientX,
                    mouseY: event.clientY
                });
            }
        } else {
            setHoverInfo(null);
        }
    }, []);

    const render = useCallback(() => {
        if (cameraRef.current && sceneRef.current && rendererRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
        controlsRef.current?.update();
        animationFrameIdRef.current = requestAnimationFrame(render);
    }, []);

    useEffect(() => {
        if (!coords || coords.length === 0 || !atomicNumbers || atomicNumbers.length === 0) {
            return;
        }

        const mount = mountRef.current!;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);
        
        const camera = new THREE.PerspectiveCamera(
            75,
            mount.clientWidth / mount.clientHeight,
            0.1,
            1000
        );
        
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mount.appendChild(renderer.domElement);

        // Add lighting
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(100, 100, 100).normalize();
        scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight2.position.set(-100, -100, -100).normalize();
        scene.add(directionalLight2);

        const ambientLight = new THREE.AmbientLight(0xbbbbbb, 0.9);
        scene.add(ambientLight);

        // Convert fractional coordinates to Cartesian coordinates
        let cartesianCoords = coords;
        let latticeVectors: number[][] | undefined = undefined;
        
        if (latticeParameters) {
            // Convert lattice parameters to lattice vectors
            latticeVectors = latticeParametersToVectors(latticeParameters);
            
            // Convert fractional coordinates to Cartesian coordinates
            cartesianCoords = coords.map(fracCoord => 
                fracCoordToCartesianCoord(fracCoord, latticeVectors!)
            );
        }

        // Center the coordinates
        const middleOfAtoms = findMiddleOfCoords(cartesianCoords);
        const centeredCoords = cartesianCoords.map(coord => subtract(coord, middleOfAtoms));

        const processedCrystal: ProcessedCrystal = {
            atomicNumbers,
            cartesianCoords: centeredCoords,
        };

        // Calculate furthest distance for camera positioning
        let furthestDistFromOrigin = 0;
        for (const coord of centeredCoords) {
            furthestDistFromOrigin = Math.max(furthestDistFromOrigin, norm(coord));
        }
        
        // Also consider lattice extent for camera positioning
        if (latticeVectors) {
            for (const vec of latticeVectors) {
                furthestDistFromOrigin = Math.max(furthestDistFromOrigin, norm(vec));
            }
        }

        // Set up camera position
        camera.position.x = furthestDistFromOrigin * 1.0;
        camera.position.y = furthestDistFromOrigin * 1.0;
        camera.position.z = furthestDistFromOrigin * 1.0;

        // Set up orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = Math.max(1, furthestDistFromOrigin * 0.5);
        controls.maxDistance = furthestDistFromOrigin * 2;

        // Store references
        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;
        controlsRef.current = controls;

        // Draw the crystal structure - lattice positioned relative to centered atoms
        if (latticeVectors) {
            drawCrystal(processedCrystal, latticeVectors, middleOfAtoms);
        } else {
            drawCrystal(processedCrystal);
        }

        // Add mouse event listener for hover detection
        mount.addEventListener('mousemove', handleMouseMove);
        mount.addEventListener('mouseleave', () => setHoverInfo(null));

        // Start render loop
        render();

        // Cleanup
        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
            clearObjects();
            mount.removeEventListener('mousemove', handleMouseMove);
            mount.removeEventListener('mouseleave', () => setHoverInfo(null));
            mount.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, [atomicNumbers, coords, latticeParameters, drawCrystal, render, clearObjects, handleMouseMove]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            const mount = mountRef.current;
            if (mount && cameraRef.current && rendererRef.current) {
                const width = mount.clientWidth;
                const height = mount.clientHeight;
                
                cameraRef.current.aspect = width / height;
                cameraRef.current.updateProjectionMatrix();
                rendererRef.current.setSize(width, height);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div ref={mountRef} style={{ width: "100%", height: "100%", position: "relative" }}>
            {hoverInfo && (
                <div
                    style={{
                        position: "fixed",
                        left: hoverInfo.mouseX + 10,
                        top: hoverInfo.mouseY - 10,
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        pointerEvents: "none",
                        zIndex: 1000,
                        whiteSpace: "nowrap"
                    }}
                >
                    {hoverInfo.elementName}
                </div>
            )}
        </div>
    );
}; 