'use strict';

describe('Controller: AddProductController', function () {

  // load the controller's module
  beforeEach(module('sendoApp'));

  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    // Given
    this.$scope = $rootScope.$new();
    this.AddProductController = $controller('AddProductController', {
      $scope: this.$scope
    });
  }));

  describe( "Initialize", function() {
    it('page title should set to "Sendo | Add Product"', function() {
      expect(this.$scope.$parent.page_title).toBe("Sendo | Add Product");
    });

    it('should attach a list of products to the scope', function () {
      expect(this.$scope.product).toEqual({ images: [] });
    });
  });
});
