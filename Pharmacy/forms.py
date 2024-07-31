from flask_wtf import FlaskForm # type: ignore
from wtforms import StringField, IntegerField, SubmitField # type: ignore
from wtforms.validators import DataRequired, NumberRange # type: ignore
class InventoryForm(FlaskForm):
    name = StringField('Medicine Name', validators=[DataRequired()])
    quantity = IntegerField('Quantity', validators=[DataRequired()])
    submit = SubmitField('Add Medicine')
class RequestForm(FlaskForm):
    user = StringField('User', validators=[DataRequired()])
    product_name = StringField('Product Name', validators=[DataRequired()])
    quantity = IntegerField('Quantity', validators=[DataRequired(), NumberRange(min=0)])
    submit = SubmitField('Submit Request')

