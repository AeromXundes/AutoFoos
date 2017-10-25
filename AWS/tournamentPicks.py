import random

f = open("currentStandings.csv", "r")
i = 0

#put names in hat
hat = []
while i < 6:
	playerName = f.readline().split(",")[0]
	for k in range(6-i):
		hat.append(playerName)
	i += 1

print(hat)

#draw names from hat
while len(hat) > 0:
	randInt = random.randint(0, len(hat) - 1)
	nextPlayer = hat[randInt]
	print(nextPlayer)
	i = 0
	while i < len(hat):
		if hat[i] == nextPlayer:
			del hat[i]
			i = i -1
		i = i + 1
	print hat