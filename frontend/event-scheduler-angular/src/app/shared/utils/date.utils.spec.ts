import moment from 'moment';
import {
    isDateLessThanToday,
    isPastDateTime,
    mergeDateAndTime,
} from './date.utils';

describe('isDateLessThanToday', () => {
    it('should return true for past dates', () => {
        const pastDate = moment('2019-10-10');
        expect(isDateLessThanToday(pastDate)).toBe(true);
    });

    it('should return false for today’s date', () => {
        const today = moment().startOf('day');
        expect(isDateLessThanToday(today)).toBe(false);
    });

    it('should return false for future dates', () => {
        const futureDate = moment().add(1, 'day').startOf('day');
        expect(isDateLessThanToday(futureDate)).toBe(false);
    });
});

describe('isPastDateTime', () => {
    it('should return true for past dates', () => {
        const pastDate = moment('2019-10-10');
        expect(isPastDateTime(pastDate)).toBe(true);
    });

    it('should return true for todays midnight', () => {
        const today = moment().startOf('day');
        expect(isPastDateTime(today)).toBe(true);
    });

    it('should return true for now', () => {
        const now = moment();
        expect(isPastDateTime(now)).toBe(false);
    });

    it('should return false for future dates', () => {
        const futureDate = moment().add(1, 'day').startOf('day');
        expect(isPastDateTime(futureDate)).toBe(false);
    });

    it('should return false for next minute', () => {
        const nextMinute = moment().add(1, 'minute');
        expect(isPastDateTime(nextMinute)).toBe(false);
    });
});

describe('mergeDateAndTime', () => {
    it('should be 2019-10-10T02:30:00', () => {
        const date = moment('2019-10-10');
        const time = moment().hour(2).minute(30);
        console.log(time.toString());

        expect(mergeDateAndTime(date, time).toString()).toBe(
            moment('2019-10-10T02:30:00').toString()
        );
    });
});
