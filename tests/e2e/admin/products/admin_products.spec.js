'use strict';

var sample_products = require("../../../../server/sample_data/sample_products");

describe('Admin Products Page View', function() {
  beforeEach(function() {
    this._products_page = require('./admin_products.po.js');
    this._products_page.visit();
  });

  describe("Initialize", function() {
    it('should display correctly', function() {
      // page title should be "Sendo | Products"
      expect(browser.getTitle()).toEqual('Sendo | Products');

      // should include "Products" admin page header
      var products_page = this._products_page;
      expect(products_page.page_title_el.getText()).toBe("Products");
    });
  });

  describe("Pagination", function() {
    describe( "Initialize", function() {
      it("should display correctly", function() {
        var products_page = this._products_page;

        // pagination element should appear
        expect(products_page.pagination_el.isDisplayed()).toBe( true );

        // page 1 should be active
        var pageNoEls = products_page.pagination_el.all(by.css(".sd-pagination-page-no"));
        var firstPageNoEl = pageNoEls.get(0);
        var secondPageNoEl = pageNoEls.get(1);

        expect(firstPageNoEl.getAttribute("class")).toContain( "active" );
        expect(secondPageNoEl.getAttribute("class")).not.toContain( "active" );
      });

      it("should move to the page that user selected", function() {
        var products_page = this._products_page;

        // Given - Pagination
        var page_no_els = products_page.pagination_el.all(by.css(".sd-pagination-page-no"));
        var first_page_no_el = page_no_els.get(0);
        var second_page_no_el = page_no_els.get(1);
        expect(first_page_no_el.getAttribute("class")).toContain( "active" );
        expect(second_page_no_el.getAttribute("class")).not.toContain( "active" );

        // Given - Products Result
        var product_list_row_els = products_page.result_list_container_el.all( by.css( ".product-list-row" ) );
        expect( product_list_row_els.count() ).toEqual( 20 );
        product_list_row_els.each( function( product_list_row_el, index ) {
          var image_el = product_list_row_el.element(by.css(".product-image"));
          var title_el = product_list_row_el.element(by.css(".product-list-product-title"));
          var description_el = product_list_row_el.element(by.css('.product-list-product-description'));
          expect( image_el.isDisplayed() ).toEqual( true );
          if (index === 0) {
            // display feature image if there is one
            expect( image_el.getAttribute("src") ).toMatch( "/uploads/photos/products/nikon_camera_1.JPG" );
          } else {
            // if no images in the product, should display no_image image
            expect( image_el.getAttribute("src") ).toMatch( "/assets/images/no_image.png" );
          }
          expect( title_el.getText() ).toEqual( sample_products[ index ].title );
          expect( description_el.getText() ).toEqual( sample_products[ index ].description );
        } );

        // When - Pagination
        second_page_no_el.click();

        // Then
        expect(first_page_no_el.getAttribute("class")).not.toContain( "active" );
        expect(second_page_no_el.getAttribute("class")).toContain( "active" );

        // Then - Products Result
        expect( product_list_row_els.count() ).toEqual( 20 );
        product_list_row_els.each( function( product_list_row_el, index ) {
          var product_index = index + 20;
          var title_el = product_list_row_el.element(by.css(".product-list-product-title"));
          var description_el = product_list_row_el.element(by.css('.product-list-product-description'));
          expect( title_el.getText() ).toEqual( sample_products[ product_index ].title );
          expect( description_el.getText() ).toEqual( sample_products[ product_index ].description );
        } );
      });

      it("should Next/Prev 10 Page Click", function() {
        var products_page = this._products_page;

        // Given - Pagination
        var page_no_els = products_page.pagination_el.all(by.css(".sd-pagination-page-no"));
        var first_page_no_el = page_no_els.get(0);
        expect(first_page_no_el.getAttribute("class")).toContain( "active" );

        // Given - Products Result
        var product_list_row_els = products_page.result_list_container_el.all( by.css( ".product-list-row" ) );
        expect( product_list_row_els.count() ).toEqual( 20 );
        expect( products_page.pagination_prev_ten_page_disabled_el.isDisplayed() ).toBe( true );
        expect( products_page.pagination_next_ten_page_disabled_el.isDisplayed() ).toBe( false );
        product_list_row_els.each( function( product_list_row_el, index ) {
          var title_el = product_list_row_el.element(by.css(".product-list-product-title"));
          var description_el = product_list_row_el.element(by.css('.product-list-product-description'));
          expect( title_el.getText() ).toEqual( sample_products[ index ].title );
          expect( description_el.getText() ).toEqual( sample_products[ index ].description );
        } );

        // When - Next Ten Page Click
        products_page.pagination_next_ten_page_el.click();

        // Then
        expect( products_page.pagination_prev_ten_page_disabled_el.isDisplayed() ).toBe( false );
        expect( products_page.pagination_next_ten_page_disabled_el.isDisplayed() ).toBe( true );
        expect( product_list_row_els.count() ).toEqual( 5 );
        product_list_row_els.each( function( product_list_row_el, index ) {
          var product_index = index + 200;
          var title_el = product_list_row_el.element(by.css(".product-list-product-title"));
          var description_el = product_list_row_el.element(by.css('.product-list-product-description'));
          expect( title_el.getText() ).toEqual( sample_products[ product_index ].title );
          expect( description_el.getText() ).toEqual( sample_products[ product_index ].description );
        } );

        // When - Prev Ten Page Click
        products_page.pagination_prev_ten_page_el.click();

        // Then
        expect( product_list_row_els.count() ).toEqual( 20 );
        expect( products_page.pagination_prev_ten_page_disabled_el.isDisplayed() ).toBe( true );
        expect( products_page.pagination_next_ten_page_disabled_el.isDisplayed() ).toBe( false );
        product_list_row_els.each( function( product_list_row_el, index ) {
          var title_el = product_list_row_el.element(by.css(".product-list-product-title"));
          var description_el = product_list_row_el.element(by.css('.product-list-product-description'));
          expect( title_el.getText() ).toEqual( sample_products[ index ].title );
          expect( description_el.getText() ).toEqual( sample_products[ index ].description );
        } );
      });
    });
  });
});
