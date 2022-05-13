import BaseRepository from "./BaseRepository.js";

import User from "../model/user.js";

class UserRepository extends BaseRepository{
    constructor(){
        super(User);
    }

}

export default UserRepository;