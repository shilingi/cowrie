import Decimal from 'big.js';

/**
 * Money data-type
 * @type {Cowrie}
 */
class Cowrie {
    #amount;
    #format;
    #currency;
    #precision;

    #roundingTypes = {
        ROUND_UP: 3,
        ROUND_DOWN: 0,
        ROUND_HALF_UP: 1,
        ROUND_HALF_EVEN: 2,
    };

    /**
     * Create money
     *
     * @param {string} currency - A valid ISO 4217 codes for the currency
     * @param {number|string} amount - A string or number for the initial value defaults to zero
     * @param {number} [precision=2] - A positive integer indicating number of decimal places
     * @param {boolean} [format=true] - A Flag to format figure as currency
     */
    constructor(currency, amount, precision = 2, format = false) {
        /** @type {string} */
        this.#currency = currency;

        /** @type {string | number} */
        this.#amount = parseFloat(amount) || 0;

        /** @type {number} */
        this.#precision = precision;

        /** @type {boolean} */
        this.#format = format;
    }

    /**
     * Retrieve a formatted amount
     *
     * @return {string}
     */
    get figure() {
        let amt = this.#amount;
        if (!(amt instanceof Decimal)) {
            amt = new Decimal(this.#amount);
        }

        if (this.#format) {
            let [a, b] = amt.toFixed(this.#precision).split('.');
            a = a.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

            return b !== undefined
                ? [a, b].join('.')
                : a;
        }

        return amt.toFixed(this.#precision);
    }

    /**
     * Add the provided numbers to the current or initial value
     *
     * @param  {...number} x - A positive or negative number
     * @return {Cowrie}
     */
    plus(...x) {
        const sum = x.reduce((sigma, x) => {
            return sigma.plus(x);
        }, new Decimal(this.#amount));

        return new Cowrie(this.#currency, sum, this.#precision);
    }


    /**
     * Subtract the provided numbers to the current or initial value
     *
     * @param  {...number} x - A positive or negative number
     * @return {Cowrie}
     */
    minus(...x) {
        const difference = x.reduce((sigma, x) => {
            return sigma.minus(x);
        }, new Decimal(this.#amount));

        return new Cowrie(this.#currency, difference, this.#precision);
    }

    /**
     * Multiply the current or initial value by a given factor
     *
     * @param  {number} x - A positive or negative number
     * @return {Cowrie}
     */
    times(x) {
        const product = new Decimal(this.#amount).times(x);

        return new Cowrie(this.#currency, product, this.#precision);
    }

    /**
     * Divide the current or initial value by a given quotient
     *
     * @param  {number} x - A positive or negative number
     * @return {Cowrie}
     */
    divide(x) {
        const quotient = new Decimal(this.#amount).div(x);

        return new Cowrie(this.#currency, quotient, this.#precision);
    }

    /**
     * Split the current amount by the given allocation percentage or ratio
     *
     * @param  {Array} ratio - An array representing the fractional allocations e.g ratio of 2:1 => [2, 1]
     * @return {Array.<Cowrie>}
     */
    allocate(ratio) {
        const commonFactor = new Decimal(100).div(ratio.reduce((a, b) => a + b));

        return ratio.map((x, i) => {
            const percentage = commonFactor.times(x);
            const allocation = new Decimal(this.#amount).times(percentage).div(100);

            const amount = i % 2 == 0
                ? allocation.round(this.#precision, 3)
                : allocation.round(this.#precision, 0);

            return new Cowrie(this.#currency, amount, this.#precision);
        });
    }
}

export default Cowrie;
