const User = require("../model/userSchema");

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(400).json({
        message: "Both email and password are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = password === user?.password;
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Login successful",
      success: true,
      user: user,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      message: "An unexpected error occurred during login",
      success: false,
      error: error.message,
    });
  }
};

module.exports = { handleLogin };
