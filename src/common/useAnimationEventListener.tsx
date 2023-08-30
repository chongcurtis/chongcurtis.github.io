import React, { useEffect, useRef, useState } from "react";

import { ANIMATION_STATE_EVENT_NAME, AnimationState } from "@/common/animations";

function useAnimationStateEventListener(): [
    React.RefObject<HTMLDivElement>,
    AnimationState,
    boolean
] {
    // TODO: this state is SET inside of a callback. do we need to use a stateful ref? not sure
    const [animationState, setAnimationState] = useState<AnimationState>(
        AnimationState.BEFORE_START
    );
    const [hasStartEventFired, setHasStartEventFired] = useState<boolean>(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onAnimationStateEvent = (event: CustomEvent<AnimationState>) => {
            // These two sets are batched, so don't worry about multiple re-renders: https://react.dev/blog/2022/03/29/react-v18#new-feature-automatic-batching
            if (event.detail === AnimationState.RUNNING) {
                setHasStartEventFired(true);
            }
            setAnimationState(event.detail);
        };

        const currentElement = elementRef.current;

        if (currentElement) {
            currentElement.addEventListener(
                ANIMATION_STATE_EVENT_NAME,
                onAnimationStateEvent as EventListener
            );

            // Clean up the event listener when the component unmounts
            return () => {
                currentElement.removeEventListener(
                    ANIMATION_STATE_EVENT_NAME,
                    onAnimationStateEvent as EventListener
                );
            };
        }
    }, []);

    return [elementRef, animationState, hasStartEventFired];
}

export default useAnimationStateEventListener;
