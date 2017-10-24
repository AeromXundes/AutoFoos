import RPi.GPIO as GPIO
import time
import signal
import sys

ledYelPin = 12
irRecvPin = 16
irRecv2Pin = 15
ledRedPin = 7

GPIO.setmode(GPIO.BOARD)
GPIO.setup(ledYelPin, GPIO.OUT)
GPIO.setup(irRecvPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(irRecv2Pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(ledRedPin, GPIO.OUT)

goldScore = 0
blackScore = 0
def incrementGoldScore():
	global goldScore
	goldScore += 1
	printGoldScore()

def printGoldScore():
	global goldScore
	print("Gold:  " + str(goldScore))

def incrementBlackScore():
	global blackScore
	blackScore += 1
	printBlackScore()

def printBlackScore():
	global blackScore
	print("Black: " + str(blackScore))

def mapIrToLed(channel):
	if channel == irRecvPin:
		return ledYelPin
	elif channel == irRecv2Pin:
		return ledRedPin
	else:
		return -1

def beamChange(channel):
	if GPIO.input(channel):
		#rising
		beamConnected(channel)
	else:
		#falling
		beamBroken(channel)

def beamConnected(channel):
	#print("Connected " + str(channel))
	led = mapIrToLed(channel)
	GPIO.output(led, GPIO.HIGH)

def beamBroken(channel):
	#print("Broke " + str(channel))
	led = mapIrToLed(channel)
	GPIO.output(led, GPIO.LOW)
	if channel == irRecv2Pin:
		incrementBlackScore()
	else:
		incrementGoldScore()

GPIO.add_event_detect(irRecvPin, GPIO.BOTH, callback=beamChange)
GPIO.add_event_detect(irRecv2Pin, GPIO.BOTH, callback=beamChange)

print("LED will light up when IR beam is connected. Press Ctrl+C to exit.")
printBlackScore()
printGoldScore()

def signal_handler(signal, frame):
	GPIO.cleanup()
	sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)

while True:
	time.sleep(1)
