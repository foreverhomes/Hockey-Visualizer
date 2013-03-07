#!/usr/bin/python
import json
import urllib2
from bs4 import BeautifulSoup

soup = BeautifulSoup(urllib2.urlopen('http://www.behindthenet.ca/nhl_statistics.php?c=0+1+3+5+4+6+7+8+13+14+29+30+32+33+34+45+46+63+67&ds=30&f5=#snip=f').read())

headersScrape = soup.find("tr", { "class" : "col-title-row" }).findAll("td")
headers = []
for col in headersScrape:
	headers.append(col['class'][0]);
 
playersScrape = soup.find("tbody", {"class" : "players"}).findAll("tr")
counter = 0
players = []
for playerScrape in playersScrape:
	tds = playerScrape.findAll("td")
	player = {}
	for td in tds:
		player[headers[counter]] = str(td.contents[0]).replace("\"", "")
		counter += 1
		if (counter == 20):
			players.append(player)
			counter = 0
			
#for playerPrint in players:
#  print playerPrint	

json.dump(players, open("../json/5v5.json",'w'))