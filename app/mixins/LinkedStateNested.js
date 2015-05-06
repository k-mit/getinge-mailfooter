React = require('react');

var InvoiceEdit = React.createClass({
    getValue: function (key) {
        return key.split(".").reduce(function (previous, current, i) {
            if (i === 0) return this.state.invoice.get(current)
            else return previous[current]
        }.bind(this), "")
    },

    setValue: function (key, value) {
        key.split(".").reduce(function (previous, current, i, keys) {
            if (keys.length === 1) this.state.invoice.set(current, value)
            else if (i === 0) return this.state.invoice.get(current)
            else if (keys.length - 1 === i) previous[current] = value
            else return previous[current]
        }.bind(this), "")

        this.setState({invoice: this.state.invoice})
    },

    linkWithState: function (key) {
        return {
            value        : this.getValue(key),
            requestChange: function (value) {
                this.setValue(key, value)
            }.bind(this)
        }
    }
});