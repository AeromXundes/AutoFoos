import os

f = open("gameLog.csv", "r")
lines = f.readlines()
i = 1
for lineStr in lines:
	line = lineStr.split(",")
	os.system("python RasberryElo.py " + line[0] + " " + line[1] + " " + line[2] + " " + line[3] + " " + line[4])
	i = i + 1
	if i % 20 == 0:
		os.system("python adjustDailys.py")

