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

def printTopTen(currS):
    print("Rank\tName\tOverall\t\tOffense\t\tDefense\t\t1 Day Prior\t1 Week Prior")
    #I is number of players printed
    i = 0
    #j is index
    j = 0
    while i < 12 and j < len(currS):
        if currS[j][0] != "Peter":
            print(str(i + 1) + "\t" + str(currS[j][0]) + "\t" + str(round(currS[j][1], 1)) + "\t\t"
               + str(currS[j][5]) + " | " + str(round(currS[j][2],1)) + "\t" + str(currS[j][6]) + " | " + str(round(currS[j][3],1))  + "\t" +str(currS[j][8]) + "\t" +  str(currS[j][12]))
            i = i + 1
        j = j + 1

def printNonTopTen(currS):
    j = 12
    while j < len(currS):
        if currS[j][5] < 6:
            print(str(j + 1) + "\t" + str(currS[j][0]) + "\t" + str(round(currS[j][1], 1)) + "\t\t"
               + str(currS[j][5]) + " | " + str(round(currS[j][2],1)) + "\t" + str(currS[j][6]) + " | " + str(round(currS[j][3],1))  + "\t" +str(currS[j][8]) + "\t" +  str(currS[j][12]))
        if currS[j][6] < 6:
            print(str(j + 1) + "\t" + str(currS[j][0]) + "\t" + str(round(currS[j][1], 1)) + "\t\t"
               + str(currS[j][5]) + " | " + str(round(currS[j][2],1)) + "\t" + str(currS[j][6]) + " | " + str(round(currS[j][3],1))  + "\t" +str(currS[j][8]) + "\t" +  str(currS[j][12]))
        j = j + 1


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

printTopTen(currS)

printNonTopTen(currS)

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

