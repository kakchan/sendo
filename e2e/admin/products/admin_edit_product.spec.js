'use strict';

var cwd = process.cwd();

describe('Admin Add Product Page View', function() {


  // Add Product
  describe( "Add Product", function() {
    beforeEach(function() {
      this._edit_product_page = require('./admin_edit_product.po.js');
      this._edit_product_page.visit_by_clicking_add_product();

      this._products_page = require('./admin_products.po.js');
    });

    describe("Page Initialize", function() {
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
        expect(this._edit_product_page.pageTitleInputFieldEl.isDisplayed()).toBe(true);

        // should contain Meta Description field
        expect(this._edit_product_page.metaDescriptionInputFieldEl.isDisplayed()).toBe(true);

        // should contain Save button
        expect(this._edit_product_page.saveButtonEl.isDisplayed()).toBe(true);
      });

      it('should redirect back to "Products" page after "Products" link is clicked', function() {
        expect(browser.getTitle()).toEqual('Sendo | Add Product');
        this._edit_product_page.pageTitleLinkEl.click();
        expect(browser.getTitle()).toEqual('Sendo | Products');
      });
    });

    describe( "When 'Save' button is clicked", function() {
      beforeEach( function() {
        this._edit_product_page.titleFieldEl.sendKeys("Product 1");
        expect(this._edit_product_page.productTitleLabel.getText()).toBe( "> Product 1" );

        this._edit_product_page.descriptionFieldEl.sendKeys("Product Description 1");
        this._edit_product_page.pageTitleInputFieldEl.sendKeys("Product 1 - Page Title");
        this._edit_product_page.metaDescriptionInputFieldEl.sendKeys("Product 1 - Meta Description");

        this._edit_product_page.saveButtonEl.click();
      });

      describe( "Save Successfully", function() {
        it("Message Panel should show and display 'Product Saved!'", function() {
          // product should be saved
          expect(this._edit_product_page.messagePanelEl.isDisplayed()).toBe( true );
          expect(this._edit_product_page.messagePanelEl.getText()).toBe("Product Saved!");
        });

        it("should direct users to the edit page", function() {
          // should direct users to the edit page
          expect(browser.getCurrentUrl()).toMatch(/\/admin\/products\/edit/);
          expect(browser.getTitle()).toEqual('Sendo | Edit Product');
        });

        it("should see one more product when going back to the Products page", function() {
          // going back to the Product page, number of products should be incremented by 1
          this._edit_product_page.pageTitleLinkEl.click();
          expect(browser.getTitle()).toEqual('Sendo | Products');
          expect(this._products_page.productRowEls.count()).toBe(this._products_page.product_count+1);
        });
      });
    } );

    describe( "Save Validation", function() {
      it("should display validation message if 'Title' field is empty", function() {
        this._edit_product_page.saveButtonEl.click();

        this._edit_product_page.titleFieldEl.sendKeys("");
        this._edit_product_page.saveButtonEl.click();
        expect(this._edit_product_page.validationMessageEl.isDisplayed()).toBe(true);
        expect(this._edit_product_page.validationMessageEl.getText()).toBe("'Title' field cannot be blank");
      });
    } );

    describe("Page Title and Meta Description Max Length", function() {
      it("Page Title should not over 70 characters", function() {
        // Count Label
        var pageTitleFieldCharacterCountLabelEl = this._edit_product_page.pageTitleFieldCharacterCountLabelEl;
        expect(pageTitleFieldCharacterCountLabelEl.getText()).toBe("( 0 of 70 characters )");

        // Title Input field
        var pageTitleInputFieldEl = this._edit_product_page.pageTitleInputFieldEl;
        pageTitleInputFieldEl.sendKeys("01234567890123456789012345678901234567890123456789012345678901234567891");
        expect(pageTitleInputFieldEl.getAttribute('value')).toBe("0123456789012345678901234567890123456789012345678901234567890123456789");

        // Update Count Label
        expect(pageTitleFieldCharacterCountLabelEl.getText()).toBe("( 70 of 70 characters )");
      });

      it("Meta Description should not over 160 characters", function() {
        // Count Label
        var metaDescriptionFieldCharacterCountLabelEl = this._edit_product_page.metaDescriptionFieldCharacterCountLabelEl;
        expect(metaDescriptionFieldCharacterCountLabelEl.getText()).toBe("( 0 of 160 characters )");

        // Title Input field
        var metaDescriptionInputFieldEl = this._edit_product_page.metaDescriptionInputFieldEl;
        metaDescriptionInputFieldEl.sendKeys("01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567891");
        expect(metaDescriptionInputFieldEl.getAttribute('value')).toBe("0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789");

        // Update Count Label
        expect(metaDescriptionFieldCharacterCountLabelEl.getText()).toBe("( 160 of 160 characters )");
      });
    });

    describe( "Upload Photo", function() {
      it('first uploaded photo will be the default image', function() {
        this._edit_product_page.uploadFileInputFieldEl.sendKeys(cwd + "/e2e/test_files/products/nikon_camera_1.JPG");
        expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css("img.photo-thumbnail-image")).count()).toBe(1);
        expect(this._edit_product_page.photoThumbnailContainerEl
          .all(by.css('.photo-thumbnail'))
          .get(0)
          .element(by.css(".is_default")).isDisplayed()).toBe(true);

        // add one more photo
        this._edit_product_page.uploadFileInputFieldEl.sendKeys(cwd + "/e2e/test_files/products/nikon_camera_2.jpeg");
        expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css("img.photo-thumbnail-image")).count()).toBe(2);
        expect(this._edit_product_page.photoThumbnailContainerEl
          .all(by.css('.photo-thumbnail'))
          .get(0)
          .element(by.css(".is_default")).isDisplayed()).toBe(true);
        expect(this._edit_product_page.photoThumbnailContainerEl
          .all(by.css('.photo-thumbnail'))
          .get(1)
          .element(by.css(".is_default")).isDisplayed()).toBe(false);

      });

      it('should be able to upload photo', function() {
        expect(this._edit_product_page.photoThumbnailContainerEl.isDisplayed()).toBe(true);
        expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css("img.photo-thumbnail-image")).count()).toBe(0);

        this._edit_product_page.uploadFileInputFieldEl.sendKeys(cwd + "/e2e/test_files/products/nikon_camera_1.JPG");
        expect(this._edit_product_page.photoThumbnailContainerEl.isDisplayed()).toBe(true);
        expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css("img.photo-thumbnail-image")).count()).toBe(1);
        expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css('.photo-thumbnail-mark-as-default')).count()).toBe(1);
        expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css('.photo-thumbnail-set-alt')).count()).toBe(1);
        expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css('.photo-thumbnail-remove')).count()).toBe(1);

        this._edit_product_page.uploadFileInputFieldEl.sendKeys(cwd + "/e2e/test_files/products/nikon_camera_2.jpeg");
        expect(this._edit_product_page.photoThumbnailContainerEl.isDisplayed()).toBe(true);
        expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css("img.photo-thumbnail-image")).count()).toBe(2);
        expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css('.photo-thumbnail-mark-as-default')).count()).toBe(2);
        expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css('.photo-thumbnail-set-alt')).count()).toBe(2);
        expect(this._edit_product_page.photoThumbnailContainerEl.all(by.css('.photo-thumbnail-remove')).count()).toBe(2);
      });

      it('should delete photo when trash icon is clicked', function() {
        this._edit_product_page.uploadFileInputFieldEl.sendKeys(cwd + "/e2e/test_files/products/nikon_camera_1.JPG");
        var photoThumbnailContainerEl = this._edit_product_page.photoThumbnailContainerEl;
        var photo_thumbnails = photoThumbnailContainerEl.all(by.css(".photo-thumbnail"));
        expect(photoThumbnailContainerEl.isDisplayed()).toBe(true);
        expect(photoThumbnailContainerEl.all(by.css("img.photo-thumbnail-image")).count()).toBe(1);
        expect(photo_thumbnails.count()).toBe(1);

        this._edit_product_page.uploadFileInputFieldEl.sendKeys(cwd + "/e2e/test_files/products/nikon_camera_2.jpeg");
        expect(photoThumbnailContainerEl.isDisplayed()).toBe(true);
        expect(photo_thumbnails.count()).toBe(2);


        var first_photo_thumbnail = photo_thumbnails.get(0);
        expect(photo_thumbnails.count()).toBe(2);
        expect(first_photo_thumbnail.element(by.css('.photo-thumbnail-menu')).isDisplayed()).toBe(false);

        // hover the first photo thumbnail
        browser
          .actions()
          .mouseMove(first_photo_thumbnail)
          .perform();

        // click remove button
        expect(first_photo_thumbnail.element(by.css('.photo-thumbnail-menu')).isDisplayed()).toBe(true);
        expect(photo_thumbnails.get(0).element(by.css('.photo-thumbnail-remove')).isDisplayed()).toBe(true);
        first_photo_thumbnail.element(by.css('.photo-thumbnail-remove')).click();
        expect(photo_thumbnails.count()).toBe(1);

        // click remove button again
        first_photo_thumbnail.element(by.css('.photo-thumbnail-remove')).click();
        expect(photo_thumbnails.count()).toBe(0);
      });
    });
  });




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
        expect(this._edit_product_page.pageTitleEl.getText()).toBe("Products > Edit Product > Product 1");

        // should contain "Products" link
        expect(this._edit_product_page.pageTitleLinkEl.isDisplayed()).toBe(true);

        // should contain Title field
        expect(this._edit_product_page.titleFieldEl.isDisplayed()).toBe(true);
        expect(this._edit_product_page.titleFieldEl.getAttribute('value')).toBe("Product 1");

        // should contain Description field
        expect(this._edit_product_page.descriptionFieldEl.isDisplayed()).toBe(true);
        expect(this._edit_product_page.descriptionFieldEl.getAttribute('value')).toBe("Product Description 1");

        // should contain Page Title field
        expect(this._edit_product_page.pageTitleInputFieldEl.isDisplayed()).toBe(true);
        expect(this._edit_product_page.pageTitleInputFieldEl.getAttribute('value')).toBe("Product Page Title 1");

        // should contain Meta Description field
        expect(this._edit_product_page.metaDescriptionInputFieldEl.isDisplayed()).toBe(true);
        expect(this._edit_product_page.metaDescriptionInputFieldEl.getAttribute('value')).toBe("Product Meta Description 1");

        // should contain Save button
        expect(this._edit_product_page.saveButtonEl.isDisplayed()).toBe(true);
      });
    });
  });
});
