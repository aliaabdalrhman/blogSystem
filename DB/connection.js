import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('freedb_blogSystem9', 'freedb_Aliaa', 'G@Ev3fhe9a%j9#2', {
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
