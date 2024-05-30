import http.client

url = "cheatskill.onrender.com"
query = "?query=" + "addtwodigitscodeonly"

conn = http.client.HTTPSConnection(url)
conn.request("GET", "/generate" + query)
print(conn.getresponse().read().decode())