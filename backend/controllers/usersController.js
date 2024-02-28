const Users = require("../models/usersModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const saltRounds = 11;

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username already exists
    const userExist = await Users.findOne({ username });

    if (userExist) {
      return res.send({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user in the database
    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate an email verification token
    const verificationToken = generateVerificationToken(newUser._id);

    // Send email verification
    sendEmailVerification(newUser.email, verificationToken);
    //Providing basic token
    const token = jwt.sign({ _id: newUser._id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60000,
      sameSite: "strict",
    });
    // Return success message
    return res.send({ user: newUser, message: "Signed up successfully. Please check your email for verification." });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

function generateVerificationToken(userId) {
  const token = jwt.sign({ _id: userId }, process.env.VERIFICATION_SECRET, { expiresIn: "1h" });
  return token;
}

async function sendEmailVerification(toEmail, verificationToken) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MYEMAIL,
        pass: process.env.MYEMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from:  process.env.MYEMAIL,
      to: toEmail,
      subject: 'Email Verification',
      text: `Hey, \nPlease click the following link to verify your email:\n ${process.env.SERVER_ADDRESS}/users/verify/${verificationToken}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email verification sent:', info);
  } catch (error) {
    console.error('Email verification error:', error);
  }
}
exports.getUserById = async (req, res) => {
  try {
    const userID = req.params.id;

    const UsersObject = await Users.findById(userID);

    if (!UsersObject) {
      return res.status(404).send("User not found");
    }

    res.send(UsersObject);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const UsersCursor = await Users.collection.find();
    const UsersArray = await UsersCursor.toArray();

    res.send(UsersArray);
  } catch (error) {
    console.error("Error fetching all Users:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.Signin = async (req, res) => {
  const validUser = await ValidUser(req.body);
  if (validUser) {
    const token = jwt.sign({ _id: validUser._id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 36000,
      sameSite: "strict",
    });
    res.status(200).json({
      success: true,
      message:{username:validUser.username, email:validUser.email, _id:validUser._id, verified: validUser.verified},
    });
  } else {
    res.status(200).json({
      success: false,
      message:'Username or password invalid',
    });
  }
};

exports.deleteAllUsers = async (req, res) => {
  try {
    await Users.collection.drop();
    res.send("Users collection dropped");
  } catch (error) {
    console.error("Error dropping Users collection:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.editUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Users.findByIdAndUpdate(id, {
      username: req.body?.username,
      password: req.body?.password,
      email: req.body?.email,
    });

    if (result) {
      res.send("User edited successfully.");
    } else {
      res.send("User not found or not edited.");
    }
  } catch (error) {
    console.error("Error editing User:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteById = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Users.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      return res.send("User deleted successfully.");
    } else {
      return res.send("User not found or not deleted.");
    }
  } catch (error) {
    console.error("Error deleting User:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.authenticate = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    const answer = decoded._id == req.params.id;
   
    res.status(200).json({success:answer,message:token});
  } catch (error) {
    res.status(500).json({ message: error.message || "An error occurred." });
  }
};
exports.verifyUser = async (req, res) => {
  try {
    console.log("verifyUser")
    const verificationToken = req.params.token;
    const decoded = jwt.verify(verificationToken, process.env.VERIFICATION_SECRET);

    const userId = decoded._id;

    const updatedUser = await Users.findByIdAndUpdate(userId, { verified: true }, { new: true });

    if (updatedUser) {
      // Send an HTML response
      return res.send(`
        <html>
          <head>
            <title>Email Verification</title>
          </head>
          <body>
            <h1>Email Verification Successful</h1>
            <p>Your email has been successfully verified. You can now log in.</p>
          </body>
        </html>
      `);
    } else {
      // Send an HTML response for error
      return res.status(404).send(`
        <html>
          <head>
            <title>Email Verification Error</title>
          </head>
          <body>
            <h1>Error</h1>
            <p>User not found or not updated.</p>
          </body>
        </html>
      `);
    }
  } catch (error) {
    console.error("Error verifying user:", error);
    // Send an HTML response for internal server error
    res.status(500).send(`
      <html>
        <head>
          <title>Internal Server Error</title>
        </head>
        <body>
          <h1>Error</h1>
          <p>Internal Server Error</p>
        </body>
      </html>
    `);
  }
};


async function ValidUser(recievedUser) {
  try {
    const existingUser = await Users.findOne({ username:recievedUser?.username });
    if(existingUser && await bcrypt.compare(recievedUser.password, existingUser?.password)) {
      return existingUser;
    }
    return false;
  } catch (error) {
    console.error("Error checking name existence:", error);
    return false;
  }
}
