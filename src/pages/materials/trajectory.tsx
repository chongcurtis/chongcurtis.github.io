import { PolymerVideoViewer } from "@/components/materials/PolymerVideoViewer";
import { useDropzone } from "react-dropzone";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface Frame {
    atomicNumbers: number[];
    fracCoord: number[][]; // PERF: maybe replace with a fixed size array if there's perf issues
    lattice: number[][];
}

export const TrajectoryPage = () => {
    const [frames, setFrames] = React.useState<Frame[]>([]);
    // const [forces, setForces] = React.useState<number[][]>([]);

    const onDrop = React.useCallback((files: File[]) => {
        if (files.length > 1) {
            toast.error("Please only upload one file at a time");
            return;
        }
        const uploadedFile = files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const contents = e.target?.result;
            // TODO: write this function
            // const res = parseASETrajectoryFromText(contents as string);
            // console.log(res);
        };
        reader.readAsText(uploadedFile);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'application/json': ['.traj'] },
        onDrop,
    });

    return (
        <div>
            <div className="flex flex-col items-center">
                    <h1 className="mt-10 text-2xl font-bold">Trajectory Viewer</h1>
                    <p>
                        this page doesn't work. we need a function to interpret the Python-generated
                        ase file (a binary) in Typescript
                    </p>
                    <div
                        {...getRootProps({
                            className: 'mt-10 h-40 w-[80%] cursor-pointer rounded-xl border-[1px] border-dashed border-slate-400 px-8 pb-10 pt-8',
                        })}
                    >
                        <input {...getInputProps()} />
                        <div className="flex h-full flex-col items-center justify-center">
                            <h1 className="mb-4 text-2xl font-bold">Drop your relaxation</h1>
                            <p className="text-gray-500">.traj files accepted</p>
                        </div>
                    </div>
                    <p>frames: {frames.length}</p>
                    <div className="h-[800px] w-[1000px]">
                        {/*  TODO: fix this viewer. rn the frames are missing coords. obv when we parse the traj file, we'll get the coords */}
                        {/* <PolymerVideoViewer frames={frames} /> */}
                    </div>
                    <ToastContainer />
                </div>
            </div>
        );
};
export default TrajectoryPage;
