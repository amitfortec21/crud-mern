import userDB from "../model/userSchema.js";

// [-----LOGIC: READ USERS-----]
export const getUsers = (req, res) => {
    if(req.query.id){
        //find user by id
        const id = req.query.id;
        userDB.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: "Not found user with id" + id});
            }else{
                res.send(data);
            }
        })
        .catch(err => {
            res.send("Error retrieving user with id");
        })
    }else{
        //find all users
        userDB.find()
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            res.status(500).send({message: "Error occured while retrieving user information"});
        })
    }
};

// [-----LOGIC: CREATE USER-----]
export const createUser = (req, res) => { 
    //create new user
    const users = new userDB({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        city: req.body.city,
        image: req.file.filename,
    })

    //save user
    users.save()
    .then(data => res.send("User Added Successfully"))
    .catch(err => res.send("Some error occurred while creating user"))
}

// [-----LOGIC: UPDATE USER-----]
export const updateUser = (req, res) => {
    const id = req.params.id;
    userDB.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        city: req.body.city,
        image: req.file.filename,
    })
    .then(data => {
        if(!data){
            res.send("User not found");
        }else{
            res.send("User Updated Successfully")
        }
    })
    .catch( err => {
        res.send("Error while updating the user")
    })
};

// [-----LOGIC: DELETE USER-----]
export const deleteUser = (req, res) => {
    const id = req.params.id;
    userDB.findByIdAndDelete(id,req.body)
    .then(data => {
        if(!data){
            res.send("User not found");
        }else{
            res.send("User Deleted Successfully")
        }
    })
    .catch( err => {
        res.send("Error while deleting the user")
    })
};