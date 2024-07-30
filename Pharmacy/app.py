from flask import Flask, redirect, render_template, request, url_for, jsonify
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key_here'  # Replace with your actual secret key

# Sample data
inventory = [
    {'id': 1, 'name': 'Aspirin', 'quantity': 20},
    {'id': 2, 'name': 'Ibuprofen', 'quantity': 15}
]

requests = [
    {'id': 1, 'user': 'John Doe', 'product_name': 'Aspirin', 'quantity': 2,'status': 'Pending'},
    {'id': 2, 'user': 'Jane Smith', 'product_name': 'Ibuprofen', 'quantity': 1,'status': 'Pending'}
]

# Flask-WTF Form for Inventory Management
class InventoryForm(FlaskForm):
    name = StringField('Medicine Name', validators=[DataRequired()])
    quantity = IntegerField('Quantity', validators=[DataRequired()])
    submit = SubmitField('Add Medicine')

@app.route('/')
def home_page():
    return render_template('index.html')  


@app.route('/inventory', methods=['GET', 'POST'])
def inventory_management():
    form = InventoryForm()
    if form.validate_on_submit():
        name = form.name.data
        quantity = form.quantity.data
        new_id = len(inventory) + 1
        inventory.append({'id': new_id, 'name': name, 'quantity': quantity})
        return redirect(url_for('inventory_management'))
    return render_template('inventory-management.html', form=form, inventory=inventory)

@app.route('/requests', methods=['GET'])
def requests_page():
    return render_template('requests.html', requests=requests)

@app.route('/update_request/<int:request_id>', methods=['POST'])
def update_request(request_id):
    data = request.get_json()
    new_status = data.get('status')
    for req in requests:
        if req['id'] == request_id:
            req['status'] = new_status
            return jsonify(success=True)
    return jsonify(success=False, error='Request not found')

@app.route('/update_product/<int:product_id>', methods=['POST'])
def update_product(product_id):
    data = request.get_json()
    new_quantity = data.get('quantity')
    for product in inventory:
        if product['id'] == product_id:
            product['quantity'] = new_quantity
            return jsonify(success=True)
    return jsonify(success=False, error='Product not found')

@app.route('/delete_product/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    global inventory
    inventory = [product for product in inventory if product['id']!= product_id]
    return jsonify(success=True)

if __name__ == '__main__':
    app.run(debug=True)
