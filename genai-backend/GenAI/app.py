from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from genai import GenAI as sentiment_analysis

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/genai")
@cross_origin()
def hello():
    response = request.args.get("sentence")
    output = sentiment_analysis(response)
    return output

if __name__ == "__main__":
   app.run(host="0.0.0.0", port=5000, debug=True)