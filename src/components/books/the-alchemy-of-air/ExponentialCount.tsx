import React, { useEffect } from "react";
import { useStatefulRef } from "@/common/useStatefulRef";
import useAnimationStateEventListener from "@/common/useAnimationEventListener";

interface Props {
    startingNumber: number;
    endingNumber: number;
    exponentialAmount: number;
    startingWaitDuration: number;
    startingRedness: number;
}

export default function ExponentialCount({
    startingNumber,
    endingNumber,
    exponentialAmount,
    startingWaitDuration,
    startingRedness,
}: Props) {
    const [elementRef, animationState, hasStartEventFired] = useAnimationStateEventListener();
    const displayNumber = useStatefulRef(startingNumber);
    const redness = useStatefulRef(startingRedness);
    const isCountingDown = startingNumber >= endingNumber;
    const comparator = isCountingDown
        ? (a: number, b: number) => {
              return a > b;
          }
        : (a: number, b: number) => {
              return a < b;
          };

    // write a function that takes a starting number, and an ending number, and exponentially counts up to the ending number within 3 seconds
    async function startExponentialCount() {
        // const startTime = Date.now();
        let waitDuration = startingWaitDuration;
        while (comparator(displayNumber.current, endingNumber)) {
            // const elapsedMilliseconds = Date.now() - startTime;
            if (isCountingDown) {
                displayNumber.current -= 1;
                if (redness.current < 210) {
                    redness.current += 3;
                }
            } else {
                displayNumber.current += 1;
                if (redness.current >= 3) {
                    redness.current -= 3;
                }
            }
            if (waitDuration < 0.05) {
                displayNumber.current = 9999;
                break;
            }

            await sleep(waitDuration); // Adjust sleep duration for desired count speed
            waitDuration *= exponentialAmount;
        }
    }

    function sleep(milliseconds: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }

    useEffect(() => {
        if (hasStartEventFired) {
            startExponentialCount();
        }
    }, [hasStartEventFired]);

    return (
        <div
            className="fade-in-on-scroll text-9xl"
            ref={elementRef}
            style={{
                color: `rgb(${redness.current},0,0)`,
            }}
        >
            {displayNumber.current === 9999 ? <>&infin;</> : Math.round(displayNumber.current)}
        </div>
    );
}
