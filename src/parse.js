/**
 * @typedef {Object} Parsed
 * @property {number} value - the whole number value in the figure
 * @property {string} accuracy - the fractional value in the figure
 * @property {number} precision - the scale presented in the figure
 */

/**
 *
 * @param {string|number} amount
 * @return {Parsed}
 */
function parse(amount) {
    const str = (amount || 0).toString();

    if (str.indexOf('e-') > 0) {
        // eslint-disable-next-line no-unused-vars
        const [_, power] = str.split('e-');

        const precision = parseInt(power);
        const accuracy = (Math.pow(10, parseInt(power) * -1))
            .toFixed(power);

        return {
            value: 0,
            accuracy,
            precision,
        };
    } else {
        const [value, mantissa] = str.split('.');

        const precision = mantissa
            ? mantissa.length
            : 0;

        const accuracy = (parseInt(mantissa ?? 0) * Math.pow(10, parseInt(precision) * -1))
            .toFixed(precision);

        return {
            accuracy,
            precision,
            value: parseInt(value ?? 0),
        };
    }
}

export default parse;
