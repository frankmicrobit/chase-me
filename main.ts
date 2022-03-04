input.onButtonPressed(Button.A, function () {
    MyPrevX = MyX
    MyX += -1
    radio.sendValue("X", MyX)
    PlotMe()
    doColitionDetect(true)
})
function PlotMe () {
    if (MyPrevX == YourX && MyPrevY == YourY) {
        led.plotBrightness(MyPrevX, MyPrevY, 1)
    } else {
        led.unplot(MyPrevX, MyPrevY)
    }
    led.plotBrightness(MyX, MyY, 255)
}
function doColitionDetect (IsMe: boolean) {
    if (MyX == YourX && MyY == YourY) {
        if (IsMe) {
            basic.showIcon(IconNames.Heart)
        } else {
            basic.showIcon(IconNames.Sad)
        }
        basic.pause(200)
        basic.clearScreen()
        PlotYou()
        PlotMe()
    }
}
input.onButtonPressed(Button.AB, function () {
    basic.clearScreen()
    PlotYou()
    PlotMe()
})
function PlotYou () {
    if (YourPrevX != MyX || YourPrevY != MyY) {
        led.unplot(YourPrevX, YourPrevY)
    }
    led.plotBrightness(YourX, YourY, 1)
}
input.onButtonPressed(Button.B, function () {
    MyPrevX = MyX
    MyX += 1
    radio.sendValue("X", MyX)
    PlotMe()
    doColitionDetect(true)
})
radio.onReceivedValue(function (name, value) {
    if (name == "X") {
        YourPrevX = YourX
        YourX = value
        PlotYou()
        PlotMe()
        doColitionDetect(false)
    }
    if (name == "Y") {
        YourPrevY = YourY
        YourY = value
    }
})
let YourPrevY = 0
let YourPrevX = 0
let MyPrevY = 0
let MyPrevX = 0
let YourY = 0
let YourX = 0
let MyY = 0
let MyX = 0
basic.clearScreen()
radio.setGroup(1)
MyX = 0
MyY = 0
YourX = 0
YourY = 0
MyPrevX = -1
MyPrevY = 0
YourPrevX = -1
YourPrevY = 0
basic.forever(function () {
    if (true) {
    	
    }
})
