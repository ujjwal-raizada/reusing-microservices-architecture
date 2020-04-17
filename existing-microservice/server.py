import json
import pickle

from flask import Flask, request

app = Flask(__name__)

users = {
    "UjjwalRaizada": "Ujjwal123",
    "PrakharGoenka": "Prakhar123"
}

posts = []
persistant_status = False


def persistant(function):
    def wrapper():
        global posts
        global persistant_status
        if (not persistant_status):
            with open("user_data", "rb+") as file:
                posts = pickle.load(file)
            persistant_status = True

        return_val = function()
        with open("user_data", "wb+") as file:
                pickle.dump(posts, file)
        return return_val
    return wrapper

        

@app.route('/', endpoint='index')
def index():
    text = """
Welcome to home page of test API. Sent POST requests to /api

endpoint accepts -
GET - displays the posts. goto <a href="/api">GET /api</a> to check.
POST - Send POST requests to create posts in JSON format.

    * four parameters required in POST request.
        1. username
        2. password
        3. subject
        4. text

    * example users
        1. UjjwalRaizada Ujjwal123
        2. PrakharGoenka Prakhar123

    """
    return text.replace('\n', '<br>').replace("    ", "&emsp;")


@app.route('/api', methods=['GET', 'POST'], endpoint='api')
@persistant
def api():

    if request.method == 'POST':

        req_data = request.get_json()

        username = req_data['username']
        password = req_data['password']
        post_subject = req_data['subject']
        post_text = req_data['text']

        if ((username in users) and users[username] == password):
            print("user check passed...")
            posts.append((username, post_subject, post_text))

            return json.dumps({"status": "success"})
        else:
            print("user check failed...")
            return json.dumps({"status": "failed"})

    else:  # GET request
        output = "<h3>List of posts:</h3> <br>"
        for post in posts:
            output += "<h3> {} </h3> - {} <br><br> {} <br><br>".format(post[1], post[0], post[2])
        
        return output


@app.route('/api/bulk', methods=['POST'], endpoint='bulk-api')
@persistant
def bulk_api():
    req_data = request.get_json()

    for data in req_data:
        username = data['username']
        password = data['password']
        post_subject = data['subject']
        post_text = data['text']

        if ((username in users) and users[username] == password):
            print("user check passed...")
            posts.append((username, post_subject, post_text))
        else:
            print("user check failed...")
            return json.dumps({"status": "failed"})
    return json.dumps({"status": "success"})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
