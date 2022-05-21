import TableRepository from "../repository/TableRepository.js";
import BaseController from "./BaseController.js";

class TableController extends BaseController {
    constructor(){
        super(new TableRepository());
    }
}

export default TableController;