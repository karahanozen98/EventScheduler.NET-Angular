import moment, { Moment } from 'moment';

export const isPastDateTime = (dateTime: Moment): boolean => {
    return moment().diff(dateTime) > 0;
};

export const isDateLessThanToday = (date: Moment): boolean => {
    const selectedDate = date.toDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // If the selected date is less than today, return true
    if (selectedDate < today) {
        return true;
    }

    return false;
};

export const mergeDateAndTime = (date: Moment, time: Moment): Moment => {
    const mergedDate = moment(date);
    const hour = moment(time).hour();
    const min = moment(time).minute();
    mergedDate.set('hour', hour);
    mergedDate.set('minute', min);
    return mergedDate;
};
