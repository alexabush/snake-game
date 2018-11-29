import React, {Component} from 'react'

class Square extends Component {
    render() {
        let {type} = this.props
        let val;
        if (type === 'empty') {
            val = <div className="Square">
            </div>
        } else if (type === 'snake') {
            val = <div className="Square">Snake
            </div>
        } else if (type === 'food') {
            val = <div className="Square">Food
            </div>
        }
        return (
            val
        )
    }
}

export default Square;
