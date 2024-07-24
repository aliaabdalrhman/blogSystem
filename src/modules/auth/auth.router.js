import { Router } from 'express';
import userModel from '../../../DB/model/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const app = Router();

// register
app.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        var passwordHashed = bcrypt.hashSync(password, 8);
        const user = await userModel.create({ name, email, password: passwordHashed });
        return res.status(201).json({ message: "success", user });
    }
    catch (error) {
        return res.status(500).json({ message: "error", error });
    }
})

// login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            return res.status(404).json({ message: "email not found" });
        };

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(404).json({ message: "invalid password" });
        }

        var token = await jwt.sign({ id: user.id, username: user.name, role: user.role }, 'alia');
        return res.status(200).json({ message: "success", token, user });
    }
    catch (error) {
        return res.status(500).json({ message: "error", error });
    }

})



export default app;
