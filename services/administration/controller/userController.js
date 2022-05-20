import BaseController from "./BaseController.js";

import UserRepository from "../repository/UserRepository.js";

class UserController extends BaseController{
    constructor(){
        super(new UserRepository());
    }
}

export default UserController;