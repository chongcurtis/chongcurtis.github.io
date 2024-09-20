import { useStatefulRef } from "@/common/useStatefulRef";
import {
    findMiddleOfCoords,
    norm,
    spheresMap,
    subtract,
} from "@/components/materials/crystalViewerHelpers";
import { Checkbox, Slider } from "@mantine/core";
import React, { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "@mantine/core/styles.css";

export interface Frame {
    atomicNumbers: number[];
    coords: number[][];
    forces?: number[][];
}

export interface PolymerVideoViewerProps {
    frames: Frame[];
}

export const PolymerVideoViewer = ({ frames }: PolymerVideoViewerProps) => {
    const [processedFrames, setProcessedFrames] = useState<ProcessedFrame[]>([]);
    const [furthestDistFromOrigin, setFurthestDistFromOrigin] = useState(0);

    useEffect(() => {
        if (frames.length === 0) {
            return;
        }
        let currentfurthestDistFromOrigin = 0;

        for (const frame of frames) {
            for (const coord of frame.coords) {
                currentfurthestDistFromOrigin = Math.max(
                    currentfurthestDistFromOrigin,
                    norm(coord)
                );
            }
        }
        setFurthestDistFromOrigin(currentfurthestDistFromOrigin);

        const middleOfAtoms = findMiddleOfCoords(frames[frames.length - 1].coords);

        const processedFrames = frames.map((frame): ProcessedFrame => {
            const centeredCoords = frame.coords.map((coord) => subtract(coord, middleOfAtoms));
            return {
                centeredCoords,
                atomicNumbers: frame.atomicNumbers,
            };
        });

        setProcessedFrames(processedFrames);
    }, [frames]);

    if (processedFrames.length === 0) {
        return <div></div>;
    }

    return (
        <PolymerVideoViewerCanvas
            processedFrames={processedFrames}
            furthestDistFromOrigin={furthestDistFromOrigin}
        />
    );
};

export interface PolymerVideoViewerCanvasProps {
    processedFrames: ProcessedFrame[];
    furthestDistFromOrigin: number;
}

export interface ProcessedFrame {
    atomicNumbers: number[];
    centeredCoords: number[][];
}

const PolymerVideoViewerCanvas = ({
    processedFrames,
    furthestDistFromOrigin,
}: PolymerVideoViewerCanvasProps) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const sliderValueRef = useStatefulRef(0);
    const isUseFrameSliderCheckedRef = useStatefulRef(false);

    const currentFrameRef = useRef<number>(0);
    const stepRef = useRef<number>(0);
    const controlsRef = useRef<OrbitControls>();
    const currentSpheresRef = useRef<THREE.Mesh[]>([]);
    const sceneRef = useRef<THREE.Scene>(new THREE.Scene());
    const cameraRef = useRef<THREE.PerspectiveCamera>();
    const rendererRef = useRef<THREE.WebGLRenderer>();
    const animationFrameIdRef = useRef<number>();

    // Animation loop
    const animate = useCallback(() => {
        const drawFrame = (processedFrame: ProcessedFrame) => {
            // Remove existing spheres from the scene
            // from https://stackoverflow.com/questions/18357529/threejs-remove-object-from-scene
            for (const sphere of currentSpheresRef.current) {
                // Dispose of geometry
                if (sphere.geometry) {
                    sphere.geometry.dispose();
                }
                // Dispose material
                if (sphere.material) {
                    if (Array.isArray(sphere.material)) {
                        sphere.material.forEach((material) => material.dispose());
                    } else {
                        sphere.material.dispose();
                    }
                }
                sphere.removeFromParent();
            }
            // Clear the currentSpheresRef
            currentSpheresRef.current = [];

            // Add new spheres to the scene
            const numAtoms = processedFrame.atomicNumbers.length;
            for (let i = 0; i < numAtoms; i++) {
                const sphere = spheresMap.get(processedFrame.atomicNumbers[i]);
                if (!sphere) {
                    console.error(
                        `No sphere found for atomic number ${processedFrame.atomicNumbers[i]}`
                    );
                    continue;
                }
                const cartPos = processedFrame.centeredCoords[i];

                const newSphere = sphere.clone();
                newSphere.position.set(cartPos[0], cartPos[1], cartPos[2]);
                sceneRef.current.add(newSphere);
                currentSpheresRef.current.push(newSphere);
            }
        };

        if (isUseFrameSliderCheckedRef.current) {
            const frameIdx = Math.min(
                Math.round((processedFrames.length * sliderValueRef.current) / 100),
                processedFrames.length - 1
            );
            currentFrameRef.current = frameIdx;
            drawFrame(processedFrames[currentFrameRef.current]);
        } else {
            stepRef.current += 1;
            const currentFrame = currentFrameRef.current;
            if (stepRef.current === 10) {
                stepRef.current = 0;
                currentFrameRef.current = (currentFrame + 1) % processedFrames.length;
                drawFrame(processedFrames[currentFrameRef.current]);
            }
        }

        animationFrameIdRef.current = requestAnimationFrame(animate);
        controlsRef.current?.update();
        if (cameraRef.current) {
            rendererRef.current?.render(sceneRef.current, cameraRef.current);
        }
    }, [processedFrames]);

    useEffect(() => {
        const mount = mountRef.current!;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff); // Set the background color to white
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

        // Add lights to the scene
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(100, 100, 100).normalize();
        scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight2.position.set(-100, -100, -100).normalize();
        scene.add(directionalLight2);

        const ambientLight = new THREE.AmbientLight(0xbbbbbb, 0.9); // Soft white light
        scene.add(ambientLight);

        // Camera position
        camera.position.x = -300;
        camera.position.y = 0;

        // OrbitControls for interactivity
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 5; // Set the minimum zoom-in distance
        controls.maxDistance = furthestDistFromOrigin + 8; // Set the maximum zoom-out distance

        // Save references
        controlsRef.current = controls;
        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;

        // Start the animation loop
        animate();

        // Cleanup function to stop the animation loop and dispose Three.js resources
        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
            // Dispose renderer
            renderer.dispose();
            // Remove renderer from DOM
            mount.removeChild(renderer.domElement);
            // Dispose controls
            controls.dispose();
        };
    }, [processedFrames, animate, furthestDistFromOrigin]);

    return (
        <>
            <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
            <div className="flex flex-row">
                <Checkbox
                    checked={isUseFrameSliderCheckedRef.current}
                    onChange={(event) =>
                        (isUseFrameSliderCheckedRef.current = event.currentTarget.checked)
                    }
                    label="Use Frame Slider"
                />
                <Slider
                    disabled={!isUseFrameSliderCheckedRef.current}
                    className="w-[100%]"
                    value={sliderValueRef.current}
                    onChange={(v) => (sliderValueRef.current = v)}
                    color="blue"
                    marks={[
                        { value: 20, label: "20%" },
                        { value: 50, label: "50%" },
                        { value: 80, label: "80%" },
                    ]}
                />
            </div>
        </>
    );
};
