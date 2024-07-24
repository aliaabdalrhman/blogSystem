import { Router } from 'express'
import blogModel from '../../../DB/model/blog.model.js';
import jwt from 'jsonwebtoken';

const app = Router();

// Add blog   => Only an admin can add a blog
app.post('/', async (req, res) => {
    try {
        const { token } = req.headers;
        const decoded = jwt.verify(token, 'alia');
        if (decoded.role != 'admin') {
            res.status(401).json({ message: "not authonticated user " });
        }
        else {
            const { title, description, category } = req.body;
            const userId = decoded.id;
            const blog = await blogModel.create({ title, description, category, userId });
            return res.status(201).json({ message: "success", blog });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "error", error });
    }
})

// Get all blogs   => Any user can get all blogs
app.get('/', async (req, res) => {
    try {
        const blogs = await blogModel.findAll();
        return res.status(200).json({ message: "success", blogs });
    }
    catch (error) {
        return res.status(500).json({ message: "error", error });
    }
})

// Delete blog   => Only an admin can delete a blog
app.delete('/:id', async (req, res) => {
    try {
        const { token } = req.headers;
        const decoded = jwt.verify(token, 'alia');
        if (decoded.role != 'admin') {
            res.status(401).json({ message: "not authonticated user " });
        } else {
            const { id } = req.params;
            const blog = await blogModel.destroy({
                where: {
                    id: id
                }
            });
            if (!blog) {
                return res.status(404).json({ message: "blog not found" })
            }
            return res.status(200).json({ message: "success" });
        }


    }
    catch (error) {
        return res.status(500).json({ message: "error", error });
    }

})

// Update blog   => Only an admin can update a blog
app.put('/:id', async (req, res) => {
    try {
        const { token } = req.headers;
        const decoded = jwt.verify(token, 'alia');
        if (decoded.role != 'admin') {
            res.status(401).json({ message: "not authonticated user " });
        }
        else {
            const { id } = req.params;
            const { description, category } = req.body;
            const blog = await blogModel.update(   // update => return array 
                {
                    description: description,
                    category: category
                },
                {
                    where: {
                        id: id
                    }
                });
            if (!blog[0]) {   // if (!user[0] !=0 ) or (user[0] == 0)           
                return res.status(404).json({ message: "blog not found" })
            }
            return res.status(200).json({ message: "success" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "error", error });
    }
})
export default app;