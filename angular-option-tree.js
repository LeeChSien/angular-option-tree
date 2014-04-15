/*!
 * angular-option-tree v0.8.0
 * License: MIT
 */
(function () {
  'use strict';

  function get_hash_string() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for( var i=0; i < 10; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  function get_preselect_path(json, value) {
    var sub_path = [];
    for (var key in json) {
      if(json[key] === parseInt(json[key], 10)) {
        if(json[key] == value) {
          sub_path.push(key);
          return sub_path;
        } else {
          return [];
        }
      } else {
        sub_path = get_preselect_path(json[key], value);
        if(sub_path.length > 0) {
          sub_path.unshift(key);
          return sub_path;
        }
      }
    }
    return [];
  }

  angular.module('option-tree', [])
    .directive('optionTree', ['$http', function($http) {
      return {
        restrict: 'AC',
        link: function (scope, element, attrs) {
          var element_query_pattern = '',
              isInit = false,
              settings = {
                select_class: $(element).attr('option-tree-class')
              };

          // Avoid input name is empty
          if(!$(element).attr('name')) {
            $(element).attr('name', get_hash_string());
          }
          element_query_pattern = "input[name='" + element.attr('name') + "']";

          function refresh_preselect(option_tree) {
            if(settings.hasOwnProperty('preselect')) {
              delete settings.preselect;
            }

            if($(element).val()) {
              var path = get_preselect_path(option_tree, $(element).val());
              if(path.length > 0) {
                settings.preselect = {};
                settings.preselect[$(element).attr('name')] = path;
              }
            }
          }

          function bind_option_tree(option_tree) {
            if(isInit) {
              $(element_query_pattern).optionTree('destroy');
              $(element).val('');
            } else {
              isInit = true;
            }

            refresh_preselect(option_tree);
            $(element_query_pattern).optionTree(option_tree, settings);
          }

          scope.$watch(attrs.optionTree, function(option_tree) {
            bind_option_tree(option_tree);
          });

          // Loading Remote Data
          if($(element).attr('option-tree-src')) {
            $http.get($(element).attr('option-tree-src'))
              .success(function(data){
                bind_option_tree(data);
              });
          }
        }
      };
    }]);
}());
