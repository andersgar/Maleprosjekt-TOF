radio.setGroup(210);
//dataStreamer.setBaudRate(9600);
basic.showString("Rec");// Rec, R, L, S


//Mottaker:
//Mottak av data og lagring som variabler på mottaker
let leftLaser = 0;
let leftMovement = 0;
let rightLaser = 0;
let rightMovement = 0;

let RLnum: number;
let RMnum: number;
let LMnum: number;
let LLnum: number;

radio.onReceivedValue(function (name, value) {
    if (name == "RM") {
        dataLog("RM");
        countLog("RMnum", RMnum);
        basic.showLeds(`
        . # . # .
        # . # . #
        # . . . #
        . . . . .
        . . . . #
        `)
    } else if (name == "Laser") {
        dataLog("Laser");
        countLog("RLnum", RLnum);
        basic.showLeds(`
        . . # . .
        . . # . .
        . . # # .
        . . . . .
        . . . . .
        `)
    } else if (name == "LM") {
        dataLog("LM");
        countLog("LMnum", LMnum);
        basic.showLeds(`
        . # . # .
        # . # . #
        # . . . #
        . . . . .
        # . . . .
        `)
    }
    basic.pause(50)
    basic.clearScreen();
})
//Bruker variabler fra .onReceivedValue funksjonen. Skriver disse i seriell port før den nulstiller.
//  Kan være et problem at den nullstiller med en gang, så bør kanskje ha et lite delay? Må forskes på. 
let recievedSensor: string;

function dataLog(recievedSensor: string) {
    serial.writeValue(recievedSensor, 1);
    //dataStreamer.writeString(recievedSensor);
    //dataStreamer.writeNumber(1);
    basic.pause(10);
    serial.writeValue(recievedSensor, 0);
    //dataStreamer.writeNumber(0);
    
}

function countLog(recievedSensor: string, countValue: number){
    let RLnum = 1;
    let RMnum = 1;
    let LMnum = 1;
    let LLnum = 1;
    countValue++;
    serial.writeValue(recievedSensor, countValue);
}


//Sender, bruker knapper som eksempel for sensorer. skal lagre avlest verdi som Reading-variabel
//  i stedet for tallet 1. Mulig vi velger å legge til kode her for å bestemme omd et faktisk skjer
//  en forbigåing, på denne måten trenger ikke mottaker å utføre alle kalkulasjoner. 
/*
let laserReading = 1;
let rightMovementReading = 1;
let leftMovementReading = 1;

basic.forever(function () {
    //Bevegelsessensor
    let m0value = minode.LightSensorGetLevel(AnalogConnName.Analog_A0);
    if (m0value == 1) {
        while(true){
            let m0value = minode.LightSensorGetLevel(AnalogConnName.Analog_A0);
            basic.pause(100);
            if (m0value == 5){
                break;
            }
        }
        radio.sendValue("LM", rightMovementReading);
        basic.showLeds(`
        . . # . .
        . # # # .
        # # # # #
        # # # # #
        . # # # .
        `);
    }
    /*
    if (minode.PIRIsTriggered(ConnName.A0)) {
        radio.sendValue("RM", rightMovementReading);
        basic.showLeds(`
        . . # . .
        . # # # .
        # # # # #
        # # # # #
        . # # # .
        `);
    }*/

    /*
    //Lasersensor:
    let p0value = pins.digitalReadPin(DigitalPin.P0);
    if (p0value == 0) {
        while(true){
            let p0value = pins.digitalReadPin(DigitalPin.P0);
            basic.pause(100);
            if (p0value == 1){
                break;
            }
        }
        radio.sendValue("Laser", laserReading);
        basic.showLeds(`
        # . . . #
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `);
    }
    basic.pause(10);
    basic.clearScreen();
})

//function onLightSensorEvent(connName: AnalogConnName, body: () => void): void;
//minode.onLightSensorEvent(AnalogConnName.Analog_A0, function () {
    
/*
//Lydsensor, 
basic.forever(function () {
    let soundValue = input.soundLevel();
    radio.sendValue("Sound", soundValue);
    basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `);
    basic.pause(1000);
    basic.clearScreen();
})
*/