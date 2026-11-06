import express from "express";
import employees, { getEmployees, getEmployee, getRandomEmployee } from "#db/employees";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(getEmployees());
});

router.get("/random", (req, res) => {
  res.send(getRandomEmployee());
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = getEmployee(+id);

  if (!employee) {
    return res.status(404).send(`Employee #${id} not found.`);
  }

  res.send(employee);
});

router.post("/", (req, res) => {
  const { name } = req.body || {};

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).send("A valid name is required.");
  }

  const newEmployee = {
    id: Math.max(...employees.map((employee) => employee.id)) + 1,
    name: name,
  };

  employees.push(newEmployee);

  res.status(201).json(newEmployee);
});

export default router;
