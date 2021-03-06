import {IDataHook} from "../model/_types/IDataHook";
import {useRef} from "react";
import {ActionState} from "../model/dataSources/ActionState";

/**
 * Creates a function to use the async state of a
 * @param hook The data hook to forward the state to
 * @param latest Whether to only retrieve the last added action
 * @returns A function that promises can be wrapped with to track their state, a function to reset the state (mainly errors), and all the results
 */
export function useActionState<T = void>(
    hook: IDataHook,
    latest?: false
): [
    (
        /** The action to add, whose value will be returned */
        action: Promise<T> | (() => Promise<T>), 
        /** Whether to reset the state of previously added actions */
        reset?: boolean
    ) => Promise<T>,
    () => void,
    T[]
];

/**
 * Creates a function to use the async state of a
 * @param hook The data hook to forward the state to
 * @param latest Whether to only retrieve the last added action
 * @returns A function that promises can be wrapped with to track their state, a function to reset the state (mainly errors), and the last result
 */
export function useActionState<T = void>(
    hook: IDataHook,
    latest: true
): [
    (
        /** The action to add, whose value will be returned */
        action: Promise<T> | (() => Promise<T>), 
        /** Whether to reset the state of previously added actions */
        reset?: boolean
    ) => Promise<T>,
    () => void,
    T | undefined
];

export function useActionState<T = void>(
    hook: IDataHook,
    latest: boolean = false
): [
    (action: Promise<T> | (() => Promise<T>), reset?: boolean) => Promise<T>,
    () => void,
    T[] | T | undefined
] {
    const actionState = useRef(undefined as ActionState<T>);
    if (!actionState.current) actionState.current = new ActionState<T>();

    // Read the state
    let result: T[] | T | undefined;
    if (latest) result = actionState.current.get(hook);
    else result = actionState.current.getLatest(hook);

    // Return functions to track the data
    return [
        /**
         * Adds an action to be tracked
         * @param action The to be called and tracked, or just the result promise of the action
         * @param reset Whether to remove the old data
         * @returns The result of the action
         */
        (action: Promise<T> | (() => Promise<T>), reset: boolean = false) =>
            actionState.current.addAction(action, reset),

        /**
         * Removes the results of previous actions
         */
        () => actionState.current.reset(),

        /**
         * The return values of all the actions
         */
        result,
    ];
}
