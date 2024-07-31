

# Pulse Project

Pulse is a web application designed to help users locate nearby pharmacies with specific medications in stock. It uses real-time inventory data and location-based services to provide accurate and timely information.

## Features

- **Search Functionality**: Search for pharmacies by name or district.
- **Pharmacy Details**: View detailed information about pharmacies, including contact details and location on Google Maps.
- **User Authentication**: Users can sign up and log in to access more features.
- **Responsive Design**: The application is optimized for both desktop and mobile devices.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/your-username/pulse.git
   cd pulse
   cd pulse_healthcare
   ```

2. **Create and activate a virtual environment**:

   ```sh
   python3 -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. **Install the required packages**:

   ```sh
   pip install -r requirements.txt
   ```

   Make sure your `requirements.txt` includes all the necessary packages. You can generate it using:

   ```sh
   pip freeze > requirements.txt
   ```

   Here is an example of what the `requirements.txt` might look like:

   ```
   aniso8601==9.0.1
   asarPy==1.0.1
   asgiref==3.5.0
   bcrypt==3.2.0
   blinker==1.8.2
   cffi==1.15.0
   click==8.1.2
   Cython==0.29.37
   dnspython==2.2.1
   email-validator==1.1.3
   Flask==2.1.1
   Flask-Bcrypt==1.0.1
   Flask-Login==0.6.0
   Flask-RESTful==0.3.10
   Flask-SQLAlchemy==2.5.1
   Flask-WTF==1.0.1
   greenlet==3.0.3
   idna==3.3
   importlib-metadata==4.11.3
   itsdangerous==2.1.2
   Jinja2==3.1.1
   Mako==1.3.5
   Markdown==3.6
   MarkupSafe==2.1.1
   meson==1.3.2
   pycparser==2.21
   Pygments==2.18.0
   PyMySQL==1.1.1
   pytz==2024.1
   six==1.16.0
   SQLAlchemy==1.4.35
   sqlparse==0.4.2
   typing_extensions==4.12.2
   Werkzeug==2.1.1
   WTForms==3.0.1
   zipp==3.8.0
   gunicorn
   
   ```

4. **Set up the database**:

   ```sh
   flask db init
   flask db migrate -m "Initial migration."
   flask db upgrade
   ```

5. **Run the application**:

   ```sh
   flask run
   ```

   The application will be available at `http://localhost:5000`.

## Usage

- Access the web application at `http://localhost:5000`.
- Sign up or log in to search for pharmacies and view detailed information.

## Demo

Watch the [YouTube video](https://youtu.be/KO_auGq5e1k?si=UhYRfZxjPtMlzHp4) for a demonstration of how Pulse works.

[![Pulse Demo](https://img.youtube.com/vi/KO_auGq5e1k/0.jpg)](https://youtu.be/KO_auGq5e1k?si=UhYRfZxjPtMlzHp4)

## Deployment

The project is deployed on Render and can be accessed at [Pulse on Render](https://pulse-1-fi9m.onrender.com/).

## Contributing

If you wish to contribute to the project, please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

---

This `README.md` file includes all the necessary information about the project, installation steps, and a link to the YouTube demo. You can copy and paste this into your `README.md` file.
