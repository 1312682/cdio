(function () {
  'use strict';

  angular
    .module('app.outcome')
    .factory('Outcome', Outcome);

  Outcome.$inject = ['$resource', '$http'];
  function Outcome($resource, $http) {
    var OutcomeResource = $resource('/api/outcome/:outcomeId', { outcomeId: '@outcomeId' }, {
      GetTreeView: {
        method: 'GET',
        isArray: true
      }
    });

    var service = {
      toMaterializePath: toMaterializePath
    };

    return service;

    ////////////////

    function toMaterializePath(tree, data, parentPath) {
      var root = false;
      var newPath = "";
      for (var key in tree) {
        if (typeof tree[key] == "object" && tree[key] !== null) {
          
          if (parentPath === "") {
            newPath = "," + tree[key].id + ",";
            root = true;
          }
          else {
            newPath = parentPath;
          }

          var node = {
            id: tree[key].id,
            title: tree[key].title,
            path: newPath
          }

          if (root === false) {
            newPath += tree[key].id + ",";
          }          

          data.push(node);
          toMaterializePath(tree[key].nodes, data, newPath);
        }
      }
      return data;
    }
  }
})();