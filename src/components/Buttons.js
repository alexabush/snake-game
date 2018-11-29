import React, {Component} from 'react'

class Buttons extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.handleBtnPress}>Up</button>
                <button onClick={this.props.handleBtnPress}>Down</button>
                <button onClick={this.props.handleBtnPress}>Left</button>
                <button onClick={this.props.handleBtnPress}>Right</button>
            </div>

        )
    }
}

export default Buttons;
