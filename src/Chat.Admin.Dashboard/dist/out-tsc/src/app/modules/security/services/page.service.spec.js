"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var page_service_1 = require("./page.service");
describe('PageService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [page_service_1.PageService]
        });
    });
    it('should be created', testing_1.inject([page_service_1.PageService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=page.service.spec.js.map