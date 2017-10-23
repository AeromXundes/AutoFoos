import json
import os
import sys

def getArguments(jsonData):
	goldStart = [jsonData["startingPositions"]["gold"]["offense"], jsonData["startingPositions"]["gold"]["defense"]]
	blackStart = [jsonData["startingPositions"]["black"]["offense"], jsonData["startingPositions"]["black"]["defense"]]

	blackScore = 0
	goldScore = 0

	#point in OrigPosition, points in Switched Position
	pointArrayBlack = [0,0]
	pointArrayGold = [0,0]

	blackOrig = True
	goldOrig = True

	for event in jsonData["events"]:
		if event["event"] == "b+":
			blackScore+= 1
			if blackOrig:
				pointArrayBlack[0] += 1
			else:
				pointArrayBlack[1]+= 1
			if goldOrig:
				pointArrayGold[0]+= 1
			else:
				pointArrayGold[1]+= 1
		if event["event"] == "b-":
			blackScore-=1
			if blackOrig:
				pointArrayBlack[0]-=1
			else:
				pointArrayBlack[1]-=1
			if goldOrig:
				pointArrayGold[0]-=1
			else:
				pointArrayGold[1]-=1
		if event["event"] == "g+":
			goldScore+= 1
			if blackOrig:
				pointArrayBlack[0]+= 1
			else:
				pointArrayBlack[1]+= 1
			if goldOrig:
				pointArrayGold[0]+= 1
			else:
				pointArrayGold[1]+= 1
		if event["event"] == "g-":
			goldScore-=1
			if blackOrig:
				pointArrayBlack[0]-=1
			else:
				pointArrayBlack[1]-=1
			if goldOrig:
				pointArrayGold[0]-=1
			else:
				pointArrayGold[1]-=1
		if event["event"] == "bs":
			blackOrig = not blackOrig
		if event["event"] == "gs":
			goldOrig = not goldOrig


	if pointArrayBlack[1] > pointArrayBlack[0]:
		blackEnd = [blackStart[1], blackStart[0]]
	else:
		blackEnd = blackStart

	if pointArrayGold[1] > pointArrayGold[0]:
		goldEnd = [goldStart[1] , goldStart[0]]
	else:
		goldEnd = goldStart

	if blackScore > goldScore:
		finalArr = [blackEnd[0], blackEnd[1], goldEnd[0], goldEnd[1], str(goldScore)]
	else:
		finalArr = [goldEnd[0], goldEnd[1], blackEnd[0], blackEnd[1], str(blackScore)]

	print (finalArr)
	return finalArr




if __name__ == '__main__':
	jsonString = json.dumps({"startingPositions":{"gold":{"offense":"Jason", "defense": "Dan"},"black":{"offense":"Alex", "defense": "Reynolds"}},"events":[{"event": "start", "time": 100},{"event": "g+", "time": 101},{"event": "g+", "time": 102},{"event": "b+", "time": 103},{"event": "bs", "time": 104},{"event": "b+", "time": 105},{"event": "g+","time": 106},{"event": "g+", "time": 107},{"event": "g-", "time": 108},{"event": "g+", "time": 109},{"event": "g+", "time": 110},{"event": "g+", "time": 111},{"event": "g+", "time": 112},{"event": "g+", "time": 113},{"event": "end", "time": 114}]})
	#print jsonString
	jsonString = sys.argv[1]
	jsonData = json.loads(jsonString)

	#find the arguments for the algorithm
	args = getArguments(jsonData)

	#log the Jsons for later use if needed
	f = open("jsonLog.csv", "a")
	f.write(jsonString + "\n")
	f.close()

	#updates the rankings and currentStanings.csv
	os.system("python RasberryElo.py " + " ".join(args))

	#append game log (just winners and losers)
	f = open("gameLog.csv", "a")
	f.write(",".join(args) + "\n")
	f.close()

	#converts currentStandings.csv to a index.html
	os.system("python standingsToHtml.py")
    exit(0)

