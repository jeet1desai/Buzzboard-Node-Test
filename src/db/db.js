import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose
      .connect(process.env.DB_NAME, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => {
        console.log("DD connection successful");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.error("Something went wrong");
    console.log(err);
  }
}
