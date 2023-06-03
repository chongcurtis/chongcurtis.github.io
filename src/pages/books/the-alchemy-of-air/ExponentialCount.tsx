import React from "react";
import { startAnimationEventName } from "@/common/animations";
import { useStatefulRef } from "@/common/utils";

interface Props {
    startingNumber: number;
    endingNumber: number;
    exponentialAmount: number;
}

export default function ExponentialCount({
    startingNumber,
    endingNumber,
    exponentialAmount,
}: Props) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const displayNumber = useStatefulRef(startingNumber);
    const comparator =
        startingNumber >= endingNumber
            ? (a: number, b: number) => {
                  return a >= b;
              }
            : (a: number, b: number) => {
                  return a <= b;
              };

    // write a function that takes a starting number, and an ending number, and exponentially counts up to the ending number within 3 seconds
    async function startExponentialCount() {
        // const startTime = Date.now();
        while (comparator(displayNumber.current, endingNumber)) {
            // const elapsedMilliseconds = Date.now() - startTime;
            displayNumber.current *= exponentialAmount;
            await sleep(100); // Adjust sleep duration for desired count speed
        }
    }

    function sleep(milliseconds: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }

    React.useEffect(() => {
        if (!containerRef.current) {
            return;
        }
        const container = containerRef.current;

        container.addEventListener(startAnimationEventName, startExponentialCount);
        return () => {
            // cleanup
            container.removeEventListener(startAnimationEventName, startExponentialCount);
        };
    }, [containerRef]);

    return (
        <div className="fade-in-on-scroll" ref={containerRef}>
            {Math.round(displayNumber.current)}
        </div>
    );
}
