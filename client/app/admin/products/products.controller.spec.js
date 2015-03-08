'use strict';

describe('Controller: ProductsController', function () {

  // load the controller's module
  beforeEach(module('sendoApp'));

  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    // Given
    var products = [ {
      title: "Product ",
      description: "Product 1 Description",
      page_title: "Product 1 Page Title",
      meta_description: "Product 1 Meta Description"
    }, {
      title: "Product 2",
      description: "Product 2 Description",
      page_title: "Product 2 Page Title",
      meta_description: "Product 2 Meta Description"
    } ];

    this.$httpBackend = _$httpBackend_;
    this.$httpBackend
      .expectGET('/api/products')
      .respond({
        current_page: 1,
        total_pages: 1,
        products: products
      });

    this.$scope = $rootScope.$new();
    this.ProductsController = $controller('ProductsController', {
      $scope: this.$scope
    });
  }));

  describe( "Initialize", function() {
    it('page title should set to "Sendo | Products"', function() {
      expect(this.$scope.$parent.page_title).toBe("Sendo | Products");
    });

    it('should attach a list of products and correct product information to the scope', function () {
      this.$httpBackend.flush();
      expect(this.$scope.products.length).toBe(2);
      expect(this.$scope.current_page).toBe(1);
      expect(this.$scope.no_of_pages).toBe(1);
    });
  });
});
