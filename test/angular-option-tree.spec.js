'use strict';

describe('angular-option-tree', function(){
  var scope,
      httpBackend,
      test_data    = {'option_test': {'suboption_test': 100}},
      changed_data = {'option_changed': {'suboption_changed': 100}},
      remote_data  = {'option_remote': {'option_remote': 100}};

  beforeEach(module('option-tree'));

  beforeEach(inject(function($rootScope, $httpBackend, $http){
    scope = $rootScope.$new();
    scope.test_data = test_data;

    httpBackend = $httpBackend;
    httpBackend.when("GET", "/test_data.json").respond(remote_data);

    $.fn.optionTree.reset();
  }));

  it('should initialize', inject(function($compile) {
    var element = angular.element('<input option-tree="test_data">');
    $compile(element)(scope);
  }));

  it('should call jquery-option-tree on init', inject(function($compile) {
    var element = angular.element('<input option-tree="test_data">');
    $compile(element)(scope);
    element.scope().$apply();

    expect($.fn.optionTree).toHaveBeenCalledWith(test_data);
  }));

  it('should call jquery-option-tree after option data changed',
    inject(function($compile) {

    var element = angular.element('<input option-tree="test_data">');
    $compile(element)(scope);
    element.scope().$apply();
    element.scope().$apply(function() {
      scope.test_data = changed_data;
    });

    expect($.fn.optionTree).toHaveBeenCalledWith(changed_data);
  }));

  it('should call jquery-option-tree to loading remote data',
    inject(function($compile) {

    httpBackend.expectGET('/test_data.json');

    var element = angular
      .element('<input option-tree option-tree-src="/test_data.json">');
    $compile(element)(scope);
    element.scope().$apply();

    expect($.fn.optionTree).toHaveBeenCalled();
  }));
});
