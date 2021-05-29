import moment from 'moment';

const DATE_FORMAT_DEFAULT = 'DD-MMM YYYY';

const parseDate = (d) => {
    const date = moment(d).format(DATE_FORMAT_DEFAULT);
    return date;
};


const dateHelpers = {
    parseDate,
};

export default dateHelpers;
