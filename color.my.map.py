from flask import Flask, render_template

app = Flask(__name__)


@app.route('/add-area')
def add_area():
    return ''


@app.route('/add-window')
def add_window():
    return render_template("add-window.html")


@app.route('/')
def main_window():
    return render_template("main-window.html")


@app.route('/areas.js')
def main_window_areas():
    return render_template("areas.js.html", areas=[])


@app.route('/simple-map')
def main_window_areas():
    return render_template("simple-map.html")

if __name__ == '__main__':
    app.run(debug=True)
