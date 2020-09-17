# Cowrie
Cowrie is a JavaScript utility that allows you to add, subtract, multiply, divide, sort & partition monetary values

![](https://github.com/cowrie-io/cowrie/workflows/Release%20Pipeline/badge.svg) ![](https://github.com/cowrie-io/cowrie/workflows/Test%20Pipeline/badge.svg)

# Installation
Cowrie requires [Node.js](https://nodejs.org/) v10+ to run.
```sh
$ npm install --save @cowrie/cowrie
```

# Usage
Cowrie can be used both in a Node.js environment (server-side) or in a browser environment (client-side). After the installation with npm, add it to your source files using either of the following:
#### 1. ES6 import statement
```javascript
import Cowrie from "@cowrie/cowrie";
```

#### 2. Commonjs require statement
```javascript
const Cowrie = require('@cowrie/cowrie');
```

The following are methods available in the Cowrie object, which also amount to its features. These are some a few things to note when using the utility.
> The results of the ```plus()```, ```minus()```, ```times()```, and ```divide``` methods is another ```Cowrie``` instance. The ```allocate()``` method however, returns an array of ```Cowrie``` instances. Use the figure property to retrieve a string representation of the monetary value figure, without the currency.

> For ***addition (&plus;)*** and ***subtraction (&minus;)***, the numbers are assumbed to be of the same currency instantiated.

>  The ```allocate()``` method takes a array of numbers that represent a ratio, with ***```100%```*** as a whole.

# Features
## &plus; `Addition`
```javascript
const a = new Cowrie('KES', 0).plus(2).figure;
const b = new Cowrie('KES', 0).plus(0.1, 0.2).figure;
const c = new Cowrie('KES', 0).plus(...[1.1, 1.1, 1.1, 4]).figure;

console.log({a, b, c});
```

## &minus; Subtraction
```javascript
const a = new Cowrie('KES', 0).minus(2).figure;
const b = new Cowrie('KES', 0).minus(0.1, 0.2).figure;
const c = new Cowrie('KES', 0).minus(...[1.1, 1.1, 1.1, 4]).figure;

console.log({a, b, c});
```

## &times; `Multiplication`
```javascript
const a = new Cowrie('KES', 2090.5).times(8.61).figure;
const b = new Cowrie('KES', 2090.5, 3).times(8.61).figure;
const c = new Cowrie('KES', 209050).times(8.61).figure;

console.log({a, b, c});
```

## &div; `Division`
```javascript
const a = new Cowrie('KES', 1.21).divide(0.1).figure;
const b = new Cowrie('KES', 0.2).divide(0.1).figure;
const c = new Cowrie('KES', 0.2).divide(3).figure;
const d = new Cowrie('KES', 0.3).divide(3).figure;

console.log({a, b, c, d});
```

## a &colon; b &colon; c `Allocation`
```javascript
const a = new Cowrie('KES', 500).allocate([3, 2]).map(x => x.figure);
const b = new Cowrie('KES', 500).allocate([1, 1, 1]).map(x => x.figure);
const c = new Cowrie('KES', 500).allocate([0, 1, 1]).map(x => x.figure);

console.log({a, b, c, d});
```

# License
MIT
