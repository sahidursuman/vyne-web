require File.expand_path('../../config/boot',        __FILE__)
require File.expand_path('../../config/environment', __FILE__)
require 'clockwork'

include Clockwork

every(10.seconds, 'Queueing order status update.') {
  Resque.enqueue(OrderStatus)
}

every(10.seconds, 'Queueing courier location.') {
  Resque.enqueue(CourierLocation)
}

every(30.seconds, 'Queueing order reminder notification') {
  Resque.enqueue(OrderReminderNotification)
}