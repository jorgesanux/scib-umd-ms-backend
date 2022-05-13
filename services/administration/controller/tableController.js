import TableRepository from "../repository/TableRepository.js";

class TableController {
    tableRepository = new TableRepository();

    async getAllTables(){
        return this.tableRepository.getAll();
    }
}

export default TableController;