from flask import Flask, request, jsonify
from astral import LocationInfo
from astral.sun import sun
from datetime import datetime

app = Flask(__name__)

@app.route('/daylight', methods=['POST'])
def calculate_daylight():
    data = request.get_json()
    latitude = data.get('latitude')
    longitude = data.get('longitude')

    if latitude is None or longitude is None:
        return jsonify({'error': 'Invalid input'}), 400

    location = LocationInfo(latitude=latitude, longitude=longitude)
    s = sun(location.observer, date=datetime.now())

    daylight_duration = s['sunset'] - s['sunrise']
    daylight_hours = daylight_duration.total_seconds() / 3600

    return jsonify({'daylight_hours': daylight_hours})

if __name__ == '__main__':
    app.run(debug=True)
