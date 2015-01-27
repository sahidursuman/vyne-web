
var scheme = window.document.location.protocol === "http:" ? "ws://" : "wss://";
var uri = scheme + window.document.location.host + "/";
var ws = new ReconnectingWebSocket(uri, null, { debug: false, reconnectInterval: 4000 });
var notifications = [];
var setupNotifications = function () {

    ws.onmessage = function (message) {
        var data = JSON.parse(message.data);

        if (data.type === 'default') {
            $.growl({
                message: styleMessage(data.text)
            }, {
                type: 'info'
            });
        } else {

            var existingNotification = $.grep(notifications, function (notification) {
                return notification.type == data.type;
            });

            if (existingNotification.length > 0) {
                existingNotification[0].notification.update('message', styleMessage(data.text))
            } else {

                var visual_type = 'info';

                if (data.type === 'cancel_orders') {
                    visual_type = 'warning';
                }

                var notification = $.growl({
                    message: styleMessage(data.text)
                }, {
                    type: visual_type,
                    delay: 0
                });

                notifications.push({
                    notification: notification,
                    type: data.type
                })
            }
        }

        switch(data.type) {
            case 'new_order':
            case 'cancel_orders':
            case 'packing_orders':
                $(document).trigger( "orderChange", [data.type]);
                break;

        }
    };

    var styleMessage = function (message) {
        return '<span style="padding: 0 20px 0 0">' + message + '</span>'
    };
};

$(document).ready(setupNotifications);
$(document).on('page:load', function() {
    notifications = [];
});