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
    1: "Hydrogen (H)", 2: "Helium (He)", 3: "Lithium (Li)", 4: "Beryllium (Be)", 5: "Boron (B)", 6: "Carbon (C)", 7: "Nitrogen (N)", 8: "Oxygen (O)", 9: "Fluorine (F)", 10: "Neon (Ne)",
    11: "Sodium (Na)", 12: "Magnesium (Mg)", 13: "Aluminum (Al)", 14: "Silicon (Si)", 15: "Phosphorus (P)", 16: "Sulfur (S)", 17: "Chlorine (Cl)", 18: "Argon (Ar)", 19: "Potassium (K)", 20: "Calcium (Ca)",
    21: "Scandium (Sc)", 22: "Titanium (Ti)", 23: "Vanadium (V)", 24: "Chromium (Cr)", 25: "Manganese (Mn)", 26: "Iron (Fe)", 27: "Cobalt (Co)", 28: "Nickel (Ni)", 29: "Copper (Cu)", 30: "Zinc (Zn)",
    31: "Gallium (Ga)", 32: "Germanium (Ge)", 33: "Arsenic (As)", 34: "Selenium (Se)", 35: "Bromine (Br)", 36: "Krypton (Kr)", 37: "Rubidium (Rb)", 38: "Strontium (Sr)", 39: "Yttrium (Y)", 40: "Zirconium (Zr)",
    41: "Niobium (Nb)", 42: "Molybdenum (Mo)", 43: "Technetium (Tc)", 44: "Ruthenium (Ru)", 45: "Rhodium (Rh)", 46: "Palladium (Pd)", 47: "Silver (Ag)", 48: "Cadmium (Cd)", 49: "Indium (In)", 50: "Tin (Sn)",
    51: "Antimony (Sb)", 52: "Tellurium (Te)", 53: "Iodine (I)", 54: "Xenon (Xe)", 55: "Cesium (Cs)", 56: "Barium (Ba)", 57: "Lanthanum (La)", 58: "Cerium (Ce)", 59: "Praseodymium (Pr)", 60: "Neodymium (Nd)",
    61: "Promethium (Pm)", 62: "Samarium (Sm)", 63: "Europium (Eu)", 64: "Gadolinium (Gd)", 65: "Terbium (Tb)", 66: "Dysprosium (Dy)", 67: "Holmium (Ho)", 68: "Erbium (Er)", 69: "Thulium (Tm)", 70: "Ytterbium (Yb)",
    71: "Lutetium (Lu)", 72: "Hafnium (Hf)", 73: "Tantalum (Ta)", 74: "Tungsten (W)", 75: "Rhenium (Re)", 76: "Osmium (Os)", 77: "Iridium (Ir)", 78: "Platinum (Pt)", 79: "Gold (Au)", 80: "Mercury (Hg)",
    81: "Thallium (Tl)", 82: "Lead (Pb)", 83: "Bismuth (Bi)", 84: "Polonium (Po)", 85: "Astatine (At)", 86: "Radon (Rn)", 87: "Francium (Fr)", 88: "Radium (Ra)", 89: "Actinium (Ac)", 90: "Thorium (Th)",
    91: "Protactinium (Pa)", 92: "Uranium (U)", 93: "Neptunium (Np)", 94: "Plutonium (Pu)", 95: "Americium (Am)", 96: "Curium (Cm)", 97: "Berkelium (Bk)", 98: "Californium (Cf)", 99: "Einsteinium (Es)", 100: "Fermium (Fm)",
    101: "Mendelevium (Md)", 102: "Nobelium (No)", 103: "Lawrencium (Lr)", 104: "Rutherfordium (Rf)", 105: "Dubnium (Db)", 106: "Seaborgium (Sg)", 107: "Bohrium (Bh)", 108: "Hassium (Hs)", 109: "Meitnerium (Mt)", 110: "Darmstadtium (Ds)",
    111: "Roentgenium (Rg)", 112: "Copernicium (Cn)", 113: "Nihonium (Nh)", 114: "Flerovium (Fl)", 115: "Moscovium (Mc)", 116: "Livermorium (Lv)", 117: "Tennessine (Ts)", 118: "Oganesson (Og)"
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
    initial_zoom_factor?: number;
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

export const CrystalViewer = ({ atomicNumbers, coords, latticeParameters, initial_zoom_factor = 0.75 }: CrystalViewerProps) => {
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
            // Position the lattice relative to centered atoms (same logic as in drawCrystal)
            const latticeOrigin = [-middleOfAtoms[0], -middleOfAtoms[1], -middleOfAtoms[2]];
            const cornerCoords = getParallelepipedCornerCoords(latticeVectors);
            const shiftedCornerCoords = cornerCoords.map(corner => [
                corner[0] + latticeOrigin[0],
                corner[1] + latticeOrigin[1],
                corner[2] + latticeOrigin[2]
            ]);
            
            // Find furthest lattice corner from origin
            for (const corner of shiftedCornerCoords) {
                furthestDistFromOrigin = Math.max(furthestDistFromOrigin, norm(corner));
            }
        }

        // Set up camera position
        camera.position.x = furthestDistFromOrigin * initial_zoom_factor;
        camera.position.y = furthestDistFromOrigin * initial_zoom_factor;
        camera.position.z = furthestDistFromOrigin * initial_zoom_factor;

        // Set up orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = Math.max(1, furthestDistFromOrigin * 0.5);
        controls.maxDistance = furthestDistFromOrigin * 3;

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