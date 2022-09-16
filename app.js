function getDaysFromJ2000(year, month, day, hours, minutes) {

    let daysFromJ2000 = 0;

    const daysToBeginningOfMonth = [ [1, 0, 0], [2, 31, 31], [3, 59, 60], [4, 90, 91], [5, 120, 121], [6, 151, 152], [7, 181, 182], [8, 212, 213], [9, 243, 244], [10, 273, 274], [11, 304, 305], [12, 334, 335] ];
    const daysSinceJ2000ToBeginningOfYear = [ [1998, -731.5], [1999, -366.5], [2000, -1.5], [2001, 364.5], [2002, 729.5], [2003, 1094.5], [2004, 1459.5], [2005, 1825.5], [2006, 2190.5], [2007, 2555.5], [2008, 2920.5], [2009, 3286.5], [2010, 3651.5], [2011, 4016.5], [2012, 4381.5], [2013, 4747.5], [2014, 5112.5], [2015, 5477.5], [2016, 5842.5], [2017, 6208.5], [2018, 6573.5], [2019, 6938.5], [2020, 7303.5], [2021, 7669.5], [2022, 8034.5], [2023, 8399.5], [2024, 8764.5], [2025, 9130.5], [2026, 9495.5], [2027, 9860.5], [2028, 10225.5] ];

    // Calculate fraction of the day
    let fractionOfDay = (hours + minutes / 60) / 24;

    // Find number of days to the beginning of month
    let numberOfDaysToBeginningOfMonth = 0;

    daysToBeginningOfMonth.forEach(element => {
        if (element[0] === month) {
            if (this.isLeapYear(year)) {
                numberOfDaysToBeginningOfMonth = element[2];
            } else {
                numberOfDaysToBeginningOfMonth = element[1];
            }
        }
    })

    // Find days since J2000.0 to the beginning of the year
    let numberOfDaysSinceJ2000ToBeginningOfYear = 0;

    daysSinceJ2000ToBeginningOfYear.forEach(element => {
        if (element[0] === year) {
            numberOfDaysSinceJ2000ToBeginningOfYear = element[1];
        }
    })

    // Add these calculations to get daysFromJ2000
    daysFromJ2000 = fractionOfDay + numberOfDaysToBeginningOfMonth + day + numberOfDaysSinceJ2000ToBeginningOfYear;

    return daysFromJ2000;

  }

  function getLocalSiderialTime(year, month, day, hours, minutes, LON) {

    let localSiderialTime = 0;

    // Calculate fraction of the day
    let UT = (hours + minutes / 60);

    // Calculate days from J2000
    let daysFromJ2000 = this.getDaysFromJ2000(year, month, day, hours, minutes);

    // Calculate local siderial time, add 360 if negative
    localSiderialTime = (100.46 + 0.985647 * daysFromJ2000 + LON + 15 * UT) < 0 ? ((100.46 + 0.985647 * daysFromJ2000 + LON + 15 * UT) + 360) : (100.46 + 0.985647 * daysFromJ2000 + LON + 15 * UT);

    return localSiderialTime;

  }

  function getHourAngle(localSiderialTime, RA) {
    return (localSiderialTime - RA) < 0 ? localSiderialTime - RA + 360 : localSiderialTime - RA;
  }

  function getAltAz(RA, DEC, LAT, LON, year, month, day, hours, minutes) {

      // RA - hours decimal
      // DEC, LAT, LON - degrees decimal
      // Result - degrees decimal (array of two numbers, altitude and azimuth)

      let AltAz = [];

      let HA = this.getHourAngle(this.getLocalSiderialTime(year, month, day, hours, minutes, LON), this.convertRAToDegreesDecimal(RA));

      let sinDEC = Math.sin(this.convertDegreesToRadians(DEC));
      let sinLAT = Math.sin(this.convertDegreesToRadians(LAT));
      let sinHA = Math.sin(this.convertDegreesToRadians(HA));
      let cosDEC = Math.cos(this.convertDegreesToRadians(DEC));
      let cosLAT = Math.cos(this.convertDegreesToRadians(LAT));
      let cosHA = Math.cos(this.convertDegreesToRadians(HA));

      let sinALT = sinDEC * sinLAT + cosDEC * cosLAT * cosHA;
      let ALT = this.convertRadiansToDegrees(Math.asin(sinALT));
      
      let cosALT = Math.cos(this.convertDegreesToRadians(ALT));
      let cosA = (sinDEC - sinALT * sinLAT) / (cosALT * cosLAT);
      let A = this.convertRadiansToDegrees(Math.acos(cosA));

      let AZ = (sinHA > 0 ? 360 - A : A);

      AltAz = [ALT, AZ];

      return AltAz;
  }

  function isLeapYear(year) {
    return (year % 400) ? ((year % 100) ? ((year % 4) ? false : true) : false) : true;
  }

  function convertToHours(hours, minutes, seconds) {
    return hours + minutes/60 + seconds/3600;
  }

  function convertToDegreesDecimal(degrees, minutes, seconds) {
    return degrees < 0 ? -(Math.abs(degrees) + minutes/60 + seconds/3600) : degrees + minutes/60 + seconds/3600;
  }

  function convertRAToDegreesDecimal (RA) {
      return RA * 15;
  }

  function convertDegreesToRadians(degrees) {
      return degrees * Math.PI / 180;
  }

  function convertRadiansToDegrees(radians) {
      return radians / (Math.PI / 180);
  }

  function convertDegreesDecimalToDegreesMinutesSeconds(degrees) {

      let deg = parseInt(degrees.toString());
      let fraction = Math.abs(degrees - deg);
      let min = parseInt((fraction * 60).toString());
      let sec = Math.round(fraction * 3600 - min * 60);

      return [deg, min, sec];
  }

module.exports = {
  getDaysFromJ2000,
  getLocalSiderialTime,
  getHourAngle,
  getAltAz,
  isLeapYear,
  convertToHours,
  convertToDegreesDecimal,
  convertRAToDegreesDecimal,
  convertDegreesToRadians,
  convertRadiansToDegrees,
  convertDegreesDecimalToDegreesMinutesSeconds
}