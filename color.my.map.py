from flask import Flask, render_template, request
import datastorage
import datetime
import json

app = Flask(__name__)


@app.route('/add-area', methods=['POST'])
def add_area():
    area = dict(n=request.form['n'], w=request.form['w'], e=request.form['e'], s=request.form['s'],
                color=request.form['color'], date=unicode(datetime.datetime.now()))
    datastorage.add_area(area)
    return json.dumps(True)


@app.route('/remove-area', methods=['POST'])
def remove_area():
    area = dict(n=request.form['n'], w=request.form['w'], e=request.form['e'], s=request.form['s'])
    datastorage.remove_area(area)
    return json.dumps(True)


@app.route('/add-window')
def add_window():
    return render_template("add-window.html")


@app.route('/')
def main_window():
    return render_template("main-window.html")


@app.route('/areas.js')
def main_window_areas():
    return render_template("areas.js.html", areas=datastorage.get_areas())


@app.route('/simple-map')
def simple_map():
    return render_template("simple-map.html")

if __name__ == '__main__':
    app.run(debug=True)
