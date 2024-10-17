serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    开关命令 = serial.readLine().charAt(0)
    basic.showString(开关命令)
    if (水泵开关 != 开关命令) {
        水泵开关 = 开关命令
    }
    if (水泵开关 != "C") {
        music.play(music.createSoundExpression(WaveShape.Sine, 5000, 0, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        basic.pause(1000)
    } else {
        music.stopAllSounds()
    }
})
let 开关命令 = ""
let 水泵开关 = ""
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate115200)
basic.showLeds(`
    . # . . #
    # . # . #
    # # # . #
    # . # . #
    # . # . #
    `)
basic.pause(200)
basic.clearScreen()
basic.showLeds(`
    . # . . #
    # . # . #
    # # # . #
    # . # . #
    # . # . #
    `)
水泵开关 = "C"
basic.forever(function () {
    serial.writeLine("#LX:" + convertToText(ModuleWorld_Analog.Light(ModuleWorld_Analog.mwAnalogNum.AP0P1)) + "@")
    TM1650.showSring("LU..")
    basic.pause(500)
    TM1650.showNumber(ModuleWorld_Analog.Light(ModuleWorld_Analog.mwAnalogNum.AP0P1))
    basic.pause(1000)
    serial.writeLine("#TP:" + convertToText(ModuleWorld_Digital.dht11value(ModuleWorld_Digital.DHT11Type.DHT11_temperature_C, ModuleWorld_Digital.mwDigitalNum.P14P15)) + "@")
    TM1650.showSring("TP..")
    basic.pause(500)
    TM1650.showNumber(ModuleWorld_Digital.dht11value(ModuleWorld_Digital.DHT11Type.DHT11_temperature_C, ModuleWorld_Digital.mwDigitalNum.P14P15))
    basic.pause(100)
    TM1650.showSring("RH..")
    basic.pause(500)
    TM1650.showNumber(ModuleWorld_Digital.dht11value(ModuleWorld_Digital.DHT11Type.DHT11_humidity, ModuleWorld_Digital.mwDigitalNum.P14P15))
    basic.pause(100)
    serial.writeLine("#RH:" + convertToText(ModuleWorld_Digital.dht11value(ModuleWorld_Digital.DHT11Type.DHT11_humidity, ModuleWorld_Digital.mwDigitalNum.P14P15)) + "@")
    basic.pause(1000)
    TM1650.showSring("AS..")
    basic.pause(500)
    TM1650.showNumber(pins.analogReadPin(AnalogReadWritePin.P10))
    serial.writeLine("#AS:" + convertToText(pins.analogReadPin(AnalogReadWritePin.P10)) + "@")
    basic.pause(1000)
    TM1650.showSring("DS..")
    basic.pause(500)
    TM1650.showNumber(pins.digitalReadPin(DigitalPin.P11))
    serial.writeLine("#DS:" + convertToText(pins.digitalReadPin(DigitalPin.P11)) + "@")
    basic.pause(1000)
})
