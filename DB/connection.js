import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('freedb_BlogSystem', 'freedb_aliaa', 'd!g5F4RyqF*@wVy', {
    host: 'sql.freedb.tech',
    port:3306,
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
