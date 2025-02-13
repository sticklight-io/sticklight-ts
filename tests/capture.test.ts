import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { capture } from '../src';
import { assumes } from './util';

const STICKLIGHT_API_KEY_ENV_VAR_NAME = 'STICKLIGHT_API_KEY';

describe('capture', () => {
    let originalApiKey: string | undefined;

    beforeEach(() => {
        originalApiKey = process.env[STICKLIGHT_API_KEY_ENV_VAR_NAME];
    });

    afterEach(() => {
        if (originalApiKey) {
            process.env[STICKLIGHT_API_KEY_ENV_VAR_NAME] = originalApiKey;
        } else {
            delete process.env[STICKLIGHT_API_KEY_ENV_VAR_NAME];
        }
    });

    it('should be importable from root', () => {
        expect(typeof capture).toBe('function');
    });

    it('should raise error when API key not found', () => {
        delete process.env[STICKLIGHT_API_KEY_ENV_VAR_NAME];
        expect(() => capture({ event: 'test' })).rejects.toThrow();
    });

    it('should not error when API key provided from env', 
        assumes(process.env[STICKLIGHT_API_KEY_ENV_VAR_NAME] !== undefined)(async () => {
            await capture({ event: 'test' });
        })
    );

    it('should not error when API key provided as argument',
        assumes(process.env[STICKLIGHT_API_KEY_ENV_VAR_NAME] !== undefined)(async () => {
            const sticklightApiKey = process.env[STICKLIGHT_API_KEY_ENV_VAR_NAME]!;
            delete process.env[STICKLIGHT_API_KEY_ENV_VAR_NAME];
            await capture({ event: 'test' }, { sticklightApiKey });
        })
    );
}); 