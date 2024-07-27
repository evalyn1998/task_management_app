const apiRoutes = require("express").Router()
const userController = require ("../controllers/userController")
const cors = require("cors")

apiRoutes.use(cors())

apiRoutes.post("/createUser",userController.createUser);
apiRoutes.post("/authenticateUser",userController.authenticateUser);
apiRoutes.get("/allUser",userController.getAllUsers);

module.exports = apiRoutes;