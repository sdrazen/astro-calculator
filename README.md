# Astro Calculator

This npm package performs astronomical calculations and conversions. If you are attempting to write an app which has to do with astronomy, this package can be of great help as you don't have to search for formulae or methods to perform a certain astronomical calculation or conversion.

## Installing

```bash
npm install astro-calculator
```

## Getting started

This package provides following functionalities (all parameters are of type `number`):

- `getDaysFromJ2000`: calculates number of days from 2000-01-01 at noon until now
  - `parameters`: year, month, day, hours, minutes
  - `returns`: number
- `getLocalSiderialTime`: calculates local siderial time
  - `parameters`: year, month, day, hours, minutes, LON
  - `returns`: number
- `getHourAngle`: calculates hour angle
  - `parameters`: localSiderialTime, RA
  - `returns`: number
- `getAltAz`: calculates altitude and azimuth
  - `parameters`: RA, DEC, LAT, LON, year, month, day, hours, minutes (RA - hours decimal; DEC, LAT, LON - degrees decimal)
  - `returns`: array of numbers - [Alt, Az] as degrees decimal
- `isLeapYear`: determines if year is leap or not
  - `parameters`: year
  - `returns`: boolean
- `convertToHours`: converts to hours
  - `parameters`: hours, minutes, seconds
  - `returns`: number
- `convertToDegreesDecimal`: converts to degrees decimal
  - `parameters`: degrees, minutes, seconds
  - `returns`: number
- `convertRAToDegreesDecimal`: converts RA to degrees decimmal
  - `parameters`: RA
  - `returns`: number
- `convertDegreesToRadians`: converts degrees to radians
  - `parameters`: degrees
  - `returns`: number
- `convertRadiansToDegrees`: converts radians to degrees
  - `parameters`: radians
  - `returns`: number
- `convertDegreesDecimalToDegreesMinutesSeconds`: converts degrees decimal to degrees, minutes and seconds
  - `parameters`: degrees
  - `returns`: array of numbers - [deg, min, sec]

## Usage

Just import the package and use its functions with appropriate parameters, like so:

```javascript
const ac = require("../astro-calculator");

let getDaysFromJ2000 = ac.getDaysFromJ2000(2022, 9, 16, 18, 32);
let getLocalSiderialTime = ac.getLocalSiderialTime(2022, 9, 16, 18, 32, 16.03);
let getHourAngle = ac.getHourAngle(8549.15, 6.45);
let getAltAz = ac.getAltAz(6.45, 29, 45.81, 15.97, 2022, 9, 16, 17, 01);
let isLeapYear = ac.isLeapYear(2022);
let convertToHours = ac.convertToHours(18, 30, 21);
let convertToDegreesDecimal = ac.convertToDegreesDecimal(123, 29, 33);
let convertRAToDegreesDecimal = ac.convertRAToDegreesDecimal(6.45);
let convertDegreesToRadians = ac.convertDegreesToRadians(36.87);
let convertRadiansToDegrees = ac.convertRadiansToDegrees(0.6435);
let convertDegreesDecimalToDegreesMinutesSeconds = ac.convertDegreesDecimalToDegreesMinutesSeconds(123.38);

console.log("getDaysFromJ2000: " + getDaysFromJ2000);
console.log("getLocalSiderialTime: " + getLocalSiderialTime);
console.log("getHourAngle: " + getHourAngle);
console.log("getAltAz: " + getAltAz);
console.log("isLeapYear: " + isLeapYear);
console.log("convertToHours: " + convertToHours);
console.log("convertToDegreesDecimal: " + convertToDegreesDecimal);
console.log("convertRAToDegreesDecimal: " + convertRAToDegreesDecimal);
console.log("convertDegreesToRadians: " + convertDegreesToRadians);
console.log("convertRadiansToDegrees: " + convertRadiansToDegrees);
console.log("convertDegreesDecimalToDegreesMinutesSeconds: " + convertDegreesDecimalToDegreesMinutesSeconds);
```

and results look like this in the console:

```
getDaysFromJ2000: 8294.272222222222
getLocalSiderialTime: 8569.714533016668
getHourAngle: 8542.699999999999
getAltAz: -14.650875603437063,351.0514900218268
isLeapYear: false
convertToHours: 18.50583333333333
convertToDegreesDecimal: 123.4925
convertRAToDegreesDecimal: 96.75
convertDegreesToRadians: 0.6435028952103092
convertRadiansToDegrees: 36.86983411666847
convertDegreesDecimalToDegreesMinutesSeconds: 123,22,48
```

**Note**: When asked for time (hour and minues) in parameters of functions for example (`getAltAz`), remember to provide UTC time, not your local current time. This, of course, doesn't apply to the function `convertToHours` which will convert to hours any value of hours, minutes and seconds you provide it to convert - that's another story because it has nothing to do with calculating siderial time, hour angle or alt/az.
