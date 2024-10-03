import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { sendEmail } from "../utils/emailTemplate.js";

export const signup = async (req, res) => {
  const { fullname, username, email, password, gender } = req.body;
  try {
    if (!fullname || !username || !email || !password || !gender)
      return res.status(400).json({ error: "Fill all details" });

    const hashedPassword = bcryptjs.hashSync(password, 10);
  
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    await User.create({
      fullname,
      username,
      email,
      password: hashedPassword,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });
    res.status(201).send({success:"Signup successfully"})
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password)
      return res.status(400).json({ error: "Fill all details" });

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "username Not Found!" });

    const isCorrect = bcryptjs.compareSync(password, user.password);
    if (!isCorrect) {
      return res.status(404).json({ error: "Wrong Credentials!" });
    } else {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;

      res
        .cookie("access_token", token, process.env.JWT_SECRET)
        .status(200)
        .json(rest);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("access_token", "")
      .json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getAllUser = async (req, res) => {
  try {
    const loggedInUser = req.id;
    const otherUsers = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );
    res.status(200).json(otherUsers)
  } catch (error) {
    res.status(500).json(error.message);
  }
};
