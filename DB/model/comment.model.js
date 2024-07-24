import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import blogModel from "./blog.model.js";
import userModel from "./user.model.js";

const commentModel = sequelize.define('Comment', {
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: blogModel,
            key: 'id'
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: userModel,
            key: 'id'
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

commentModel.belongsTo(blogModel, { foreignKey: 'blogId'});
commentModel.belongsTo(userModel, { foreignKey: 'userId'});
blogModel.hasMany(commentModel, { foreignKey: 'blogId' });
userModel.hasMany(commentModel, { foreignKey: 'userId'  });

export default commentModel;
