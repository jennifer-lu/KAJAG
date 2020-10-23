from .home import transpiler
from .healthcheck import healthchecker
from flask import Flask
app = Flask(__name__)

app.register_blueprint(transpiler, url_prefix="")
app.register_blueprint(healthchecker, url_prefix="/healthcheck")
app.run(host="0.0.0.0")
