const { Pool } = require('pg');
require('dotenv').config();

const model = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.DATABASEPASSWORD,
  port: process.env.DATABASEPORT
});

const customers = {

  async getAll(req, res) {
    const result = await model.query('SELECT * FROM customers');
    res.json(result.rows);
  },

  async create(req, res) {
    const { name, email, phone } = req.body;
    const result = await model.query('INSERT INTO customers (name, email, phone) VALUES ($1, $2, $3) RETURNING *', [name, email, phone]);
    res.json(result.rows[0]);
  },

  async getOne(req, res) {
    const id = req.params.id;
    const result = await model.query('SELECT * FROM customers WHERE id = $1', [id]);
    res.json(result.rows[0]);
  },

  async update(req, res) {
    const id = req.params.id;
    const { name, email, phone } = req.body;
    const result = await model.query('UPDATE customers SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *', [name, email, phone, id]);
    res.json(result.rows[0]);
  },

  async delete(req, res) {
    const id = req.params.id;
    await model.query('DELETE FROM customers WHERE id = $1', [id]);
    res.json({ message: 'Customer deleted successfully' });
  },
};

module.exports = customers;