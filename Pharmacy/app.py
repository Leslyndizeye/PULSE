from flask import Flask, render_template, redirect, url_for, request
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, NumberRange

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'

# Example in-memory inventory and requests
inventory = [
    {'name': 'Product1', 'price': 10.00, 'quantity': 100},
    {'name': 'Product2', 'price': 20.00, 'quantity': 50},
]

requests = [
    {'id': 1, 'user': 'John Doe', 'product_name': 'Aspirin', 'quantity': 2, 'status': 'Pending'},
    {'id': 2, 'user': 'Jane Smith', 'product_name': 'Ibuprofen', 'quantity': 1, 'status': 'Pending'}
]

# Flask-WTF Form for Inventory Management
class InventoryForm(FlaskForm):
    name = StringField('Medicine Name', validators=[DataRequired()])
    quantity = IntegerField('Quantity', validators=[DataRequired(), NumberRange(min=1)])
    submit = SubmitField('Add Medicine')

# Flask-WTF Form for Requests
class RequestForm(FlaskForm):
    user = StringField('User', validators=[DataRequired()])
    product_name = StringField('Product Name', validators=[DataRequired()])
    quantity = IntegerField('Quantity', validators=[DataRequired(), NumberRange(min=1)])
    submit = SubmitField('Submit Request')

@app.route('/')
def home_page():
    return render_template('index.html')

@app.route('/inventory', methods=['GET', 'POST'])
def inventory_management():
    form = InventoryForm()
    if form.validate_on_submit():
        name = form.name.data
        quantity = form.quantity.data
        # Add the product to the inventory
        inventory.append({'name': name, 'price': 0.0, 'quantity': quantity})  # Default price set to 0.0
        return redirect(url_for('inventory_management'))
    return render_template('inventory.html', form=form, inventory=inventory)

@app.route('/requests', methods=['GET', 'POST'])
def requests_page():
    form = RequestForm()
    if form.validate_on_submit():
        user = form.user.data
        product_name = form.product_name.data
        quantity = form.quantity.data
        # Add the request to the requests list
        requests.append({'id': len(requests) + 1, 'user': user, 'product_name': product_name, 'quantity': quantity, 'status': 'Pending'})
        return redirect(url_for('requests_page'))
    return render_template('requests.html', form=form, requests=requests)

if __name__ == '__main__':
    app.run(debug=True)
