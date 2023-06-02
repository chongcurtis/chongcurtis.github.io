import React from "react";
import { startAnimationEventName } from "@/common/animations";
import {useStatefulRef} from "@/common/utils";

export default function ExponentialCount({startingNumber, endingNumber}: {startingNumber: number, endingNumber: number}) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const displayNumber = useStatefulRef(startingNumber);

    // write a function that takes a starting number, and an ending number, and exponentially counts up to the ending number within 3 seconds
    function exponentialCount(exponentialAmount:number): void {
        const startTime = Date.now();
        while (displayNumber.current <= endingNumber) {
          const elapsedMilliseconds = Date.now() - startTime;
          if (elapsedMilliseconds >= 3000) {
            break;
          }

          displayNumber.current *= exponentialAmount;
          sleep(100); // Adjust sleep duration for desired count speed
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

        const startAnimation = () => {
            exponentialCount(1.1);
        };

        container.addEventListener(startAnimationEventName, startAnimation);
        return () => {
            // cleanup
            container.removeEventListener(startAnimationEventName, startAnimation);
        };
    }, [containerRef]);

    return (
        <div className="fade-in-on-scroll h-[350px] w-[350px] md:h-[500px] md:w-[500px]" ref={containerRef}>
            {displayNumber.current}
        </div>
    );
}
