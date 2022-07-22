const { Router } = require("express"); //import Router method only from express
const { signUp, login, updateUser, deleteUser } = require("./controllers"); //import only signUp from controllers file
const { hashPass, comparePass, tokenCheck } = require("../middleware");
const userRouter = Router(); //create a router that can have endpoints added to it

userRouter.post("/user", hashPass, signUp); //defining a post request on /user path, that calls the signUp controller
userRouter.post("/login", comparePass, login); //defining a post request on /login path, that calls the login controller
userRouter.get("/user", tokenCheck, login); //defining a post request on /token path, that calls both token and login
userRouter.patch("/user", hashPass, updateUser);
userRouter.delete("/user", tokenCheck, deleteUser);

module.exports = userRouter;