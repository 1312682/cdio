(function() {
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

    var OutcomeTree = [];

    var service = {
      toMaterializePath: toMaterializePath,
      readExcelFile: readExcelFile,
      convertToChar: convertToChar,
      excelToTree: excelToTree,
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
          } else {
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

    function readExcelFile(workbook) {
      var sheet = workbook.Sheets["Learning Outcomes"];

      var range = {
        start: {
          col: sheet["!range"].s.c + 1,
          row: sheet["!range"].s.r + 1
        },
        end: {
          col: sheet["!range"].e.c - 1,
          row: sheet["!range"].e.r
        }
      }

      var atom = [];
      for (var R = range.start.row; R <= range.end.row; ++R) {
        var cell = [];
        for (var C = range.start.col; C <= range.end.col; ++C) {
          var cell_address = { c: C, r: R };
          var cell_name = convertToChar(cell_address.c);
          var cell_obj = sheet[cell_name + cell_address.r.toString()];

          if (cell_obj === undefined) {
            cell.push("0");
          } else {
            cell.push(cell_obj.v.toString());
          }
        }
        atom.push(cell);
      }

      return atom;
    }

    function convertToChar(index) {
      var char = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

      return char[index - 1];
    }

    function excelToTree(data, parent) {
      for (var key in data) {
        if (parseInt(data[key][0]) !== 0 && parseInt(data[key][])) {
          var node = {
            id: data[key][0],
            title: data[key][3],
            nodes: []
          }
        }
      }
    }
  }
})();