from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, SubmitField
from wtforms.validators import DataRequired, NumberRange

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'

# Example in-memory inventory and requests
inventory = [
    {'name': 'Paracetamol', 'price': 10.00, 'quantity': 100, 'description': 'Pain reliever'},
    {'name': 'Ibuprofen', 'price': 20.00, 'quantity': 50, 'description': 'Anti-inflammatory'},
]

requests = [
    {'id': 1, 'user': 'stella remember', 'product_name': 'Aspirin', 'quantity': 2, 'status': 'Pending'},
    {'id': 2, 'user': 'niyitegeka', 'product_name': 'Ibuprofen', 'quantity': 1, 'status': 'Pending'}
]

# Flask-WTF Form for Inventory Management
class InventoryForm(FlaskForm):
    name = StringField('Medicine Name', validators=[DataRequired()])
    price = FloatField('Price', validators=[DataRequired(), NumberRange(min=0)])
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
        price = form.price.data
        quantity = form.quantity.data
        description = request.form.get('description', '')
        inventory.append({'name': name, 'price': price, 'quantity': quantity, 'description': description})
        return redirect(url_for('inventory_management'))
    return render_template('inventory.html', form=form, inventory=inventory)

@app.route('/requests', methods=['GET', 'POST'])
def requests_page():
    form = RequestForm()
    if form.validate_on_submit():
        user = form.user.data
        product_name = form.product_name.data
        quantity = form.quantity.data
        requests.append({'id': len(requests) + 1, 'user': user, 'product_name': product_name, 'quantity': quantity, 'status': 'Pending'})
        return redirect(url_for('requests_page'))
    return render_template('requests.html', form=form, requests=requests)

@app.route('/handle_request/<int:request_id>/<action>', methods=['POST'])
def handle_request(request_id, action):
    global requests, inventory
    for req in requests:
        if req['id'] == request_id:
            if action == 'accept':
                # Update inventory if the request is accepted
                for item in inventory:
                    if item['name'].lower() == req['product_name'].lower() and item['quantity'] >= req['quantity']:
                        item['quantity'] -= req['quantity']
                        req['status'] = 'Completed'
                        break
                else:
                    req['status'] = 'Failed'
            else:
                req['status'] = 'Rejected'
    return redirect(url_for('requests_page'))

@app.route('/update_inventory', methods=['POST'])
def update_inventory():
    index = int(request.form.get('index'))
    daily_update = int(request.form.get('dailyUpdate'))
    
    if 0 <= index < len(inventory):
        product = inventory[index]
        product['quantity'] += daily_update
        return jsonify({'success': True})
    
    return jsonify({'success': False})

@app.route('/delete_product/<int:index>', methods=['POST'])
def delete_product(index):
    global inventory
    if 0 <= index < len(inventory):
        del inventory[index]
        return jsonify({'success': True})
    return jsonify({'success': False})

if __name__ == '__main__':
    app.run(debug=True)
