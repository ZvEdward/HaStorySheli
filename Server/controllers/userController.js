const Users = require("../models/userModel");
const Books = require("../models/bookModel");
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
        return res.status(400).json("username already exists");
    }else{
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await Users.create({
          username,
          email,
          password: hashedPassword,
        });
        res.status(201).json({
            status: "success",
            message: "User has been created",
        });
    }




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
      text:` Hey, \nPlease click the following link to verify your email:\n ${process.env.SERVER_ADDRESS}/users/verify/${verificationToken}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email verification sent:', info);
  } catch (error) {
    console.error('Email verification error:', error);
  }
}


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


// exports.editUserById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const result = await Users.findByIdAndUpdate(id, {
//       username: req.body?.username,
//       password: req.body?.password,
//       email: req.body?.email,
//     });

//     if (result) {
//       res.send("User edited successfully.");
//     } else {
//       res.send("User not found or not edited.");
//     }
//   } catch (error) {
//     console.error("Error editing User:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// exports.deleteById = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const result = await Users.deleteOne({ _id: id });

//     if (result.deletedCount === 1) {
//       return res.send("User deleted successfully.");
//     } else {
//       return res.send("User not found or not deleted.");
//     }
//   } catch (error) {
//     console.error("Error deleting User:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };

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


exports.toggleLikedBook = async (req, res) => {
  try {
      const { bookId, userId } = req.body;

      const userExists = await Users.exists({ _id: userId });
      const bookExists = await Books.exists({ _id: bookId });
      console.log(userExists, bookExists);
      if (!userExists || !bookExists) {
          return res.status(404).send({ error: 'User or Book not found' });
      }

      const user = await Users.findById(userId);
       const book = await Books.findById(bookId);
      if (user.likedBooks.includes(bookId)) {
          // If already liked, remove it from likedBooks and decrement likes
          await Users.findByIdAndUpdate(userId, {
              $pull: { likedBooks: bookId },
          });

          await Books.findByIdAndUpdate(bookId, {
              $inc: { likes: -1 },
          });

          res.status(200).send({ message: 'Book removed from likedBooks', likes: book.likes - 1 });
      } else {
          // If not liked, add it to likedBooks and increment likes
          await Users.findByIdAndUpdate(userId, {
              $push: { likedBooks: bookId },
          });

          await Books.findByIdAndUpdate(bookId, {
              $inc: { likes: 1 },
          });

          res.status(200).send({ message: 'Book added to likedBooks', likes: book.likes + 1 });
      }
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
  }
};