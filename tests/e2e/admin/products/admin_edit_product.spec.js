'use strict';

describe('Admin Add Product Page View', function() {

  // Edit Product
  describe("Edit Product", function() {
    beforeEach(function() {
      this._edit_product_page = require('./admin_edit_product.po.js');
      this._edit_product_page.visit_by_click_product(0);
    });

    describe("Page Initialize", function() {
      it('product details should be populated correctly', function() {
        // page title should be "Sendo | Edit Product"
        expect(browser.getTitle()).toEqual('Sendo | Edit Product');

        // should include "Products > Add Product" admin page header
        expect(this._edit_product_page.page_title_el.getText()).toBe("Products > Edit Product > Product 001");

        // should contain "Products" link
        expect(this._edit_product_page.pageTitleLinkEl.isDisplayed()).toBe(true);

        // should contain Title field
        expect(this._edit_product_page.titleFieldEl.isDisplayed()).toBe(true);
        expect(this._edit_product_page.titleFieldEl.getAttribute('value')).toBe("Product 001");

        // should contain Description field
        expect(this._edit_product_page.descriptionFieldEl.isDisplayed()).toBe(true);
        expect(this._edit_product_page.descriptionFieldEl.getAttribute('value')).toBe("Product Description 001");

        // should contain Page Title field
        expect(this._edit_product_page.pageTitleInputFieldEl.isDisplayed()).toBe(true);
        expect(this._edit_product_page.pageTitleInputFieldEl.getAttribute('value')).toBe("Product Page Title 001");

        // should contain Meta Description field
        expect(this._edit_product_page.metaDescriptionInputFieldEl.isDisplayed()).toBe(true);
        expect(this._edit_product_page.metaDescriptionInputFieldEl.getAttribute('value')).toBe("Product Meta Description 001");

        // should contain Save button
        expect(this._edit_product_page.saveButtonEl.isDisplayed()).toBe(true);
      });
    });
  });
});
