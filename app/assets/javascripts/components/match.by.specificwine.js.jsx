var MatchBySpecificWine = React.createClass({
    getInitialState: function () {
        return {
            specificWine: ''
        };
    },
    handleSpecificWineChange: function (event) {
        this.setState({specificWine: event.target.value});
    },
    handleSpecificWineSelection: function() {
        var cartItem = this.props.currentCartItem;

        cartItem.specific_wine = this.state.specificWine;

        CartActionCreators.createOrUpdateItem(cartItem);
    },
    render: function() {
        return (
            <div>

                <div className="row">
                    I know my specific wine
                    <input type="text" className="form-control postcode-input"
                           placeholder="Enter postcode (e.g. EC4Y 8AU)"
                           onChange={this.handleSpecificWineChange}
                           value={this.state.specificWine}
                        />
                    <button
                        className="btn btn-primary"
                        onClick={this.handleSpecificWineSelection}
                        >Specific Wine
                    </button>
                </div>
            </div>
        );
    }
});