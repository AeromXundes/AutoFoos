import math
import copy
import numpy as np
import os
import sys

"""
Current standings indexes
0 - name
1 - points
2 - Offense
3 - Defense
4 - rank
5 - o rank
6 - d rank
7,8,9,10,11, 12 - previous day rank and scores
Today, Yesterday, 2, 3, 4, 5

"""

def update(winO, winD, losO, losD, score):
    K = 12
    os.system("cp currentStandings.csv currentStandingsBackup.csv")

#=========READ THE CURRENT STANDINGS DATA===============
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


#=========PREP THE NEW GAME FOR UPDATING===========


    gameArr = [winO, winD, losO, losD, score]
    lossScore = int(score)

    #Game standings is the player scores before the current game
    #each entry is [name, score, index on CurrS, O/D rating]
    gameStandings = [[],[],[],[]]

    #scoresNp is a numpy array of the all of the current scores. This is used to calculate the percentiles later
    scoresNp = np.zeros(len(currS))
    j = 0

    while j < len(currS):
        playerArr = currS[j]

        if playerArr[0] == gameArr[0]:
            gameStandings[0] = [playerArr[0].rstrip(), float(playerArr[1]), j, float(playerArr[2]), float(playerArr[3])]
        elif playerArr[0] == gameArr[1]:
            gameStandings[1] = [playerArr[0].rstrip(), float(playerArr[1]), j, float(playerArr[2]), float(playerArr[3])]
        elif playerArr[0] == gameArr[2]:
            #print("In if block 2")
            gameStandings[2] = [playerArr[0].rstrip(), float(playerArr[1]), j, float(playerArr[2]), float(playerArr[3])]
        elif playerArr[0] == gameArr[3]:
            #print("In if block 2")
            gameStandings[3] = [playerArr[0].rstrip(), float(playerArr[1]), j, float(playerArr[2]), float(playerArr[3])]
        scoresNp[j] = float(playerArr[1])
        j = j + 1
    
    if (len(scoresNp) > 0):
        startScore = np.percentile(scoresNp, 25)
        thirdP = np.percentile(scoresNp, 33.3)
    else:
        startScore = 1500
        thirdP = 1500
    k = 0
    while k < 4:
        if gameStandings[k] == []:
            gameStandings[k] = [gameArr[k], startScore, j, startScore, startScore]
            currS.append(["NA", -1, -1, -1, -1, -1, -1, "NA", "NA", "NA", "NA", "NA", "NA"])
            j = j + 1
        k = k + 1
    #j is now the number of teams

#============================ Adjust Scores ============================
    #Now we have gameStandings array, has each player that participated
    #their ranking, and the index they are on
    #https://metinmediamath.wordpress.com/2013/11/27/how-to-calculate-the-elo-rating-including-example/

    #print("GAME STANDINGS")
    #print (gameStandings)

    winAvg = (gameStandings[0][1] + gameStandings[1][1])/2.0
    losAvg = (gameStandings[2][1] + gameStandings[3][1])/2.0

    if (gameStandings[0][0] == "Peter"):
        winAvg = gameStandings[1][1]
    elif (gameStandings[1][0] == "Peter"):
        winAvg = gameStandings[0][1]
    elif (gameStandings[2][0] == "Peter"):
        losAvg = gameStandings[3][1]
    elif (gameStandings[3][0] == "Peter"):
        losAvg = gameStandings[2][1]

    Rw = 10**(winAvg/400.0)
    Rl = 10**(losAvg/400.0)

    Ew = Rw/(Rw + Rl)
    El = Rl/(Rw + Rl)

    Sw = 1
    Sl = 1 - Sw

    marg = 8 - lossScore

    WinChange = K*(Sw - Ew)*np.log(marg+ 2.5)
    TotLos = K*(Sl -El)*np.log(marg+ 2.5)
    LosChange = .8*TotLos
    DisLos = .4 *TotLos

    """
    print(str(gameStandings[0][0]) + " and " + str(gameStandings[1][0]) + " beat " + str(gameStandings[2][0]) + " and " + str(gameStandings[3][0]) + " by "
        + str(8 - lossScore) + " points.")

    print("Winners avg: " +  str(winAvg))
    print("Losers avg: " + str(losAvg))

    print("Winners Change " + str(WinChange))
    print("Losers Change" + str(LosChange))
    """
    #Adjust the main points
    newGameStandings = copy.deepcopy(gameStandings)
    newGameStandings[0][1] = newGameStandings[0][1] + WinChange
    newGameStandings[1][1] = newGameStandings[1][1] + WinChange
    newGameStandings[2][1] = newGameStandings[2][1] + LosChange
    newGameStandings[3][1] = newGameStandings[3][1] + LosChange
    #Adjust O/D points
    newGameStandings[0][3] = newGameStandings[0][3] + WinChange
    newGameStandings[2][3] = newGameStandings[2][3] + LosChange

    newGameStandings[1][4] = newGameStandings[1][4] + WinChange
    newGameStandings[3][4] = newGameStandings[3][4] + LosChange

    #print("NEW GAME STANDINGS")
    #print(newGameStandings)
#============= DECAY ======================
    if j > 4:
        evenLoss = DisLos/(2*j/3.0)/2.0
    else:
        evenLoss = 0
    i = 0
    sumOverThirdP = 0
    while (i < j):
        if i == newGameStandings[0][2]:
            tp = newGameStandings[0]
            k  = newGameStandings[0][2]
            currS[k][0] = tp[0]
            currS[k][1] = tp[1]
            currS[k][2] = tp[3]
            currS[k][3] = tp[4]
            #print(tp[0] + " has an offense of " + str(tp[3]))
            #print(currS[k])
        elif i== newGameStandings[1][2]:
            tp = newGameStandings[1]
            k  = newGameStandings[1][2]
            currS[k][0] = tp[0]
            currS[k][1] = tp[1]
            currS[k][2] = tp[3]
            currS[k][3] = tp[4]
        elif i== newGameStandings[2][2]:
            tp = newGameStandings[2]
            k  = newGameStandings[2][2]
            currS[k][0] = tp[0]
            currS[k][1] = tp[1]
            currS[k][2] = tp[3]
            currS[k][3] = tp[4]
        elif i== newGameStandings[3][2]:
            tp = newGameStandings[3]
            k  = newGameStandings[3][2]
            currS[k][0] = tp[0]
            currS[k][1] = tp[1]
            currS[k][2] = tp[3]
            currS[k][3] = tp[4]

        else:
            if currS[i][1] > thirdP:
                currS[i][1] = currS[i][1] + evenLoss

                #case where O and D are both above thridP
                if currS[i][2] > thirdP and currS[i][3] > thirdP:
                    currS[i][2] = currS[i][2] + 2*evenLoss*(currS[i][2] - thirdP)/(currS[i][2]+ currS[i][3] - 2*thirdP)
                    currS[i][3] = currS[i][3] + 2*evenLoss*(currS[i][3] - thirdP)/(currS[i][2]+ currS[i][3] - 2*thirdP)
                elif currS[i][2] > thirdP:
                    currS[i][2] = currS[i][2] + 2*evenLoss
                elif currS[i][3] > thirdP:
                    currS[i][3] = currS[i][3] + 2*evenLoss
                else:
                    currS[i][2] = currS[i][2] + evenLoss
                    currS[i][3] = currS[i][3] + evenLoss
                #print(sumOverThirdP)
                sumOverThirdP = sumOverThirdP + (currS[i][1] - thirdP)
                #print(sumOverThirdP)
                #print(currS[i][0] + " lost " + str(evenLoss) + " points.")
        i = i + 1
    i = 0
    #print(sumOverThirdP)
    #Do the scaled decay
    while (i < j):
        if (i != newGameStandings[0][2] and i != newGameStandings[1][2] and i != newGameStandings[2][2] and i != newGameStandings[3][2]
            and currS[i][1] > thirdP):
            #print((currS[i][1] - thirdP)/sumOverThirdP)
            currS[i][1] = currS[i][1] + DisLos*((currS[i][1] - thirdP)/sumOverThirdP)/2.0
            
            #print(currS[i][0] + " lost " + str(DisLos*((currS[i][1] - thirdP)/sumOverThirdP)/2.0) + " points.")
        i = i + 1
        
        
        
     #============Post Day Actions ===============
    #print("entering Post Day actions")

    currS = normalize(currS)

    currS = findRanks(currS)

    #currS = adjustDailys(currS)

    #   printTopTen(currS)

    #printNonTopTen(currS)

    
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

def normalize(currS):
    i = 0
    totalPoints = 0
    while i < len(currS):
        totalPoints = totalPoints + currS[i][1]
        i = i + 1
    avgPoints = totalPoints/float(len(currS))
    pointDiff = avgPoints - 1500

    i = 0
    while i < len(currS):
        currS[i][1] = currS[i][1] - pointDiff
        currS[i][2] = currS[i][2] - pointDiff/2.0
        currS[i][3] = currS[i][3] - pointDiff/2.0
        i = i + 1

    return currS

def findRanks(currS):
    #Delete Peter
    i = 0 
    while i < len(currS):
        if currS[i][0] == "Peter":
            del (currS[i])
            i = len(currS)
        i = i + 1
    
    #Overall
    currS.sort(key=lambda x: x[1], reverse=True)

    i = 0
    while i < len(currS):
        currS[i][4] = i + 1
        i = i + 1

    #Offense
    currS.sort(key=lambda x: x[2], reverse=True)

    i = 0
    while i < len(currS):
        currS[i][5] = i + 1
        i = i + 1

    #Defense
    currS.sort(key=lambda x: x[3], reverse=True)

    i = 0
    while i < len(currS):
        currS[i][6] = i + 1
        i = i + 1

    currS.sort(key=lambda x: x[1], reverse=True)

    return currS

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
if __name__ == '__main__':

    d = open("hello2",  "w")
    d.write("in elo")
    d.close()

    update(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5])
    

        

        
        

        

        

        
