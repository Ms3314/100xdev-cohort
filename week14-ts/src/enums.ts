enum Direction {
    Up = 19,
    Down ,
    Left = 90, 
    Right
}

enum ResponsiveStatus {
    Success = 200,
    NotFound = 404,
    Error = 500
}

let something = {
    Success : 200,
    NotFound : 404,
    Error : 500
}

function doSomething(keyPressed : Direction) {
    console.log(keyPressed)
}

ResponsiveStatus.NotFound



doSomething(Direction.Down)