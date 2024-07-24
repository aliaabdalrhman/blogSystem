import { Router } from 'express'
import userModel from '../../../DB/model/user.model.js';
import jwt from 'jsonwebtoken';

const app = Router();

// Get all users   => Any user can get all users
app.get('/', async (req, res) => {
    try {
        const users = await userModel.findAll({
            attributes: ['id', 'name', 'email', 'role']
        });

        return res.status(200).json({ message: "success", users });
    }
    catch (error) {
        return res.status(500).json({ message: "error", error });
    }
})

// Delete blog   => Only an admin can delete a user
app.delete('/:id', async (req, res) => {
    try {
        const { token } = req.headers;
        const decoded = jwt.verify(token, 'alia');
        if (decoded.role != 'admin') {
            res.status(401).json({ message: "not authonticated user " });
        } else {
            const { id } = req.params;
            const user = await userModel.destroy({
                where: {
                    id: id
                }
            });
            if (!user) {
                return res.status(404).json({ message: "user not found" })
            }
            return res.status(200).json({ message: "success" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "error", error });
    }

})

// update user   => Any user can update a user
app.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;
        const user = await userModel.update(   // update => return array 
            {
                name: name,
                email: email,
                role: role,
            },
            {
                where: {
                    id: id
                }
            });
        if (!user[0]) {   // if (!user[0] !=0 ) or (user[0] == 0)          
            return res.status(404).json({ message: "user not found" })
        }
        return res.status(200).json({ message: "success" });
    }
    catch (error) {
        return res.status(500).json({ message: "error", error });
    }
})

export default app;