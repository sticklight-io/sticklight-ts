import { describe, it, expect, beforeAll } from 'vitest';
import { capture } from '../src';

const STICKLIGHT_API_KEY = process.env.STICKLIGHT_API_KEY!;


describe('capture', () => {
    beforeAll(() => {
        expect(STICKLIGHT_API_KEY).length.above(0);
    });

    it('Should be importable from root', () => {
        expect(typeof capture).toBe('function');
    });
    
    it('Should raise error when API key not found', () => {
        expect(() => capture('test', { foo: 'bar' })).rejects.toThrow();
    });

    it('Should not error when API key provided in data', async () => {
        await capture('test', { foo: 'bar', $sticklightApiKey: STICKLIGHT_API_KEY });
    });
});