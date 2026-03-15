import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "PMS",
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log("Connection failed");
      console.log(err);
    });
};
