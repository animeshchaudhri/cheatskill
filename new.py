import json
import http.client

def post_request():
    url = "cheatskill.onrender.com"
    endpoint = "/generate"
    body = {"query": "make a fizz buzz code in python return only code no talks"}
    json_body = json.dumps(body)

    conn = http.client.HTTPSConnection(url)
    conn.request("POST", endpoint, body=json_body, headers={"Content-Type": "application/json"})
    response = conn.getresponse()

    print("Status:", response.status)
    print("Response:", response.read().decode())
    conn.close()

if __name__ == "__main__":
    post_request()
