const apiRoutes = require("express").Router()
const userController = require ("../controllers/userController")
const taskController = require ("../controllers/taskControllers")
const cors = require("cors")

apiRoutes.use(cors())

apiRoutes.post("/createUser",userController.createUser);
apiRoutes.post("/authenticateUser",userController.authenticateUser);
apiRoutes.get("/allUser",userController.getAllUsers);
apiRoutes.post("/authenticateToken",userController.authenticateToken);

apiRoutes.post("/createTask" , taskController.createTask);
apiRoutes.post("/updateTask" , taskController.updateTask);
apiRoutes.post("/deleteTask" , taskController.deleteTask);
apiRoutes.post("/getAllTasks" , taskController.getAllTasks);


module.exports = apiRoutes;