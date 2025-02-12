import { describe, it } from 'vitest';

type TestFunction = () => void | Promise<void>;

/**
 * Declare and enforce preconditions for a test before running it.
 */
export function assumes(...conditions: boolean[]) {
    return function (testFn: TestFunction): TestFunction {
        return () => {
            for (const condition of conditions) {
                if (!condition) {
                    throw new Error('Test precondition not met');
                }
            }
            return testFn();
        };
    };
} 