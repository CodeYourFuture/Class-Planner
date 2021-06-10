const PASSWORD = process.env.PASSWORD;

exports.validatePassword = (req, res) => {
  const { password } = req.body;
  if (password === PASSWORD) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
};
