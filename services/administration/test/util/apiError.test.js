import assert from "assert";

import APIError from "../../src/util/apiError.js";

describe("APIError", function(){
    it('Debe generar una isntancia de Error.', function(){
        assert.equal(new APIError(500, "Test error", "T123") instanceof Error, true);
    });

    it("Debe generar un objeto plano.", function(){
        assert.equal(JSON.stringify(new APIError(500, "Test error", "T123").toJSON()), JSON.stringify({
            status: 500,
            code: "T123",
            message: "Test error",
            result: null,
            results: []
        }));
    });

    it("Debe retornar el mensaje del error", function(){
        assert.equal(new APIError(500, "Test error", "T123").message, "Test error");
    });

    it("Debe retornar el codigo del error", function(){
        assert.equal(new APIError(500, "Test error", "T123").code, "T123");
    });

    it("Debe retornar el status del error", function(){
        assert.equal(new APIError(500, "Test error", "T123").status, 500);
    });

    it("Debe retornar el nombre de la clase", function(){
        assert.equal(new APIError(500, "Test error", "T123").name, "APIError");
    });
});