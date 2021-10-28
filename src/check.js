export const defined = (x) => {
    return typeof x !== 'undefined';
};

export const string = (x) => {
    return typeof x === 'string' || x instanceof String;
};

export const integer = (x) => {
    return !isNaN(parseInt(x)) && isFinite(x) && Number.isInteger(x);
};

export const decimal = (x) => {
    return !isNaN(parseFloat(x)) && isFinite(x) && !Number.isInteger(x);
};

export const ratio = (x) => {
    return (
        x.length > 1 && x.every((term) => term >= 0) && x.some((term) => term > 0)
    );
};

export default {
    defined,
    integer,
    decimal,
    string,
    ratio,
};
