function ResetGame () {
    basic.clearScreen()
    MyX = 0
    MyY = 0
    OtherX = 4
    OtherY = 4
    MyPrevX = -1
    MyPrevY = -1
    OtherPrevX = 5
    OtherPrevY = 5
    for (let index = 0; index <= 4; index++) {
        basic.showNumber(4 - index)
        basic.pause(100)
    }
    basic.clearScreen()
}
function ChangeOtherY (num: number) {
    if (num != 0) {
        OtherPrevY = OtherY
    }
    OtherY += num
    if (OtherY < 0) {
        OtherX = 0
    }
    if (OtherY > 4) {
        OtherY = 4
    }
}
function ChangeMyX (num: number) {
    MyX += num
    if (MyX < 0) {
        MyX = 0
    }
    if (MyX > 4) {
        MyX = 4
    }
}
function ChangeOtherX (num: number) {
    OtherX += num
    if (OtherX < 0) {
        OtherX = 0
    }
    if (OtherX > 4) {
        OtherX = 4
    }
    if (num != 0) {
        OtherPrevX = OtherX
    }
}
function PlotMe () {
    if (MyPrevX == OtherX && MyPrevY == OtherY) {
        led.plotBrightness(MyPrevX, MyPrevY, 1)
    } else {
        led.unplot(MyPrevX, MyPrevY)
    }
    led.plotBrightness(MyX, MyY, 255)
}
function doColitionDetect (IsMe: boolean) {
    LasActive = true
    if (MyX == OtherX && MyY == OtherY) {
        if (IsMe) {
            basic.showIcon(IconNames.Heart)
        } else {
            basic.showIcon(IconNames.Sad)
        }
        basic.pause(1000)
        ResetGame()
        basic.pause(200)
        basic.clearScreen()
        PlotYou()
        PlotMe()
    }
}
input.onButtonPressed(Button.AB, function () {
    ResetGame()
})
function PlotYou () {
    if (OtherPrevX == MyX && OtherPrevY == MyY) {
    	
    } else {
        led.unplot(OtherPrevX, OtherPrevY)
    }
    led.plotBrightness(OtherX, OtherY, 1)
}
function SaveMyPrevPos () {
    MyPrevX = MyX
    MyPrevY = MyY
}
radio.onReceivedValue(function (name, value) {
    if (name == "X") {
        SaveYourPrevPos()
        OtherX = value
    }
    if (name == "Y") {
        SaveYourPrevPos()
        OtherY = value
    }
    if (name == "OtherX") {
        SaveMyPrevPos()
        index = 0
        MyX = value
    }
    if (name == "OtherY") {
        SaveMyPrevPos()
        MyY = value
    }
    LasActive = false
})
function SaveYourPrevPos () {
    OtherPrevX = OtherX
    OtherPrevY = OtherY
}
function ChangeMyY (num: number) {
    if (num != 0) {
        OtherPrevY = OtherY
    }
    MyY += num
    if (MyY < 0) {
        MyY = 0
    }
    if (MyY > 4) {
        MyY = 4
    }
}
let AksY = 0
let AksX = 0
let index = 0
let LasActive = false
let OtherPrevY = 0
let OtherPrevX = 0
let MyPrevY = 0
let MyPrevX = 0
let OtherY = 0
let OtherX = 0
let MyY = 0
let MyX = 0
basic.clearScreen()
loops.everyInterval(1000, function () {
    if (Math.randomBoolean()) {
        ChangeOtherX(randint(-1, 1) - 0)
    } else {
        ChangeOtherY(randint(-1, 1) - 0)
    }
})
loops.everyInterval(50, function () {
    PlotYou()
    PlotMe()
    doColitionDetect(LasActive)
})
basic.forever(function () {
    AksX = input.acceleration(Dimension.X)
    AksY = input.acceleration(Dimension.Y)
    if (Math.abs(AksX) > 500) {
        SaveMyPrevPos()
        if (AksX > 100) {
            ChangeMyX(1)
        }
        if (AksX < -100) {
            ChangeMyX(-1)
        }
    }
    if (Math.abs(AksY) > 500) {
        SaveMyPrevPos()
        if (AksY > 100) {
            ChangeMyY(1)
        }
        if (AksY < -100) {
            ChangeMyY(-1)
        }
    }
    basic.pause(300)
})
