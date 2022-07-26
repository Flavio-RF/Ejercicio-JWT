const mongoose = require("mongoose");
const seeders = require("./seeders");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);

    mongoose.connection.on("error", (error) => {
      console.log(
        "Error mientras se tenía conexión con la base de datos.",
        error
      );
    });

    console.log("conect to DB")
    await seeders();
  } catch (error) {
    console.error("Error al iniciar conexión con la base de datos.", error);
  }

};
