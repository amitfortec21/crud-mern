import express from "express";
import multer from "multer";
import { getUsers, deleteUser, updateUser, createUser } from "../controllers/userController.js"

// image upload code start
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});
const upload = multer({storage: storage});
// image upload code end

const userRouter = express.Router();

userRouter.get("/users", getUsers);     //read
userRouter.post("/user", upload.single('image'), createUser);   //create
userRouter.put("/user/:id", upload.single('image'), updateUser);   //update
userRouter.delete("/user/:id", deleteUser);   //delete

export default userRouter;