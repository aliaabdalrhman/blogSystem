import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('blogproject', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export const connectDb = async () => {
    try {
        return await sequelize.sync({ alter: true });
    }
    catch (error) {
        console.log('Error connecting to database : ', error);
    }
}
export default connectDb;
