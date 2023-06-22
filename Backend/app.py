from flask import Flask, jsonify, request
import subprocess

app = Flask(__name__)


@app.route('/results', methods=['POST'])
def submit_results():
    data = request.json.get('data')
    print(data)
    response = {'message': 'Received data successfully'}
    return jsonify(response), 200


@app.route('/start-scraper', methods=['POST'])
def start_scraper():
    url = request.json.get('url')
    search_text = request.json.get('search_text')

    # Run scraper asynchronously in a separate Python process
    command = f"python ./scraper/__init__.py {url} \"{search_text}\" /results"
    subprocess.Popen(command, shell=True)

    response = {'message': 'Scraper started successfully'}
    return jsonify(response), 200


if __name__ == '__main__':
    app.run(debug=True)
