import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import userModel from "./user.model.js";

const blogModel = sequelize.define('Blog', {
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'test',
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: userModel,
            key: 'id'
        }
    }
});

blogModel.belongsTo(userModel, { foreignKey: 'userId' });
userModel.hasMany(blogModel, { foreignKey: 'userId' });

export default blogModel;
