import userRouter from './modules/user/user.router.js'
import blogRouter from './modules/blog/blog.router.js'
import authRouter from './modules/auth/auth.router.js'
import commentRouter from './modules/comment/comment.router.js'
import connectDb from '../DB/connection.js'
import cors from 'cors';

export const initApp = (app, express) => {
    connectDb();
    app.use(cors());
    app.use(express.json());
    app.use('/users', userRouter);
    app.use('/auth', authRouter);
    app.use('/blogs', blogRouter);
    app.use('/comment', commentRouter);
    app.get('*', (req, res) => {
        return res.status(404).json({ message: "page not found" });
    })
}