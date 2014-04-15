Angular Option Tree
===================
[![Code Climate](https://codeclimate.com/github/passy/angular-masonry.png)](https://codeclimate.com/github/passy/angular-masonry)

[Demo](http://leechsien.github.io/angular-option-tree/)

A directive to use [jquery-option-tree](https://code.google.com/p/jquery-option-tree/) with AngularJS. 

Usage
------
1. Install with bower:  `bower install --save angular-option-tree`
2. Include `angular-option-tree.js.`
3. Add `option-tree` to you app modules.
4. Use the `option-tree` directive.

Basic Example
------

```html
<form class="form-horizontal" role="form" ng-controller="Demo1Ctrl">
  <input option-tree="tree_data" option-tree-class="form-contol">
</form>
```

**option-tree:** JSON object in angular controller scope.

**option-tree-class:** customize style for generated `<select>` element.

Loading Remote Data (JSON)
------
```html
<form class="form-horizontal" role="form" ng-controller="Demo4Ctrl">
  <input option-tree option-tree-src="example.json" option-tree-class="form-control">
</form>
```

**option-tree-src:** remote JSON source.

License
------
MIT

