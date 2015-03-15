'use strict';

describe('Controller: EditProductController', function () {

  // load the controller's module
  beforeEach(module('sendoApp'));

  describe( "Add Product Initialize", function() {
    beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
      // Given
      this.$scope = $rootScope.$new();
      $controller('EditProductController', {
        $scope: this.$scope
      });
    }));

    it('page title should set to "Sendo | Add Product"', function() {
      expect(this.$scope.$parent.page_title).toBe("Sendo | Add Product");
    });

    it('should attach a list of products to the scope', function () {
      expect(this.$scope.product).toEqual({ images: [] });
    });
  });

  describe( "Edit Product Initialize", function() {
    beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
      // Given
      var product_id = "product_1";
      var product = {
        title: "Product 1",
        description: "Product 1 Description",
        page_title: "Product 1 Page Title",
        meta_description: "Product 1 Meta Description"
      };
      this.$httpBackend = _$httpBackend_;
      this.$httpBackend
        .expectGET('/admin/api/products/' + product_id)
        .respond(product);

      this.$scope = $rootScope.$new();
      $controller('EditProductController', {
        $scope: this.$scope,
        $stateParams: { product_id: product_id }
      });
    }));

    it('scope.product.id should be set', function() {
      expect(this.$scope.product.id).toBe("product_1");
    });

    it('product details should be assigned to scope.product', function() {
      this.$httpBackend.flush();
      expect(this.$scope.product.title).toEqual("Product 1");
      expect(this.$scope.product.description).toEqual("Product 1 Description");
      expect(this.$scope.product.page_title).toEqual("Product 1 Page Title");
      expect(this.$scope.product.meta_description).toEqual("Product 1 Meta Description");
    });
  });
});
