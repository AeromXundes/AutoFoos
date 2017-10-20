def adjustDailys(currS):
    i = 0
    while i < len(currS):

        currS[i][12] = currS[i][11]
        
        currS[i][11] = currS[i][10]
        
        currS[i][10] = currS[i][9]
        
        currS[i][9] = currS[i][8]
        
        currS[i][8] = currS[i][7]

        if currS[i][4] < 13:
            rank = currS[i][4]
        else:
            rank = "NR"

        currS[i][7] = str(rank) + " | " + str(round(currS[i][1],1))
        i = i + 1

    return currS

g = open("currentStandings.csv", "r")
currS = g.readlines()
i = 0
while i < len(currS):
    #print(i)
    currS[i] = currS[i].split(",")
    #currS[i].pop()
    #get rid off the currS new lines
    #print(len(currS[i]))
    #print(currS[i])
    if currS[i][0] == "":
        del currS[i]
    else:
        if currS[i][12][-2:] == "\r\n":
            currS[i][12] = currS[i][12][:-2]
        elif currS[i][12][-2:] == "\n":
            currS[i][12] = currS[i][12][:-1]

        #Cast appropriate values to floats and ints
        currS[i][1] = float(currS[i][1])
        currS[i][2] = float(currS[i][2])
        currS[i][3] = float(currS[i][3])
        currS[i][4] = int(currS[i][4])
        currS[i][5] = int(currS[i][5])
        currS[i][6] = int(currS[i][6])

        i = i + 1
g.close()
currS = adjustDailys(currS)

g = open("currentStandings.csv", "w")
for player in currS:
    newString = ""
    for entry in player:
        newString = newString + str(entry) + ","
    g.write(newString[:-1] + "\n")
g.close()


g = open("currentStandings.csv", "r")
rows = g.read()
rows = rows.replace("\n\n", "\n")
g.close()
g = open("currentStandings.csv", "w")
g.write(rows)
g.close()

