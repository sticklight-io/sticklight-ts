import { describe, it, expect, beforeEach, afterEach, beforeAll } from 'vitest';
import { capture } from '../src';

const STICKLIGHT_API_KEY = process.env.STICKLIGHT_API_KEY!;


describe('capture', () => {
    beforeAll(() => {
        expect(STICKLIGHT_API_KEY).length.above(0);
    });

    it('should be importable from root', () => {
        expect(typeof capture).toBe('function');
    });
    
    it('should raise error when API key not found', () => {
        expect(() => capture('test', { foo: 'test' })).rejects.toThrow();
    });

    it('should not error when API key provided in data', async () => {
        await capture('test', { foo: 'test', $sticklightApiKey: STICKLIGHT_API_KEY });
    });
}); 