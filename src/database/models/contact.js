export default (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    subject: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.STRING,
    },
    receiver: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
      onUpdate: sequelize.NOW,
    },
  });

  return Contact;
};
