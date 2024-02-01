import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { body, check, validationResult } from "express-validator";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/me", verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

//registering user
router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email").isEmail().withMessage("This is required"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("This field is required"),
  ],
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User Already Registered" });
      }
      user = new User(req.body);

      //generating token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 86400000,
      });

      await user.save();
      return res.status(200).send({ message: "Registered successful" });
    } catch (error) {
      return res.status(400).json({ message: "Registration failed!!!" });
    }
  }
);

export default router;
