export default (sequelize, DataTypes) => {
  const Registration = sequelize.define('Registration', {
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
    state: {
      type: DataTypes.INTEGER,
    },
    lga: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
      onUpdate: sequelize.NOW,
    },
  });

  return Registration;
};
