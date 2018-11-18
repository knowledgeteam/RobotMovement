# David Wilson - IOOF Coding Challenge

The application is a simulation of a toy robot moving on a square tabletop.

## Getting Started

All dependencies are included and the system can be run locally. Open index.html to begin.

## Approach

The app is designed around the command design pattern. It was built with extensibility in mind.
For example new Robot Commands can be crfeated easily without modifying the existing code.

## Using the System
The robot can be sent commands via the text input below the grid.

| Command | Examples        | Description                                                    |
| --------|-----------------|----------------------------------------------------------------|
|Place    |Place 0,0,north  |Place the robot on the grid at position 0,0 facing north.       |
|Move     |Move             |Move the Robot. Defaults to one space forwards.                 |
|         |Move forwards,4  |                                                                |
|         |Move backwards,3 |                                                                |
|         |Move slide-left,1|                                                                |
|Left     |Left             |Turn the robot left.                                            |
|Right    |Right            |Display a report of the robots current position and orientation.|
|UTurn    |UTurn            |Turn the robot around to face the opposite direction.           |
|Report   |report           |Display a report of the robots current position and orientation.|

## Testing the System

The system has a built in automated testing tool - it can be accessed by clicking on the 'Run Tests' button.

## Known Issues
* Resizing the window can cause the rows to wrap.

## Built With
* [vue](https://vuejs.org/)
* [bootstrap](https://getbootstrap.com/)
* [jQuery](https://jquery.com/)

## Author
* **David Wilson** <david.wilson@knowledgeteam.com>