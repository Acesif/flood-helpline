const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: decoded.userId,
      contactname: decoded.contactname,
      phonenumber: decoded.phonenumber,
    };
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};
