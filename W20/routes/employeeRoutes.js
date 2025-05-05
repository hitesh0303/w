const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Show form to add employee
router.get('/add', (req, res) => {
  res.render('add');
});

// Add employee
router.post('/add', async (req, res) => {
  await Employee.create(req.body);
  res.redirect('/employees');
});

// View all employees
router.get('/', async (req, res) => {
  const employees = await Employee.find();
  res.render('view', { employees });
});

// Show edit form
router.get('/edit/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.render('edit', { employee });
});

// Update employee
router.post('/edit/:id', async (req, res) => {
  await Employee.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/employees');
});

// Delete employee
router.get('/delete/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.redirect('/employees');
});

module.exports = router;
