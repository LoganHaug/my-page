from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def main():
    return render_template("index.html")

@app.route("/sort_vis")
def sort_vis():
    return render_template("sort_vis.html")

@app.route("/js_snake")
def js_snake():
    return render_template("js_snake.html")