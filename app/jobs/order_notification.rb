class OrderNotification

  @queue = :order_notifications

  @logger = Logging.logger['OrderNotificationJob']

  def self.perform (message, registration_ids)
    log 'Processing order notification'
    GcmHelper.send_notification(message, registration_ids)
  end

  def self.log(message)
    @logger.info message
  end

end