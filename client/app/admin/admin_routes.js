'use strict';

angular.module('sendoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin/orders', {
        url: '/admin/orders',
        templateUrl: 'app/admin/orders/orders.html',
        controller: 'OrdersController'
      })
      .state('admin/customers', {
        url: '/admin/customers',
        templateUrl: 'app/admin/customers/customers.html',
        controller: 'CustomersController'
      })
      .state('admin/collections', {
        url: '/admin/collections',
        templateUrl: 'app/admin/collections/collections.html',
        controller: 'CollectionsController'
      })
      .state('admin/blog_posts', {
        url: '/admin/blog_posts',
        templateUrl: 'app/admin/blog_posts/blog_posts.html',
        controller: 'BlogPostsController'
      })
      .state('admin/pages', {
        url: '/admin/pages',
        templateUrl: 'app/admin/pages/pages.html',
        controller: 'PagesController'
      })
      .state('admin/navigation', {
        url: '/admin/navigation',
        templateUrl: 'app/admin/navigation/navigation.html',
        controller: 'NavigationController'
      })
      .state('admin/themes', {
        url: '/admin/themes',
        templateUrl: 'app/admin/themes/themes.html',
        controller: 'ThemesController'
      })
      .state('admin/users', {
        url: '/admin/users',
        templateUrl: 'app/admin/users/users.html',
        controller: 'UsersController'
      })

      /* Products */
      .state('admin/products', {
        url: '/admin/products',
        templateUrl: 'app/admin/products/products.html',
        controller: 'ProductsController'
      })
      .state('admin/products/add', {
        url: "/admin/products/add",
        templateUrl: "app/admin/products/add_product.html",
        controller: 'AddProductController'
      })

      .state('admin/login', {
        url: '/admin/login',
        templateUrl: 'app/admin/login/login.html',
        controller: 'LoginController'
      })
      .state('admin/signup', {
        url: '/admin/signup',
        templateUrl: 'app/admin/signup/signup.html',
        controller: 'SignupController'
      })
      .state('admin/settings', {
        url: '/admin/settings',
        templateUrl: 'app/admin/settings/settings.html',
        controller: 'SettingsController',
        authenticate: true
      });
  });
