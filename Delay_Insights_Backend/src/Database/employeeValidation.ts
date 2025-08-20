import Joi, { ValidationResult } from "joi";

interface Employee {
  emp_name: string;
  password: string;
}

export function validateEmployee(emp: Employee): ValidationResult {
  const employeeScehma = Joi.object({
    emp_name: Joi.string().min(3).max(20).required().alphanum(),
    password: Joi.string().min(6).required(),
    shop_code:Joi.number()
  });

  return employeeScehma.validate(emp);
}
