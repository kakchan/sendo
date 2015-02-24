'use strict';

angular.module('sendoApp')
  .controller('NavbarController', function ($scope, $location, $rootScope, Auth) {
    var isAdmin = function() {
      return Auth.isAdmin();
    };
    $scope.menu = [
/*
      { 'title': 'Orders', 'link': '/admin/orders', isShow: Auth.isAdmin },
      { 'title': 'Customers', 'link': '/admin/customers', isShow: Auth.isAdmin },
*/
      { 'title': 'Products', 'link': '/admin/products', image_name: "tag", isShow: isAdmin },
/*
      { 'title': 'Collections', 'link': '/admin/collections', isShow: Auth.isAdmin },
      { 'title': "Blog Posts", "link": "/admin/blog_posts", isShow: Auth.isAdmin },
      { 'title': "Pages", "link": "/admin/pages", isShow: Auth.isAdmin },
      { "title": "Navigation", "link": "/admin/navigation", isShow: Auth.isAdmin },
*/
      { "title": "Themes", "link": "/admin/themes", image_name: "pencil", isShow: isAdmin },
      { "title": "Users", "link": "/admin/users", image_name: "users", isShow: isAdmin }
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
      $location.path('/admin');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
