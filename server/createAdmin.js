const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

// 🔥 IMPORTANT: use your Render/MongoDB Atlas URL here
mongoose.connect("mongodb://mokshada23:mokshal1023@ac-xamcnec-shard-00-00.wopsglz.mongodb.net:27017,ac-xamcnec-shard-00-01.wopsglz.mongodb.net:27017,ac-xamcnec-shard-00-02.wopsglz.mongodb.net:27017/?ssl=true&replicaSet=atlas-3cxlo7-shard-0&authSource=admin&appName=Cluster0");

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await Admin.create({
    email: "admin@shopzone.com",
    password: hashedPassword
  });

  console.log("Admin created in LIVE DB 👑");
  mongoose.disconnect();
};

createAdmin();