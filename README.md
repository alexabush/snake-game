# Snake Game

Go to https://alexabush.github.io/snake-game/ to play!

### Built with Create-React-App.

## How to Play

## Controls:

Use a,w,s,d; arrow keys; or 'up', 'down', 'left', 'right' buttons to control snake (or any combination of these three options!)

**Note** The green/red circle on the bottom left tracks if the game has focus (which it needs for the controls to work). If you lose focus, click on the game to get it back (light will turn from red to green).

## Considerations/Design Choices:

1. This version of snake moves through the walls and appears on the other side of the board. In the classic version of snake, you die if you hit the wall. I like this way better.
2. Snake moves forward one square a second. If you click multiple keys within that second window, the snake will move in the direction of the last key clicked. So if you hit 'left, right, up' in quick succession, the snake will move up and the other keypresses will be ignored.

Eat red squares and prosper!
