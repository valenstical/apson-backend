import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    sex: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue(
          'password',
          bcrypt.hashSync(value, process.env.SECRET_CODE),
        );
      },
    },
    image: {
      type: DataTypes.STRING,
    },
    isConfirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      onUpdate: sequelize.NOW,
    },
  });
  Member.associate = (models) => {
    // associations can be defined here
  };
  return Member;
};
