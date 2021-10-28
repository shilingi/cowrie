export const even = (x) => x % 2 === 0;

export const half = (x) => Math.abs(x) % 1 === 0.5;

export const precision = (x = 0) => {
    const value = x.toString();

    // eslint-disable-next-line no-unused-vars
    const [_, fraction] = value.indexOf('e-') > 0
        ? value.split('e-')
        : value.split('.');

    return fraction
        ? fraction.length
        : 0;
};

export const coercion = (a, b, arithmetic, exponent) => {
    const getPlaceValue = (x) => Math.pow(10, precision(x));
    const factor = Math.max(getPlaceValue(a), getPlaceValue(b));

    const x = Math.round(a * factor);
    const y = Math.round(b * factor);

    return arithmetic(x, y) / Math.pow(factor, exponent);
};

export const round = (a, precision, mode = 'HALF_EVEN') => {
    let result;
    const factor = Math.pow(10, precision);
    const x = coercion(a, factor, (x, y) => x * y, 2);

    switch (mode) {
        case 'UP':
            result = Math.ceil(x);
            break;

        case 'DOWN':
            result = Math.floor(x);
            break;

        case 'HALF_UP':
            result = Math.round(x);
            break;

        case 'HALF_DOWN':
            result = even(x)
                ? Math.floor(x)
                : Math.round(x);
            break;

        case 'HALF_EVEN':
            result = half(x)
                ? even( Math.round(x))
                    ? Math.round(x)
                    : Math.round(x) - 1
                : Math.round(x);
            break;

        case 'HALF_ODD':
            result = half(x)
                ? even(Math.round(x))
                    ? Math.round(x) - 1
                    : Math.round(x)
                : Math.round(x);
            break;

        case 'HALF_TOWARDS_ZERO':
            result = half(x)
                ? Math.sign(x) * Math.floor(Math.abs(x))
                : Math.round(x);
            break;

        case 'HALF_AWAY_FROM_ZERO':
            result = half(x)
                ? Math.sign(x) * Math.ceil(Math.abs(x))
                : Math.round(x);
            break;
    }

    return result / factor;
};
