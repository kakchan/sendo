'use strict';

var cwd = process.cwd();

describe('Admin Add Product Page View', function() {
  describe( "Add Product", function() {
    beforeEach(function() {
      this._edit_product_page = require('./admin_edit_product.po.js');
      this._edit_product_page.visit_by_clicking_add_product();

      this._products_page = require('./admin_products.po.js');
    });

    it('initial elements should display correctly', function() {
      // page title should be "Sendo | Add Product"
      expect(browser.getTitle()).toEqual('Sendo | Add Product');

      // should include "Products > Add Product" admin page header
      expect(this._edit_product_page.pageTitleEl.getText()).toBe("Products > Add Product");

      // should contain "Products" link
      expect(this._edit_product_page.pageTitleLinkEl.isDisplayed()).toBe(true);

      // should contain Title field
      expect(this._edit_product_page.titleFieldEl.isDisplayed()).toBe(true);

      // should contain Description field
      expect(this._edit_product_page.descriptionFieldEl.isDisplayed()).toBe(true);

      // should contain Page Title field
      expect(this._edit_product_page.pageTitleFieldEl.isDisplayed()).toBe(true);

      // should contain Meta Description field
      expect(this._edit_product_page.metaDescriptionFieldEl.isDisplayed()).toBe(true);

      // should contain Save button
      expect(this._edit_product_page.saveButtonEl.isDisplayed()).toBe(true);
    });

    it('should redirect back to "Products" page after "Products" link is clicked', function() {
      expect(browser.getTitle()).toEqual('Sendo | Add Product');
      this._edit_product_page.pageTitleLinkEl.click();
      expect(browser.getTitle()).toEqual('Sendo | Products');
    });

    it('should create a new product when "Save" button is clicked', function() {
      this._edit_product_page.titleFieldEl.sendKeys("Product 1");
      this._edit_product_page.descriptionFieldEl.sendKeys("Product Description 1");
      this._edit_product_page.pageTitleFieldEl.sendKeys("Product 1 - Page Title");
      this._edit_product_page.metaDescriptionFieldEl.sendKeys("Product 1 - Meta Description");

      this._edit_product_page.saveButtonEl.click();

      // product should be saved

      this._edit_product_page.pageTitleLinkEl.click();
      expect(browser.getTitle()).toEqual('Sendo | Products');
      expect(this._products_page.productRowEls.count()).toBe(this._products_page.product_count+1);
    });

    it('should be able to upload photo', function() {
      expect(this._edit_product_page.photoThumbnailContainerEl.isDisplayed()).toBe(true);
      expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css("img.photo-thumbnail-image")).count()).toBe(0);

      this._edit_product_page.uploadFileInputFieldEl.sendKeys(cwd + "/e2e/test_files/products/nikon_camera_1.JPG");
      expect(this._edit_product_page.photoThumbnailContainerEl.isDisplayed()).toBe(true);
      expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css("img.photo-thumbnail-image")).count()).toBe(1);
      expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css('.photo-thumbnail-trash')).count()).toBe(1);

      this._edit_product_page.uploadFileInputFieldEl.sendKeys(cwd + "/e2e/test_files/products/nikon_camera_2.jpeg");
      expect(this._edit_product_page.photoThumbnailContainerEl.isDisplayed()).toBe(true);
      expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css("img.photo-thumbnail-image")).count()).toBe(2);
      expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css('.photo-thumbnail-trash')).count()).toBe(2);
    });

    it('should delete photo when trash icon is clicked', function() {
      this._edit_product_page.uploadFileInputFieldEl.sendKeys(cwd + "/e2e/test_files/products/nikon_camera_1.JPG");
      expect(this._edit_product_page.photoThumbnailContainerEl.isDisplayed()).toBe(true);
      expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css("img.photo-thumbnail-image")).count()).toBe(1);
      expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css('.photo-thumbnail-trash')).count()).toBe(1);

      this._edit_product_page.uploadFileInputFieldEl.sendKeys(cwd + "/e2e/test_files/products/nikon_camera_2.jpeg");
      expect(this._edit_product_page.photoThumbnailContainerEl.isDisplayed()).toBe(true);
      expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css("img.photo-thumbnail-image")).count()).toBe(2);
      expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css('.photo-thumbnail-trash')).count()).toBe(2);

      this._edit_product_page.photoThumbnailContainerEl.element(by.css('.photo-thumbnail-trash')).click();
      expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css("img.photo-thumbnail-image")).count()).toBe(1);
      expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css('.photo-thumbnail-trash')).count()).toBe(1);

      this._edit_product_page.photoThumbnailContainerEl.element(by.css('.photo-thumbnail-trash')).click();
      expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css("img.photo-thumbnail-image")).count()).toBe(0);
      expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css('.photo-thumbnail-trash')).count()).toBe(0);
    });
  });

  describe("Edit Product", function() {
    beforeEach(function() {
      this._edit_product_page = require('./admin_edit_product.po.js');
      this._edit_product_page.visit_by_click_product(0);
    });

    iit('product details should be populated correctly', function() {
      // page title should be "Sendo | Add Product"
      expect(browser.getTitle()).toEqual('Sendo | Add Product');

      // should include "Products > Add Product" admin page header
      expect(this._edit_product_page.pageTitleEl.getText()).toBe("Products > Add Product");

      // should contain "Products" link
      expect(this._edit_product_page.pageTitleLinkEl.isDisplayed()).toBe(true);

      // should contain Title field
      expect(this._edit_product_page.titleFieldEl.isDisplayed()).toBe(true);
      expect(this._edit_product_page.titleFieldEl.getAttribute('value')).toBe("Product 1");

      // should contain Description field
      expect(this._edit_product_page.descriptionFieldEl.isDisplayed()).toBe(true);
      expect(this._edit_product_page.descriptionFieldEl.getAttribute('value')).toBe("Product Description 1");

      // should contain Page Title field
      expect(this._edit_product_page.pageTitleFieldEl.isDisplayed()).toBe(true);
      expect(this._edit_product_page.pageTitleFieldEl.getAttribute('value')).toBe("Product Page Title 1");

      // should contain Meta Description field
      expect(this._edit_product_page.metaDescriptionFieldEl.isDisplayed()).toBe(true);
      expect(this._edit_product_page.metaDescriptionFieldEl.getAttribute('value')).toBe("Product Meta Description 1");

      // should contain Save button
      expect(this._edit_product_page.saveButtonEl.isDisplayed()).toBe(true);
    });
  });
});
