import init from '../src/parse';

describe('parse module', () => {
    it('parses numbers represented in scientific notation', () => {
        const a = init(0.0000001);
        expect(a).toMatchObject({value: 0, accuracy: '0.0000001', precision: 7});
    });

    it('parses numbers represented in standard notation', () => {
        const a = init(100);
        const b = init(99.99);
        const c = init(0.125);

        expect(a).toMatchObject({value: 100, accuracy: '0', precision: 0});
        expect(b).toMatchObject({value: 99, accuracy: '0.99', precision: 2});
        expect(c).toMatchObject({value: 0, accuracy: '0.125', precision: 3});
    });
});
