import React, { useEffect, useRef, useState } from "react";

import { startAnimationEventName } from "@/common/animations";

function useAnimationEventListener(): [React.RefObject<HTMLDivElement>, boolean] {
    // TODO: this state is SET inside of a callback. do we need to use a stateful ref? not sure
    const [hasEventFired, setHasEventFired] = useState<boolean>(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleAnimationEvent = () => {
            setHasEventFired(true);
        };

        const currentElement = elementRef.current;

        if (currentElement) {
            currentElement.addEventListener(startAnimationEventName, handleAnimationEvent);

            // Clean up the event listener when the component unmounts
            return () => {
                currentElement.removeEventListener(startAnimationEventName, handleAnimationEvent);
            };
        }
    }, []);

    return [elementRef, hasEventFired];
}

export default useAnimationEventListener;
