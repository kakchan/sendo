'use strict';

angular.module('sendoApp')
  .controller('NavbarController', function ($scope, $location, Auth) {
    $scope.menu = [
/*
      { 'title': 'Orders', 'link': '/admin/orders', isShow: Auth.isAdmin },
      { 'title': 'Customers', 'link': '/admin/customers', isShow: Auth.isAdmin },
*/
      { 'title': 'Products', 'link': '/admin/products', isShow: Auth.isAdmin },
/*
      { 'title': 'Collections', 'link': '/admin/collections', isShow: Auth.isAdmin },
      { 'title': "Blog Posts", "link": "/admin/blog_posts", isShow: Auth.isAdmin },
      { 'title': "Pages", "link": "/admin/pages", isShow: Auth.isAdmin },
      { "title": "Navigation", "link": "/admin/navigation", isShow: Auth.isAdmin },
*/
      { "title": "Themes", "link": "/admin/themes", isShow: Auth.isAdmin },
/*
      { "title": "Settings", "link": "/admin/settings", isShow: Auth.isAdmin }
*/
    ];

    $scope.is_show_menu_item = function( menu_item ) {
      return menu_item.type = Auth.isAdmin;
    };

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/admin/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
