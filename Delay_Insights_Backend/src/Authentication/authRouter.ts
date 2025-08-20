import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../Database/connection";
import { validateEmployee } from "../Database/employeeValidation";
import authMiddleware from "./authMiddleware";

const router = express.Router();

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

function generateToken(emp_name: string) {
  const token = jwt.sign({ emp_name }, process.env.JwtSecret as string, {
    expiresIn: "7d",
  });
  return token;
}

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(401).json({ message: "Empty request body" });
      return;
    }

    const { error } = validateEmployee(req.body);
    if (error) {
      console.log(error.details[0].context);
      res.status(411).json({
        message: "Validation Error",
        field: error.details[0].context?.label,
      });
      return;
    }

    const { emp_name, password, shop_code } = req.body;

    // Check if the employee already exists
    const [existingRows]: any = await db.query(
      `SELECT * FROM Employees WHERE emp_name = ?;`,
      [emp_name]
    );

    if (Array.isArray(existingRows) && existingRows.length > 0) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const [existingShop]: any = await db.query(
      `SELECT shop FROM shop_data WHERE shop_code = ?;`,
      [shop_code]
    );

    if (!Array.isArray(existingShop) || existingShop.length === 0) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    await db.query(
      `INSERT INTO Employees (emp_name, password,shop_code) VALUES (?, ?, ?);`,
      [emp_name, hashedPassword, shop_code]
    );

    const token = generateToken(emp_name);

    res
      .cookie("token", token, { httpOnly: true, sameSite: "lax" })
      .status(201)
      .json({
        message: "Signup successful",
        loggedInUser: { emp_name, shop_code },
        token: token,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    console.log(req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(401).json({ message: "Empty request body" });
      return;
    }

    const { emp_name, password } = req.body;

    const [rows]: any = await db.query(
      `SELECT * FROM Employees WHERE emp_name = ?;`,
      [emp_name]
    );

    if (!Array.isArray(rows) || rows.length === 0) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const emp = rows[0];

    const isMatch = await bcrypt.compare(password, emp.password);

    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = generateToken(emp_name);

    res
      .cookie("token", token, { httpOnly: true, sameSite: "lax" })
      .status(201)
      .json({
        message: "Signin Successfull",
        loggedInUser: { emp_name, shop_code: emp.shop_code },
        token: token,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
});

router.post("/signout", (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
    })
    .status(200)
    .json({ message: "Signout successful" });
  return;
});

//@ts-ignore
router.get("/protected", authMiddleware, (req, res) => {
  res.status(201).json({
    message: "Protected data accessed",
    // @ts-ignore
    loggedInUser: { emp_name: req.emp.emp_name, shop_code: req.emp.shop_code },
  });
  return;
});

export default router;
