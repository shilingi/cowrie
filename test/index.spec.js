import Cowrie from '../src/index';

describe('cowrie module', () => {
    describe('object constructor', () => {
        it('uses default values if none provided', () => {
            const money = new Cowrie();

            expect(money instanceof Cowrie).toBe(true);

            expect(money.value).toEqual('0');
            expect(money.precision).toEqual(2);
            expect(money.accuracy).toEqual('0');
        });
    });

    describe('figure property', () => {
        it('gets the current value represented as a float', () => {
            const a = new Cowrie(100);
            expect(a.figure).toEqual(100);

            const b = new Cowrie(99.99, 1);
            expect(b.figure).toEqual(100);

            const c = new Cowrie(99.99, 2);
            expect(c.figure).toEqual(99.99);

            const d = new Cowrie(100.954, 2);
            expect(d.figure).toEqual(100.95);
        });
    });

    describe('format function', () => {
        it('inserts comma separators & applies fixed decimal places', () => {
            const a = new Cowrie(100);
            expect(a.format()).toEqual('100.00');

            const b = new Cowrie(99.99, 1);
            expect(b.format()).toEqual('100.0');

            const c = new Cowrie(99.99, 2);
            expect(c.format()).toEqual('99.99');

            const d = new Cowrie(100.954, 2);
            expect(d.format()).toEqual('100.95');
        });
    });
});
