from flask import Flask, jsonify, request
import sqlite3
import subprocess

conn = sqlite3.connect('database.db', check_same_thread=False)
cursor = conn.cursor()

app = Flask(__name__)


def create_model():
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS product_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            img TEXT,
            name TEXT,
            price REAL,
            url TEXT,
            search_text TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()


@app.route('/results', methods=['POST'])
def submit_results():
    results = request.json.get('data')
    search_text = request.json.get("search_text")

    for result in results:
        cursor.execute('INSERT INTO product_results (img, name, price, url, search_text) VALUES (?, ?, ?, ?, ?)',
                       (result['img'], result['name'], result['price'], result['url'], search_text))

    conn.commit()
    response = {'message': 'Received data successfully'}
    return jsonify(response), 200


@app.route('/results', methods=['GET'])
def get_results():
    # Retrieve all the results from the table
    cursor.execute(
        'SELECT * FROM product_results')
    rows = cursor.fetchall()

    # Convert the results to a list of dictionaries
    results = []
    for row in rows:
        result = {
            "id": row[0],
            "image": row[1],
            "name": row[2],
            "price": float(row[3]),
            "url": row[4],
            "search_text": row[5],
            'created_at': row[6]
        }
        results.append(result)

    # Return the results as JSON
    return jsonify(results)


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
    create_model()
    app.run(debug=True)
