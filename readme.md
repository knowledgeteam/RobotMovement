# David Wilson - IOOF Coding Challenge

The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units.
There are no other obstructions on the table surface.

The robot is free to roam around the surface of the table, but must be prevented from falling to destruction.  Any movement that would result in the robot falling from the table must be prevented, however further
valid movement commands must still be allowed.

## Getting Started

All dependencies are included and the system can be run locally. Open index.html to begin.

## Approach

The code is designed to be as extensible as possible
insert specific examples...


.
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

The system has a built in automated testing tool - it can be accessed by clicking on the 'Test' button

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```
## Known Bugs
* making a turn command with a single parameter will not cause an error message -due to it being redirected to the setRelativeOrientation function which requires a single parameter. reproduce by placing robot and commanding 'left 2'

* Resizing the window can cause the rows to wrap.


## Built With
* [vue](https://vuejs.org/) - The web framework used
* [bootstrap](https://getbootstrap.com/) - 
* [jQuery](https://jquery.com/) - 

## Author
* **David Wilson** <david.wilson@knowledgeteam.com>