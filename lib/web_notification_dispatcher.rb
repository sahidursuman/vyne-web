require 'redis'
require 'json'
require 'erb'

module WebNotificationDispatcher

  @logger = ActiveSupport::TaggedLogging.new(Logger.new(STDOUT))
  TAG = 'Web Notification Dispatcher'

  def self.publish(warehouse_ids, notification, type = 'default')
    log "Dispatching message: '#{notification}' to warehouse #{warehouse_ids}"

    begin
      message = sanitize({warehouses: warehouse_ids.join(','), text: notification, type: type})
      DataCache.data.publish(DataCache::ADMIN_NOTIFICATION_CHANNEL, message)
    rescue Exception => exception
      error_message = "Error occurred dispatching web notification: #{exception.class} - #{exception.message}"
      log_error error_message
      log_error exception.backtrace
    end
  end

  private

  def self.sanitize(message)
    message.each { |key, value| message[key] = ERB::Util.html_escape(value) }
    JSON.generate(message)
  end

  def self.log(message)
    @logger.tagged(TAG) { @logger.info message }
  end

  def self.log_error(message)
    @logger.tagged(TAG) { @logger.error message }
  end
end