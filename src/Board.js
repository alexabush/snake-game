import React, { Component } from 'react';
import Square from './Square'
import Buttons from './Buttons'


class Board extends Component {
    state = {
        isPlaying: true,
        isTurnTaken: false,
        board: [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]
        ],
        snakeCoordinates: [[1,0], [1,1], [1,2]],
        direction: 'down'
    }

    handleBtnPress = (e) => {
        let btnName = e.target.innerText
        if (btnName === 'Up') {
            this.setState({direction: 'up'})
        } else if (btnName === 'Down') {
            this.setState({direction: 'down'})
        } else if (btnName === 'Left') {
            this.setState({direction: 'left'})
        } else if (btnName === 'Right') {
            this.setState({direction: 'right'})
        }
    }

    isCollision(){}
    isFood(){}
    isWall(){}
    gameOver() {}
    moveSnake() {
        console.log('in moveSnake')
        let headCoordinate = [...this.state.snakeCoordinates[this.state.snakeCoordinates.length-1]]
        if (this.state.direction === 'right') {
            headCoordinate[1] += 1
        } else if (this.state.direction === 'left') {
            headCoordinate[1] -= 1
        } else if (this.state.direction === 'down') {
            headCoordinate[0] += 1
        } else if (this.state.direction === 'up') {
            headCoordinate[0] -= 1
        }
        this.setState((prevState) => {
            // debugger
            let newSnakeCoordinates = [...prevState.snakeCoordinates]
            newSnakeCoordinates.push(headCoordinate)
            newSnakeCoordinates.shift()
            return { snakeCoordinates: newSnakeCoordinates, isTurnTaken: true}
        })
    }

    render() {
        const squares = this.state.board.map((row, rowIndex) => {
            return row.map((current, columnIndex) => {
                for (let [coorRow, coorCol] of this.state.snakeCoordinates) {
                    if (coorRow === rowIndex && coorCol === columnIndex) {
                        return <Square type='snake'>current</Square>
                    }
                }
                if (current === 0) {
                    return <Square type='empty'>current</Square>
                } else if (current === 2) {
                    return <Square type='food'>current</Square>
                } 
            })
        })

        if (!this.props.isInitialized) {
            let intervalId = setInterval(() => {
                console.log('interval completed')
                this.moveSnake()
            }, 1000);
            this.props.initializationComplete()       
        }


        return (
            <div className="Board">
            {squares}
            <Buttons handleBtnPress={this.handleBtnPress}/>

            </div>
        )
    }
}

export default Board