const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinery");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const verifiedModel = require("../model/verifiedModel");
const transport = require("../config/emailTrans");
const { error } = require("console");

const getAllUser = async (req, res) => {
  try {
    const getAll = await userModel.find();
    res.status(200).json({
      status: 200,
      data: getAll,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      data: error.message,
    });
  }
};

const getOneUser = async (req, res) => {
  try {
    const getOne = await userModel.findById(req.params.id);
    res.status(200).json({
      status: 200,
      data: getOne,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      data: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const image = await cloudinary.uploader.upload(req.file.path);
    const tokenValue = crypto.randomBytes(23).toString("hex");
    const myToken = jwt.sign({ tokenValue }, process.env.MY_SECRETE, {
      expiresIn: process.env.EXPIRE,
    });

    const user = await userModel.create({
      username,
      email,
      password: hashed,
      avatar: image.secure_url,
      avatarID: image.public_id,
      verifiedToken: myToken,
    });

    await verifiedModel.create({
      token: myToken,
      userID: user._id,
      _id: user._id,
    });

    const mailOptions = {
      from: "sambuy@gmail.com",
      to: email,
      subject: "Account Verication",
      html: `
            Hi There✌️, I'm Samuel Olorunda. Thanks for Signing up with our e-comerence platform ${user.username} , we're so glad to have you onboard, Please  <a href="http://localhost:${process.env.PORT}/api/user/${user._id}/${myToken}" > Click on this Link <a/> to Complect your Sign Up. 

            This Link expires in 30min
            `,
    };

    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("Email has been sent to your Inbox", info.response);
      }
    });

    res.status(200).json({
      message: "Check your Inbox to continue",
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      data: error.message,
    });
  }
};

const verifyUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (user) {
      if (user.verifyToken !== "") {
        await userModel.findByIdAndUpdate(
          user._id,
          {
            isVerify: true,
            verifyToken: "",
          },
          { new: true }
        );
        await verifiedModel.findByIdAndUpdate(
          user._id,
          {
            userID: user._id,
            token: "",
          },
          { new: true }
        );
        res.status(200).json({
          message: "You've been verfied, you can now go Sign In",
        });
      } else {
        res.status(404).json({
          status: 404,
          message: error.message,
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: 404,
      data: error.message,
    });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const image = await cloudinary.uploader.upload(req.file.path);
    const tokenValue = crypto.randomBytes(64).toString("hex");
    const adminToken = crypto.randomBytes(5).toString("hex");

    const myToken = jwt.sign({ tokenValue }, process.env.MY_SECRETE, {
      expiresIn: process.env.EXPIRE,
    });

    const user = await userModel.create({
      username,
      email,
      password: hashed,
      avatar: image.secure_url,
      avatarID: image.public_id,
      verifiedToken: myToken,
      OTP: adminToken,
    });

    await verifiedModel.create({
      token: myToken,
      userID: user._id,
      _id: user._id,
    });

    const mailOptions = {
      from: "sambuy@gmail.com",
      to: email,
      subject: "Verify your Admin's Account",
      html: `
            Hi There✌️, I'm Samuel Olorunda. Thanks for Signing up with our e-comerence platform ${user.username} , we're so glad to have you onboard, You're Signing up as an Admin Please  <a href="http://localhost:${process.env.PORT}/api/admin/${user._id}/${myToken}" > Click on this Link <a/> to verify your admin account. 

            And hear is your Admin's Secret Key <strong> ${adminToken} </strong> Please keep it secured as you'll be required of it in the next pharse of your verification

            This Link expires in 30min
            `,
    };

    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(
          "Go to your email to Complet Your Verification",
          info.response
        );
      }
    });

    res.status(201).json({
      message: "Check your Inbox to Continue...",
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      data: error.message,
    });
  }
};

const verifyAdmin = async (req, res) => {
  try {
    const { mainOTP } = req.body;

    const user = await userModel.findById(req.params.id);
    if (user) {
      if (user.verifiedToken !== "") {
        if (user.OTP === mainOTP) {
          await userModel.findByIdAndUpdate(
            user._id,
            {
              isVerify: true,
              isAdmin: true,
              verifiedToken: "",
              OTP: "",
            },
            { new: true }
          );

          await verifiedModel.findByIdAndUpdate(
            user._id,
            {
              userID: user._id,
              token: "",
            },
            { new: true }
          );

          res.status(200).json({
            message: "Verification Complete👍, You can now Go Sign In",
          });
        } else {
          res.status(404).json({
            status:
              "You've Entered to wrong OTP, please check your email to ensure you enter the correct OTP",
            data: error.message,
          });
        }
      } else {
        res.status(404).json({
          status: 404,
          data: error.message,
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        data: error.message,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: 404,
      data: error.message,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        if (user.isVerify) {
          const token = jwt.sign(
            {
              _id: user._id,
              isVerify: user.isVerify,
              isAdmin: user.isAdmin,
            },
            process.env.MY_SECRETE,
            {
              expiresIn: process.env.EXPIRE,
            }
          );

          const { password, ...info } = user._doc;

          res.status(201).json({
            message: `Welcome Back ${user.username}`,
            data: { token, ...info },
          });
        } else {
          if (user.OTP !== "") {
            const tokenValue = crypto.randomBytes(64).toString("hex");
            const adminToken = crypto.randomBytes(5).toString("hex");

            const myToken = jwt.sign({ tokenValue }, process.env.MY_SECRETE, {
              expiresIn: process.env.EXPIRE,
            });

            const mailOptions = {
              from: "sambuy@gmail.com",
              to: email,
              subject:
                "Verify your Admin's Account before proceeding to Sign In",
              html: `
                  Hi There✌️, I'm Samuel Olorunda. Thanks for Signing up with our e-comerence platform ${user.username} , we're so glad to have you onboard, You're Signing up as an Admin Please  <a href="http://localhost:${process.env.PORT}/api/admin/${user._id}/${myToken}" > Click on this Link <a/> to verify your admin account. 
      
                  And hear is your Admin's Secret Key <strong> ${adminToken} </strong> Please keep it secured as you'll be required of it in the next pharse of your verification
      
                  This Link expires in 30min
                  `,
            };

            transport.sendMail(mailOptions, (err, info) => {
              if (err) {
                console.log(err.message);
              } else {
                console.log("Go Check your Inbox, An Email has been sent...");
              }
            });

            res.status(201).json({
              message: "Check Your Inbox to Continue...",
            });
          } else {
            const tokenValue = crypto.randomBytes(64).toString("hex");
            const myToken = jwt.sign({ tokenValue }, process.env.MY_SECRETE, {
              expiresIn: process.env.EXPIRE,
            });

            const mailOptions = {
              from: "sambuy@gmail.com",
              to: email,
              subject: "Account Verication",
              html: `
                  Hi There✌️, I'm Samuel Olorunda. Thanks for Signing up with our e-comerence platform ${user.username} , we're so glad to have you onboard, Please  <a href="http://localhost:${process.env.PORT}/api/user/${user._id}/${myToken}" > Click on this Link <a/> to Complect your Sign Up. 
      
                  This Link expires in 30min
                  `,
            };

            transport.sendMail(mailOptions, (err, info) => {
              if (err) {
                console.log(err.message);
              } else {
                console.log(
                  "An Email Has been sent to Your Inbox",
                  info.response
                );
              }
            });

            res.status(200).json({
              message: "Check Your Inbox to Continue...",
            });
          }
        }
      } else {
        res.status(404).json({
          message: "Invalid Password",
        });
      }
    } else {
      res.status(404).json({
        message: "User not Recognised",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: 404,
      data: error.message,
    });
  }
};

module.exports = {
  getAllUser,
  getOneUser,
  createUser,
  verifyUser,
  createAdmin,
  verifyAdmin,
  signIn,
};
