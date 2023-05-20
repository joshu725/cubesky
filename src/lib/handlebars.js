const { format } = require("timeago.js");
const moment = require("moment");

const helpers = {};

helpers.timeago = function (timestamp) {
    return format(timestamp);
};

helpers.formatDateL = function (date) {
    return moment(date).locale("es").format("L");
};

helpers.formatDate = function (date) {
    return moment(date).locale("es").format("LLL");
};

module.exports = helpers;
