import parse from './parse';

/**
 * A currency data type to represent fiat money
 * @param {string|number} amount - the figure to represent
 * @param {number} [scale=2] - the number of decimal places to use in calculations
 */
function Cowrie(amount, scale) {
    const defaults = {value: '0', accuracy: '0', precision: 2};
    const monetary = parse(amount);

    this.value = monetary?.value || defaults.value;
    this.accuracy = monetary?.accuracy || defaults.accuracy;
    this.precision = scale || defaults.precision;

    Object.defineProperties(this, {
        'figure': {
            'get': function() {
                const amount = parseInt(this.value) + parseFloat(this.accuracy);

                const decimals = Math.pow(10, this.precision);
                return Math.round((amount + Number.EPSILON) * decimals) / decimals;
            },
        },
    });

    this.plus = function() {

    };

    this.minus = function() {

    };

    this.times = function() {

    };

    this.divide = function() {

    };

    this.format = () => {
        const value = (this.figure).toFixed(this.precision);

        try {
            return value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
        } catch (error) {
            console.error(error);

            const parts = value.split('.');

            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return parts.join('.');
        }
    };
}

export default Cowrie;
