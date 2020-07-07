function LightTracking () {
    LightingValue = Rover.LightTracing()
    difValue = LightingValue - centerValue
    if (difValue > 20) {
        Rover.MotorRunDual(150, 0)
        Rover.Move(50)
    } else if (difValue < -20) {
        Rover.MotorRunDual(0, 150)
        Rover.Move(50)
    } else {
        Rover.MotorStopAll(MotorActions.Stop)
    }
}
function LineTracking () {
    trackingValues = Rover.LineTracking()
    if (trackingValues == 2 || trackingValues == 5) {
        Rover.Move(trackingSpeed)
    } else if (trackingValues == 4 || trackingValues == 6) {
        Rover.MotorRunDual(speedSlowSide, speedFastSide)
    } else if (trackingValues == 1 || trackingValues == 3) {
        Rover.MotorRunDual(speedFastSide, speedSlowSide)
    } else {
        Rover.MotorStopAll(MotorActions.Stop)
    }
}
function pivotColors () {
    if (numPivote == 1) {
        Rover.setALLRGB(Rover.colors(RoverColors.Violet))
    } else if (numPivote == 2) {
        Rover.setALLRGB(Rover.colors(RoverColors.Orange))
    } else if (numPivote == 3) {
        Rover.setALLRGB(Rover.colors(RoverColors.Blue))
    } else if (numPivote == 4) {
        Rover.setALLRGB(Rover.colors(RoverColors.Red))
    } else if (numPivote == 5) {
        Rover.setALLRGB(Rover.colors(RoverColors.Green))
    } else {
        Rover.setALLRGB(Rover.colors(RoverColors.White))
    }
}
let distance = 0
let trackingValues = 0
let difValue = 0
let LightingValue = 0
let numPivote = 0
let centerValue = 0
let sumValue = 0
let speedSlowSide = 0
let trackingSpeed = 0
let speedFastSide = 0
speedFastSide = 110
trackingSpeed = 110
speedSlowSide = 25
for (let index = 0; index <= 9; index++) {
    sumValue = sumValue + Rover.LightTracing()
}
centerValue = Math.round(sumValue / 10)
numPivote = 0
basic.forever(function () {
    distance = Rover.Ultrasonic()
    Rover.setALLRGB(Rover.colors(RoverColors.White))
    LightTracking()
    if (distance <= 5) {
        numPivote = numPivote + 1
        Rover.MotorStopAll(MotorActions.Stop)
        pivotColors()
        basic.showNumber(numPivote)
        basic.pause(2000)
        LightTracking()
    }
})
