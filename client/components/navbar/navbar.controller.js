'use strict';

angular.module('sendoApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
      { 'title': 'Orders', 'link': '/orders', isShow: Auth.isAdmin },
      { 'title': 'Customers', 'link': '/customers', isShow: Auth.isAdmin },
      { 'title': 'Products', 'link': '/admin/products', isShow: Auth.isAdmin },
      { 'title': 'Collections', 'link': '/collections', isShow: Auth.isAdmin },
      { 'title': "Blog Posts", "link": "blog_posts", isShow: Auth.isAdmin },
      { 'title': "Pages", "link": "pages", isShow: Auth.isAdmin },
      { "title": "Navigations", "link": "navigations", isShow: Auth.isAdmin },
      { "title": "Themes", "link": "themes", isShow: Auth.isAdmin },
      { "title": "Settings", "link": "settings", isShow: Auth.isAdmin }
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
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
