import mysql from "mysql";
import { Sequelize, DataTypes } from "sequelize";
import { genSalt, hash } from "bcrypt";
// Créez une instance de Sequelize
const sequelize = new Sequelize("chat-app", "admin", "Admin97470_@", {
  host: "localhost",
  dialect: "mysql",
});

// Définir le modèle User
const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profileSetup: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Hachage du mot de passe avant de sauvegarder l'utilisateur
User.beforeCreate(async (user) => {
  const salt = await genSalt();
  user.password = await hash(user.password, salt);
});

// Synchroniser le modèle avec la base de données
(async () => {
  try {
    await sequelize.sync();
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default User;
