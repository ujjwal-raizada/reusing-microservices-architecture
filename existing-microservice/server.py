import json
import pickle

from flask import Flask, request

app = Flask(__name__)

users = {
    "UjjwalRaizada": "Ujjwal123",
    "PrakharGoenka": "Prakhar123"
}

posts = []

@app.route('/')
def index():
    return "Welcome to home page of test API. Sent POST requests to /api"


@app.route('/api', methods=['GET', 'POST'])
def api():

    if request.method == 'POST':

        req_data = request.get_json()
        print(req_data)

        username = req_data['username']
        password = req_data['password']
        post_subject = req_data['subject']
        post_text = req_data['text']

        if ((username in users) and users[username] == password):
            print("user check passed...")
            posts.append((username, post_subject, post_text))

            with open("user_data", "wb+") as file:
                pickle.dump(posts, file)

            return json.dumps({"status": "success"})
        else:
            print("user check failed...")
            return json.dumps({"status": "failed"})

    else:  # GET request
        output = "<h3>List of posts:</h3> <br>"
        for post in posts:
            output += "<h3> {} </h3> - {} <br><br> {} <br><br>".format(post[1], post[0], post[2])
        
        return output




if __name__ == '__main__':
    with open("user_data", "rb+") as file:
        posts = pickle.load(file)

    app.run(debug=True, port=5000)
