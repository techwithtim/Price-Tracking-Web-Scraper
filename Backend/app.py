from flask import Flask, jsonify, request
import sqlite3
import subprocess
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

class ProductResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    url = db.Column(db.String(255))
    price = db.Column(db.Float)
    created_at = db.Column(db.DateTime)
    search_text = db.Column(db.String(255))

    def __init__(self, name, url, price, created_at, search_text):
        self.name = name
        self.url = url
        self.price = price
        self.created_at = created_at
        self.search_text = search_text


db.init_app(app)


def create_model():
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS product_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            img TEXT,
            name TEXT,
            price REAL,
            url TEXT,
            search_text TEXT,
            source TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        )
    ''')
    conn.commit()


@app.route('/results', methods=['POST'])
def submit_results():
    results = request.json.get('data')
    search_text = request.json.get("search_text")
    source = request.json.get("source")

    for result in results:
        cursor.execute('INSERT INTO product_results (img, name, price, url, search_text, source) VALUES (?, ?, ?, ?, ?, ?)',
                       (result['img'], result['name'], result['price'], result['url'], search_text, source))

    conn.commit()
    response = {'message': 'Received data successfully'}
    return jsonify(response), 200


@app.route('/unique_search_texts', methods=['GET'])
def get_unique_search_texts():
    # Retrieve unique values from the 'search_text' column
    cursor.execute('SELECT DISTINCT search_text FROM product_results')
    unique_search_texts = [row[0] for row in cursor.fetchall()]

    # Return the unique search texts as a JSON response
    return jsonify(unique_search_texts)


@app.route('/results', methods=['GET'])
def get_product_results():
    search_text = request.args.get('search_text')

    query = '''
        SELECT pr.*
        FROM product_results pr
        INNER JOIN (
            SELECT url, MAX(created_at) AS max_created_at
            FROM product_results
            WHERE search_text = ?
            GROUP BY url
        ) AS grouped
        ON pr.url = grouped.url AND pr.created_at = grouped.max_created_at
    '''
    cursor.execute(query, (search_text,))
    results = cursor.fetchall()

    # Convert query results to a list of dictionaries
    product_results = []
    for row in results:
        _id, img, name, price, url, search_text, created_at = row
        product_results.append({
            'id': _id,
            'img': img,
            'name': name,
            'price': float(price),
            'url': url,
            'created_at': created_at
        })

    return jsonify(product_results)


@app.route('/all-results', methods=['GET'])
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
