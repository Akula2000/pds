from flask import Flask, jsonify, request
import pymysql


# register, login
# list, add, remove service locations and smart devices.

prefix_device_db={
    "Refrigerator":['RE2345', 'RE5678'],
    "Smart TV":['SM7890', 'SM1234', 'SM5678'],
    "Washing Machine":['WA3456', 'WA7890'],
    "Microwave Oven":['MI4567', 'MI8901', 'MI2345'],
    "Lights":['MI4567', 'MI8901', 'MI2345'],
}

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '2288'
app.config['MYSQL_DB'] = 'varsha'

# Initialize MySQL
mysql = pymysql.connect(
    host=app.config['MYSQL_HOST'],
    user=app.config['MYSQL_USER'],
    password=app.config['MYSQL_PASSWORD'],
    db=app.config['MYSQL_DB'],
    cursorclass=pymysql.cursors.DictCursor
)

# Registration endpoint
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    try:
        with mysql.cursor() as cur:
            cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
        mysql.commit()
        return jsonify({'message': 'Registration successful'}), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 500


# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    try:
        with mysql.cursor() as cur:
            cur.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
            user = cur.fetchone()

        if user:
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'message': 'Invalid credentials'}), 401
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@app.route('/device_list', methods=['GET'])
def devicelist():
    return jsonify(prefix_device_db)


@app.route('/dashboard_view', methods=['GET'])
def dashboard_views():
    try:
        with mysql.cursor() as cur:
            # cur.execute("SELECT * FROM AverageConsumptionComparison")
            # AverageConsumptionComparison = cur.fetchall()

            cur.execute("SELECT * FROM DailyEnergyConsumption")
            DailyEnergyConsumption = cur.fetchall()
            
            cur.execute("SELECT * FROM EnergyConsumptionPerDevice")
            EnergyConsumptionPerDevice = cur.fetchall()

            cur.execute("SELECT * FROM EnergyConsumptionWithPricing")
            EnergyConsumptionWithPricing = cur.fetchall()

            cur.execute("SELECT * FROM MonthlyEnergySummary")
            MonthlyEnergySummary = cur.fetchall()


        return jsonify({
                        "DailyEnergyConsumption":DailyEnergyConsumption,
                        "EnergyConsumptionPerDevice":EnergyConsumptionPerDevice,
                        "EnergyConsumptionWithPricing":EnergyConsumptionWithPricing,
                        "MonthlyEnergySummary":MonthlyEnergySummary})
    except Exception as e:
        return jsonify({'message': str(e)})


if __name__ == "__main__":
    app.run(host="localhost", debug=True, port=8080)