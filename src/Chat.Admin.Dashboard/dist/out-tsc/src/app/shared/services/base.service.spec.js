"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var base_service_1 = require("./base.service");
describe('BaseService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [base_service_1.BaseService]
        });
    });
    it('should be created', testing_1.inject([base_service_1.BaseService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=base.service.spec.js.map