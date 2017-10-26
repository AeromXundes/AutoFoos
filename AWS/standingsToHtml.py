import sys
import os
import csv
import string
import datetime
from pytz import timezone
import json

def genHtml(row, date):
    playerName = row[0]
    f = open("./players/"+playerName+".html", "w")
    f.write('<style type="text/css">td{padding:0 15px 0 15px;}</style>')
    f.write('<h2> ' + playerName + ' (as of ' + str(date) + ')' )
    f.write("<table>")
    f.write('<tr style="font-weight:bold"><td>Rank</td><td>Name</td><td>Overall</td><td>Offense  </td><td>Defense  </td><td>1 Day Prior   </td><td>1 Week Prior  </td></tr>\n')
    table_string = "<tr><td>" + row[4] + "</td><td>" + playerName + "</td><td>" + str(round(float(row[1]), 1)) + "</td><td>" + \
            row[5] + " | " + str(round(float(row[2]), 1)) + '</td><td>' + row[6] + " | " + str(round(float(row[3]), 1)) + '</td><td bgcolor="' + yesColor + '">' +\
            row[8] + '</td><td bgcolor="' + weekColor + '">' + row[12] + "</td></tr>\n"

    f.write(table_string)
    f.write("</table><br><br>\n<table>")
    g = open("gameLog.csv", "r")
    gamesPlayed = 0
    gamesWon = 0
    longestWinningStreak = 0
    longestLosingStreak = 0
    lastGame = "N"
    currentStreak = 0
    for line in g:
        lineArr = line.split(",")
        #playerWon
        if lineArr[0] == playerName or lineArr[1] == playerName:
            gamesWon += 1
            gamesPlayed += 1
            if lastGame == "W":
                currentStreak += 1
            else:
                lastGame = "W"
                currentStreak = 1
            if longestWinningStreak < currentStreak:
                longestWinningStreak = currentStreak
        #playerLost
        if lineArr[2] == playerName or lineArr[3] == playerName:
            gamesPlayed += 1
            if lastGame == "L":
                currentStreak += 1
                if longestLosingStreak < currentStreak:
                    longestLosingStreak = currentStreak
            else:
                lastGame = "L"
                currentStreak = 1 
            if longestLosingStreak < currentStreak:
                longestLosingStreak = currentStreak
    g.close()
    WinningPerc = gamesWon/float(gamesPlayed)
    f.write('<tr style="font-weight:bold"><td>Winning Percentage</td><td>Games Played</td><td>Games Won</td>' + \
            '<td> Games Lost</td><td>Longest Winning Streak</td><td>Longest Losing Streak</td><td>Current Streak</td></tr>\n')

    f.write('<tr><td>' + str(round(WinningPerc*100,2)) + '</td><td>' + str(gamesPlayed) + '</td><td>' + str(gamesWon) + '</td><td>' + \
        str(gamesPlayed - gamesWon) + '</td><td>' + str(longestWinningStreak) + '</td><td>' + str(longestLosingStreak) + '</td><td>' + lastGame + str(currentStreak) + '</td></tr>')
    f.write('</table>')


    f.close()

    h = open("players/" + playerName + ".json" , "w")
    playerMap = {"Name": playerName, "overallRank": row[4], "overallPoints": row[1], "offenseRank": row[5], "offensePoints" : row[2],
                    "defenseRank": row[6], "defensePoints": row[3], "oneDayPrior": row[8], "oneWeekPrior": row[12], "Winning Percentage": WinningPerc,
                    "gamesPlayed" : gamesPlayed, "gamesWon": gamesWon, "gamesLost": gamesPlayed - gamesWon, "longestWinningStreak": longestWinningStreak,
                    "longestLosingStreak": longestLosingStreak}
    h.write(json.dumps(playerMap))
    h.close()

with open("currentStandings.csv", 'r') as csvfile:
    date = datetime.datetime.now(timezone('US/Eastern'))
    table_string = ""
    reader       = csv.reader( csvfile )
    
    f = open("index.html", "w")
    f.write('<style type="text/css">td{padding:0 15px 0 15px;}</style>')
    f.write('<h2> ASDC Foosball Top 12 (as of ' + str(date) + ')' )
    f.write("<table>")
    f.write('<tr style="font-weight:bold"><td>Rank</td><td>Name</td><td>Overall\t\t</td><td>Offense  </td><td>Defense  </td><td>1 Day Prior   </td><td>1 Week Prior  </td></tr>\n')
    for row in reader:
        if int(row[4]) <= 12:
            try:
                yesRank = int(row[8].split("|")[0])
            except:
                yesRank = 13
            try:
                weekRank = int(row[12].split("|")[0])
            except:
                weekRank = 13
            yesColor = "white"
            if int(row[4]) < yesRank:
                yesColor = "LightGreen"
            if int(row[4]) > yesRank:
                yesColor = "Pink"
            weekColor = "white"
            if int(row[4]) < weekRank:
                weekColor = "LightGreen"
            if int(row[4]) > weekRank:
                weekColor = "Pink"
            playerName = row[0]
            table_string+= "<tr><td>" + row[4] + "</td><td><a href=./players/"+ playerName + ".html>" + playerName + "</a></td><td>" + str(round(float(row[1]), 1)) + "</td><td>" + \
                    row[5] + " | " + str(round(float(row[2]), 1)) + '</td><td>' + row[6] + " | " + str(round(float(row[3]), 1)) + '</td><td bgcolor="' + yesColor + '">' +\
                    row[8] + '</td><td bgcolor="' + weekColor + '">' + row[12] + "</td></tr>\n"
        genHtml(row, date)

    
    f.write(table_string)
    f.write("</table>")
    f.close()
