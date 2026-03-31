from flask import Flask, request, send_from_directory, redirect
import smtplib
from email.message import EmailMessage
from datetime import datetime
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)

# ===============================
# 👉 SERVIR ARCHIVOS ESTÁTICOS
# ===============================

@app.route("/otrapagina/<path:filename>")
def otrapagina_static(filename):
    return send_from_directory(os.path.join(BASE_DIR, "otrapagina"), filename)

@app.route("/pages/<path:filename>")
def pages_static(filename):
    return send_from_directory(os.path.join(BASE_DIR, "pages"), filename)

# ===============================
# 👉 RUTAS HTML
# ===============================

@app.route("/")
def home():
    return send_from_directory("otrapagina", "index.html")

@app.route("/contacto")
def contacto():
    return send_from_directory("pages", "contacto.html")

@app.route("/servicios")
def servicios():
    return send_from_directory("pages", "servicios.html")

@app.route("/sobremi")
def sobremi():
    return send_from_directory("pages", "sobremi.html")

# ===============================
# 👉 ENVÍO DE FORMULARIO
# ===============================



@app.route("/enviar", methods=["POST"])
def enviar():
    try:
        nombre = request.form["nombre"]
        email_usuario = request.form["email"]
        empresa = request.form.get("empresa", "No especificada")
        mensaje = request.form["mensaje"]

        contenido = f"""
Nuevo mensaje desde el sitio web

Nombre: {nombre}
Email: {email_usuario}
Empresa: {empresa}

Mensaje:
{mensaje}
"""

        mail = Mail(
            from_email=os.environ["SENDGRID_FROM"],
            to_emails="miloalva20@gmail.com",
            subject="Nuevo contacto desde la web",
            plain_text_content=contenido
        )

        sg = SendGridAPIClient(os.environ["SENDGRID_API_KEY"])
        response = sg.send(mail)

        print("✅ Mail enviado con SendGrid")
        print(response.status_code)

        return redirect("/contacto" + "Mail enviado correctamente")

    except Exception as e:
        print("❌ Error SendGrid:", e)
        return "Error enviando el mail"



# ===============================
# 👉 INICIAR SERVIDOR
# ===============================
app = Flask(__name__)
if __name__ == "__main__":
    app.run(debug=True)