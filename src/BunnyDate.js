
/**
 * @package BunnyJS
 * @component BunnyDate
 *
 * Wrapper around native Date object
 * Instead of new Date() use BunnyDate.create() which returns false for invalid dates
 * Create Date from SQL or convert Date to SQL string
 * Currently works only for Dates and not DateTimes
 */
export const BunnyDate = {

    // Date object factories

    /**
     * Create Date object by year, month (1-12) and day
     * Returns false if date is invalid, for example, February 31
     *
     * @param {Number|String} year   - full year
     * @param {Number|String} month  - month number 1-12 or string including '07' etc.
     * @param {Number|String} day    - day number 1-31 or string including '07' etc.
     *
     * @returns {Date|boolean}
     */
    create(year, month, day) {
        const day = parseInt(day);
        const month = parseInt(month);
        const year = parseInt(year);
        const date = new Date(year, month - 1, day);
        if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
            return date
        }
        return false;
    },

    /**
     * Creates Date object from SQL Date string, for example, '2016-07-14'
     *
     * @param {String} sqlDate
     *
     * @returns {Date|boolean}
     */
    createFromSql(sqlDate) {
        const parts = sqlDate.split('-');
        const year = parts[0];
        const monthStr = parts[1];
        const dayStr = parts[2];
        return this.create(year, monthStr, dayStr);
    },

    // Helpers

    /**
     * Get Date object meta object for custom methods and algorithms
     *
     * @param {Date} date
     * @returns {Object}
     */
    getMeta(date) {
        return {
            year: date.getUTCFullYear(),
            monthIndex: date.getUTCMonth(),
            month: date.getUTCMonth() + 1,
            monthStr: this._twoDigits(date.getUTCMonth() + 1),
            day: date.getUTCDate(),
            dayStr: this._twoDigits(date.getUTCDate())
        }
    },

    // Date object to date string converters

    /**
     * Get SQL Date string from Date object
     * @param date
     * @returns {string}
     */
    toSqlDate(date) {
        const meta = this.getMeta(date);
        return meta.year + '-' + meta.monthStr + '-' + meta.dayStr;
    },

    // private

    _twoDigits(num) {
            return (num < 10) ? '0' + num : num;
    }

};