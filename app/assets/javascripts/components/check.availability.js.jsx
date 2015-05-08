var CheckAvailability = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    componentDidMount: function () {
        if (this.props.latLng && this.props.latLng.lat && this.props.latLng.lng) {
            return WarehouseStore.getByLocation(this.props.latLng);
        }
    },
    componentWillReceiveProps: function (newProps) {
        if (newProps.latLng && newProps.latLng.lat && newProps.latLng.lng) {
            return WarehouseStore.getByLocation(newProps.latLng);
        }
    },
    render: function () {
        return (
            <div>
                <PromotionHeaderContainer
                    weDeliver={this.props.weDeliver}
                    />
                <CheckAvailability.Results
                    postcode={this.props.postcode}
                    latLng={this.props.latLng}
                    warehouse={this.props.warehouse}
                    weDeliver={this.props.weDeliver}
                    />
                <CheckAvailability.LiveDelivery
                    weDeliver={this.props.weDeliver}
                    liveDeliveryEnabled={this.props.liveDeliveryEnabled}
                    warehouse={this.props.warehouse}
                    nextOpenWarehouse={this.props.nextOpenWarehouse}
                    />
                <CheckAvailability.BlockDelivery
                    weDeliver={this.props.weDeliver}
                    liveDeliveryEnabled={this.props.liveDeliveryEnabled}
                    postcode={this.props.postcode}
                    deliverySlots={this.props.deliverySlots}
                    daytimeSlotsAvailable={this.props.daytimeSlotsAvailable}
                    warehouse={this.props.warehouse}
                    />
            </div>
        );
    }
});

CheckAvailability.Results = React.createClass({
    render: function () {

        var labelClass = 'app-label loading';

        if (this.props.weDeliver) {
            labelClass = 'app-label success fadeIn';

            if (this.props.warehouse.coming_soon) {
                labelText = 'On demand delivery available in West London ' +
                moment(this.props.warehouse.active_from).format('dddd MMMM Do');
            } else {
                labelText = 'Vyne delivers to your area';
            }
        } else {
            labelClass = 'app-label danger';
            labelText = 'Not available in your area yet';
        }

        return (
            <div className="row">
                <div className="col-xs-12">
                    <p>
                        {labelText}
                    </p>
                </div>
            </div>
        );
    }
});

CheckAvailability.LiveDelivery = React.createClass({
    bookLive: function () {
        CartActionCreators.createOrUpdate({
            postcode: this.props.postcode,
            warehouseId: this.props.warehouse.id,
            deliveryType: 'live'
        });
    },
    render: function () {

        if (!this.props.weDeliver) {
            return false;
        }

        var deliverNow = '';

        if (this.props.liveDeliveryEnabled) {
            deliverNow = (
                <div>
                    <div className="form-group form-group-submit">
                        <button type="submit" onClick={this.bookLive} className="btn btn-primary btn-lg app-btn">Now
                        </button>
                    </div>

                    <h4>Delivery in minutes</h4>

                    <p>
                    </p>
                </div>
            );
        } else if (this.props.warehouse.opens_today && this.props.warehouse.opening_time) {
            deliverNow = (
                <h4>
                    Instant delivery is only available in your area
                    <br/>
                    between {this.props.warehouse.opening_time}-{this.props.warehouse.closing_time}
                </h4>
            );
        } else if (this.props.warehouse.coming_soon) {
            deliverNow = '';

        } else if (this.props.nextOpenWarehouse && this.props.nextOpenWarehouse.opening_time) {
            deliverNow = (
                <h4>
                    Next instant delivery to your area will be on {this.props.nextOpenWarehouse.week_day}
                    <br/>
                    between {this.props.nextOpenWarehouse.opening_time}-{this.props.nextOpenWarehouse.closing_time}
                </h4>
            );
        } else {
            deliverNow = '';
        }

        return (
            <div>
                {deliverNow}
            </div>
        );
    }
});

CheckAvailability.BlockDelivery = React.createClass({
    componentDidMount: function () {
        this.setFirstSlot(this.props.deliverySlots);
    },
    componentWillReceiveProps: function (nextProps) {
        this.setFirstSlot(nextProps.deliverySlots)
    },
    setFirstSlot: function (deliverySlots) {
        if (deliverySlots && deliverySlots.length) {
            this.setState({
                date: deliverySlots[0].date,
                from: deliverySlots[0].from,
                to: deliverySlots[0].to,
                slotWarehouse: deliverySlots[0].warehouse_id
            });
        }
    },
    bookSlot: function () {
        CartActionCreators.createOrUpdate({
            postcode: this.props.postcode,
            warehouseId: this.state.slotWarehouse,
            deliveryType: 'scheduled',
            slotDate: this.state.date,
            slotFrom: this.state.from,
            slotTo: this.state.to
        }).then(function() {

        });
    },
    selectSlot: function (event) {
        var slot = $(event.target).find("option:selected").data('value');
        this.setState({
            selectedSlot: slot,
            selectedSlotText: moment(slot.date).format('dddd MMMM Do') + ' between ' + slot.from + ' and ' + slot.to,
            date: slot.date,
            from: slot.from,
            to: slot.to,
            slotWarehouse: slot.warehouse_id
        });

    },
    render: function () {

        if (!this.props.weDeliver) {
            return false;
        }

        var options = [];
        var deliverLater = '';
        var or = '';
        var slotsMessage = '';

        if (this.props.deliverySlots.length) {

            this.props.deliverySlots.map(function (slot) {
                var key = slot.date + ',' + slot.from + ',' + slot.to;
                var text = slot.day + ' ' + slot.from + ' - ' + slot.to;

                if (this.props.warehouse.coming_soon) {
                    text = slot.day + ' (' + moment(slot.date).format('MMM Do') + ') ' + slot.from + ' - ' + slot.to;
                }

                options.push(<option key={key} data-value={JSON.stringify(slot)} value={key}>{text}</option>)
            }.bind(this));


            if (this.props.daytimeSlotsAvailable && this.props.warehouse.opens_today || this.props.liveDeliveryEnabled) {
                slotsMessage = (
                    <div>
                        <p>
                        </p>

                        <h4> Book in advance for later delivery </h4>

                    </div>
                );
            }
            else if (!this.props.daytimeSlotsAvailable && !this.props.liveDeliveryEnabled) {
                slotsMessage = (
                    <div>
                        <p>
                        </p>
                        <h4>
                            Work in Central London&#63;
                            <br/>
                            Enter your work postcode for&nbsp;
                            <strong>bookable daytime slots today</strong>
                        </h4>

                        <p>
                            <h4 className="circled-text">or</h4>
                        </p>
                        <h4>Book one of the evening slots below</h4>
                    </div>
                );
            }
            else if (!this.props.warehouse.opens_today) {
                slotsMessage = (
                    <div>
                        <p>
                        </p>
                        <h4> Book in advance for later delivery</h4>
                    </div>
                );
            }


            deliverLater = (
                <div>

                    {slotsMessage}

                    <div className="form-group">
                        <select className="form-control app-btn" onChange={this.selectSlot}>
                            {options}
                        </select>
                    </div>


                    <div className="form-group">
                        <button type="submit" onClick={this.bookSlot} className="btn btn-primary btn-lg app-btn">Book
                            Now
                        </button>
                    </div>

                </div>

            );
        }

        if (this.props.liveDeliveryEnabled && this.props.deliverySlots.length) {
            or = (

                <div>
                    <h4 className="circled-text">or</h4>
                </div>

            );
        }

        return (
            <div>
                {or}
                {deliverLater}
            </div>
        );
    }
});

var CheckAvailabilityContainer = Marty.createContainer(CheckAvailability, {
    listenTo: [AddressStore, WarehouseStore],
    fetch: {
        postcode: function() {
            return AddressStore.getPostcode();
        },
        latLng: function() {
            return AddressStore.getLatLng();
        },
        warehouse: function() {
            return WarehouseStore.warehouse();
        },
        weDeliver: function() {
            return WarehouseStore.weDeliver();
        },
        liveDeliveryEnabled: function(){
            return WarehouseStore.liveDeliveryEnabled();
        },
        nextOpenWarehouse: function() {
            return WarehouseStore.nextOpenWarehouse();
        },
        deliverySlots: function() {
            return WarehouseStore.deliverySlots();
        },
        daytimeSlotsAvailable: function() {
            return WarehouseStore.daytimeSlotsAvailable();
        }
    },
    pending: function() {
        return <div className='loading'>Loading...</div>;
    },
    failed: function(errors) {
        console.log(errors)
        return <div className='error'>Failed to load. {errors}</div>;
    }
});
