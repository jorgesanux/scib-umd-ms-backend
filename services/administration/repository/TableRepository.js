import BaseRepository from "./BaseRepository.js";

import Mesa from "../model/mesa.js";

class TableRepository extends BaseRepository{
    constructor(){
        super(Mesa);
    }
}

export default TableRepository;