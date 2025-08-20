import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { db } from "../Database/connection";

interface Employee {
  emp_name: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JwtSecret: string;
    }
  }
}

declare global {
  namespace NodeJS {
    interface Request {
      emp: Employee;
    }
  }
}

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  let token: string | undefined;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    console.log("No token provided.");
    return res
      .status(401)
      .json({ message: "No token provided. Authorization denied." });
  }

  try {
    console.log("Token received, attempting verification.");
    const decodedMsg = jwt.verify(token, process.env.JwtSecret) as {
      emp_name: string;
    };
    const emp_name = decodedMsg.emp_name;

    const [existingRows] : any = await db.query(
      `SELECT * FROM Employees WHERE emp_name = ?`,
      [emp_name]
    );

    if (existingRows.length === 0) {
      console.log("User not found in DB: " + emp_name);
      return res.status(401).json({ message: "Invalid token: Employee not found." });
    }

    // @ts-ignore
    req.emp = existingRows[0];
    // @ts-ignore
    console.log("Decoded user: " + req.emp.emp_name);

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res
      .status(401)
      .json({ message: "Token is not valid. Authorization denied." });
  }
}

export default authMiddleware;
