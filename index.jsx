
  return (
    <Formik
    
      initialValues={{ nombre: '', correo: '', telefono: '', contraseña: '' }}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <Field type="text" name="nombre" required />
        </div>
        <div>
          <label htmlFor="correo">Correo electrónico:</label>
          <Field type="email" name="correo" required />
        </div>
        <div>
          <label htmlFor="telefono">Teléfono:</label>
          <Field type="tel" name="telefono" required />
        </div>
        <div>
          <label htmlFor="contraseña">Contraseña:</label>
          <Field type="password" name="contraseña" required />
        </div>
        <button type="submit">Registrar</button>
      </Form>
    </Formik>
  );


export default RegistrationForm;

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser'); 

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '70909354',
  database: 'usuarios'
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});


app.post('/register', (req, res) => {
  
  const { nombre, correo, telefono, contraseña } = req.body;

  const insertQuery = `INSERT INTO usuarios (nombre, correo, telefono, contraseña) VALUES (?, ?, ?, ?)`;
  db.query(insertQuery, [nombre, correo, telefono, contraseña], (err, result) => {
    if (err) {
      console.error('Error registering user: ' + err);
      res.status(500).json({ error: 'Registration failed' });
    } else {
      res.json({ message: 'Registration successful' });
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
