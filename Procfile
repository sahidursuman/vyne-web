web: bundle exec unicorn -p $PORT -c ./config/unicorn.rb
worker: env QUEUE=* TERM_CHILD=1 RESQUE_TERM_TIMEOUT=7 bundle exec rake resque:work
clock: bundle exec rake resque:scheduler
