'use strict';

angular.module("sendoApp")
  .directive( "sdPagination", function() {
    return {
      restrict: "C",
      replace: true,
      scope: {
        "currentPage": "=",
        "noOfPages": "=",
        "goToPageClick": "="
      },
      templateUrl: "components/pagination/pagination.html",
      link: function( $scope, jElement, attrs ) {
        var start_page_no = 1;
        var last_page_no = start_page_no + 9;

        /* Watchers */
        $scope.$watch( "currentPage", function( newCurrentPage ) {
          newCurrentPage = parseInt( newCurrentPage, 10 );
          start_page_no = newCurrentPage - 5;
          if ( start_page_no > $scope.noOfPages - 10 ) {
            start_page_no = $scope.noOfPages - 9;
          }
          if ( start_page_no < 1 ) {
            start_page_no = 1;
          }
          last_page_no = newCurrentPage + 4;
          if ( last_page_no > $scope.noOfPages ) {
            last_page_no = $scope.noOfPages;
          }
          if (last_page_no < 10 && $scope.noOfPages > 10 ) {
            last_page_no = 10;
          }
          if ( last_page_no < 10 ) {
            last_page_no = $scope.noOfPages;
          }
          $scope.page_nos = [];
          for ( var i=start_page_no; i<=last_page_no; i++ ) {
            $scope.page_nos.push( i );
          }
        } );

        /* Event Handlers */
        $scope.pageClick = function( event, page_no ) {
          $scope.goToPageClick( page_no );
        };

        $scope.prevTenPageClick = function( event ) {
          var page_no = $scope.currentPage - 10;
          if ( page_no < 1 ) {
            page_no = 1;
          }
          $scope.goToPageClick( page_no );
        };

        $scope.nextTenPageClick = function( event ) {
          var currentPage = parseInt( $scope.currentPage, 10 );
          var page_no = currentPage + 10;

          if ( page_no > $scope.noOfPages ) {
            page_no = $scope.noOfPages;
          }
          $scope.goToPageClick( page_no );
        };
      }
    };
  } );
