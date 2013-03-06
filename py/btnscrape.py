import json
import urllib2
from BeautifulSoup import BeautifulSoup

soup = BeautifulSoup(urllib2.urlopen('http://www.behindthenet.ca/nhl_statistics.php?c=0+1+3+5+4+6+7+8+13+14+29+30+32+33+34+45+46+63+67&ds=30&f5=#snip=f').read())

headersScrape = soup.find("tr", { "class" : "col-title-row" }).findAll("td")
cols = 0
headers = [];
for col in headersScrape:
	headers.append(col['class']);
	cols += 1
 
playersScrape = soup.find("tbody", {"class" : "players"}).findAll("tr")
counter = 0
players = []
for playerScrape in playersScrape:
	tds = playerScrape.findAll("td")
	player = {}
	for td in tds:
		#print td.contents[0], " ", counter
		player[headers[counter]] = td.contents[0]
		counter += 1
		if (counter == 20):
			players.append(player)
			counter = 0
			
for playerPrint in players:
  print playerPrint	