var schemas = require('./schemas');

var MessageLog = function(data) {
    this.data = data;
}

MessageLog.prototype.data = {}

MessageLog.protype.setMessageTitle = (messageTitle) {
    this.data.message_title = messageTitle;
}

module.exports = MessageLog;

