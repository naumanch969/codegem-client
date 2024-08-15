import User from "../models/user.js";
import OTP from "../models/otp.js";
import Setting from "../models/setting.js";
import { createError, createNotification, sendMail, } from "../utils/functions.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import { attachCookiesToResponse } from "../utils/jwt.js";

export const register = async (req, res, next) => {
  try {
    let { firstName, lastName, username, email, password } = req.body;

    if (!firstName) return next(createError(res, 400, "First name is missing."));
    if (!lastName) return next(createError(res, 400, "Last name is missing."));
    if (!username) return next(createError(res, 400, "Username is missing."));
    if (!email) return next(createError(res, 400, "Email is missing."));
    if (!password) return next(createError(res, 400, "Password is missing."));

    if (email && !validator.isEmail(email)) return next(createError(res, 400, "Invalid Email Address."));

    const findedUserByUsername = await User.findOne({ username });
    if (Boolean(findedUserByUsername)) return next(createError(res, res, 400, "Username already exist."));

    const findedUserByEmail = await User.findOne({ email });
    if (Boolean(findedUserByEmail)) return next(createError(res, res, 400, "Email already exist."));

    const hashedPassword = await bcrypt.hash(password, 12);

    var role;
    if (username == process.env.ADMIN_USERNAME) role = "Admin";
    else role = role || "User";

    const newUser = await User.create({ firstName, lastName, username, email, password: hashedPassword, role, });

    // Create Setting Document of user
    await Setting.create({ user: newUser?._id })

    // Send OTP to user
    const otp = otpGenerator.generate(5, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false, });
    await OTP.create({ email, otp, name: "verify_register_otp", });
    sendMail(email, "Verification", `<p>Your OTP code is ${otp}</p>`);

    const token = jwt.sign({ _id: newUser._id, role: newUser.role }, process.env.JWT_SECRET);

    await createNotification(newUser?._id, "Welcome to Codegem!", "Congratulations! You've successfully joined Codegem. Start connecting and sharing your moments with friends");

    res.status(200).json({ result: newUser, message: "Registered successfully.", token, otp }); // token is being passed just for development
    // .cookie("code.connect", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // Enable secure cookie in production
    //   // expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    // })
  } catch (err) {
    next(createError(res, 500, err.message));
  }
};
export const verifyRegisterOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return next(createError(res, 400, "Make sure to provide all the fields"));

    const findedUser = await User.findOne({ email });
    if (!findedUser) return createError(res, 400, "User not found");

    const otps = await OTP.find({ email });
    if (otps.length == 0)
      return next(createError(res, 400, "No otp for this email."));

    const verify_register_otps = otps.filter(
      (otp) => otp.name == "verify_register_otp"
    );
    const findedOTP = verify_register_otps[verify_register_otps.length - 1];
    if (!findedOTP)
      return next(createError(res, 400, "You have entered an expired otp"));

    // const isValidOTP = await bcrypt.compare(plainOTP, hashedOTP)
    const isValidOTP = otp == findedOTP.otp;
    if (!isValidOTP) return next(createError(res, 400, "wrong otp"));

    await User.updateOne({ email }, { verified: true });
    await OTP.deleteMany({ email, name: "verify_register_otp" });

    res.status(200).json({ message: "Email Verified" });
  } catch (err) {
    next(createError(res, 500, err.message));
  }
};
export const login = async (req, res, next) => {
  try {
    const { username: input, password: input_password } = req.body;

    if (!input) return next(createError(res, 400, "Username is required"));
    if (!input) return next(createError(res, 400, "Password is required"));

    const findedUserByUsername = await User.findOne({ username: input });
    const findedUserByEmail = await User.findOne({ email: input });
    if (!findedUserByEmail && !findedUserByUsername) return next(createError(res, 400, "Wrong Credentials - username/email"));

    const findedUser = findedUserByUsername ? findedUserByUsername : findedUserByEmail;

    const isPasswordCorrect = await bcrypt.compare(input_password, findedUser.password);
    if (!isPasswordCorrect)
      return next(createError(res, 401, "Wrong Credentials - password"));

    const token = jwt.sign({ _id: findedUser._id, role: findedUser.role }, process.env.JWT_SECRET);

    const findedSettingsObj = await Setting.findOne({ user: String(findedUser?._id) })
    if (!findedSettingsObj) {
      await Setting.create({ user: findedUser?._id })
    }

    attachCookiesToResponse(res, { _id: findedUser._id, role: findedUser.role });

    res
      .status(200)
      .json({ message: "Login successfully.", result: findedUser, token });
  } catch (err) {
    next(createError(res, 500, err.message));
  }
};
export const sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return next(createError(res, 400, "Email is required"));

    const findedUser = await User.findOne({ email });

    // in forget password route, user should be registered already
    if (!findedUser)
      return res.status(400).json({ message: `No user exist with email ${email}`, success: false });
    if (!validator.isEmail(email))
      return res.status(400).json({ message: `Please provide a valid email.`, success: false });

    const otp = otpGenerator.generate(5, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false, });

    await OTP.create({ email, otp, name: "forget_password_otp", });

    sendMail(email, "Verification", `<p>Your OTP code is ${otp}</p>`);

    res.status(200).json({ message: "Otp send successfully", success: true, });
  } catch (error) {
    next(createError(res, 500, err.message));
  }
};
export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return next(createError(res, 400, "Make sure to provide all the fields"));

    const findedUser = await User.findOne({ email });
    if (!findedUser) return next(createError(res, 400, "User not found"));

    const otps = await OTP.find({ email });
    if (otps.length == 0)
      return next(createError(res, 400, "you have entered an expired otp"));

    const forget_password_otps = otps.filter(
      (otp) => otp.name == "forget_password_otp"
    );
    const findedOTP = forget_password_otps[forget_password_otps.length - 1];
    if (!findedOTP)
      return next(createError(res, 400, "you have entered an expired otp"));

    // const isValidOTP = await bcrypt.compare(plainOTP, hashedOTP)
    const isValidOTP = otp == findedOTP.otp;
    if (!isValidOTP) return next(createError(res, 400, "wrong otp"));

    await OTP.deleteMany({ email, name: "forget_password_otp" });

    res.status(200).json({ message: "OTP Verified" }); // send link to set new password
  } catch (error) {
    res.status(404).json({
      message: "error in changePassword - controllers/user.js",
      error,
      success: false,
    });
  }
};
export const setNewPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!password || !email)
      return res.status(400).json({
        message: "Make sure to provide all the fieds.",
        success: false,
      });

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.updateOne({ email }, { password: hashedPassword });

    return res.status(200).json({ message: "password updated successfully" });
  } catch (error) {
    res.status(404).json({
      message: "error in changePassword - controllers/user.js",
      error,
      success: false,
    });
  }
};
export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const findedUser = await User.findById(req.user._id);

    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      findedUser.password
    );
    if (!isPasswordCorrect)
      return next(createError(res, 401, "Wrong Credentials"));

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const result = await User.findByIdAndUpdate(
      req.user._id,
      { password: hashedPassword },
      { new: true }
    );
    res.status(200).json({
      result,
      message: "Password Changed Successfully",
      success: true,
    });
  } catch (err) {
    next(createError(res, 500, err.message));
  }
};
