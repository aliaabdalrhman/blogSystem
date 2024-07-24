import { Router } from "express";
import commentModel from '../../../DB/model/comment.model.js'
import jwt from 'jsonwebtoken';

const app = Router();

// Add comment   => Any user can add a comment
app.post('/:blogId', async (req, res) => {
    try {
        const { token } = req.headers;
        const decoded = jwt.verify(token, 'alia');
        const { description } = req.body;
        const { blogId } = req.params;
        const userId = decoded.id;
        const comment = await commentModel.create({ userId, blogId, description });
        return res.status(201).json({ message: "success", comment });
    }
    catch (error) {
        return res.status(500).json({ message: "error", error });
    }
})

// Get all comments   => Any user can view all comments
app.get('/', async (req, res) => {
    try {
        const comments = await commentModel.findAll();
        return res.status(200).json({ message: "success", comments });
    }
    catch (error) {
        return res.status(500).json({ message: "error", error });
    }
})

// Delete comment   => Only an admin can delete a comment
app.delete('/:id', async (req, res) => {
    try {
        const { token } = req.headers;
        const decoded = jwt.verify(token, 'alia');
        if (decoded.role != 'admin') {
            res.status(401).json({ message: "not authonticated user " });
        } else {
            const { id } = req.params;
            const comment = await commentModel.destroy({
                where: {
                    id: id
                }
            });
            if (!comment) {
                return res.status(404).json({ message: "comment not found" })
            }
            return res.status(200).json({ message: "success" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "error", error });
    }

})

// Update comment   => Only the user who wrote the comment can update it
app.put('/:id', async (req, res) => {
    try {
        const { token } = req.headers;
        const decoded = jwt.verify(token, 'alia');
        const userId = decoded.id;

        // Find the comment to verify ownership
        const comment = await commentModel.findOne({
            where: { id: req.params.id }
        });

        if (!comment) {
            return res.status(404).json({ message: "comment not found" });
        }

        // Check if the user is the owner of the comment
        if (comment.userId !== userId) {
            return res.status(401).json({ message: "not authorized to update this comment" });
        }

        // Update the comment
        const updated = await commentModel.update(
            { description: req.body.description },
            { where: { id: req.params.id } }
        );

        if (updated[0] === 0) {
            return res.status(404).json({ message: "comment not found" });
        }

        return res.status(200).json({ message: "success" });

    } catch (error) {
        return res.status(500).json({ message: "error", error });
    }
});

export default app;