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

    var OutcomeTree = [];
    var ExcelArr = [];

    var service = {
      ToMaterializePath: toMaterializePath,
      ReadExcelFile: readExcelFile,
      ConvertToChar: convertToChar,
      SetParent: setParent,
      ExcelToTree: excelToTree,
      NewNode: newNode,
      UpdateNode: updateNode,
      DeleteNode: deleteNode,
      RemoveOutcome: removeOutcome
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
      var parent = { root: "#", level1: "", level2: "", level3: "" };

      // Get range of Excel file
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

      for (var R = range.start.row; R <= range.end.row; ++R) {
        var cell = [];
        for (var C = range.start.col; C <= range.end.col; ++C) {
          var cell_obj = sheet[convertToChar(C) + R];

          if (cell_obj === undefined) {
            cell.push("0");
          } else {
            cell.push(cell_obj.v.toString());
          }
        }

        if (cell[3] !== "0") {
          var node = {
            code: cell[0] + cell[1] + cell[2],
            title: cell[3],
            nodes: [],
          }
          parent = setParent(node, parent);
        }
      }
      excelToTree(ExcelArr);

      return OutcomeTree;
    }

    // Get name of column
    function convertToChar(index) {
      var char = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

      return char[index - 1];
    }

    // Check parent of node
    function setParent(node, parent) {
      if (node.code === "000") {
        node.parent = parent.level3;
      } else if (node.code % 10 > 0) {
        node.parent = parent.level2;
        parent.level3 = node.code;
      } else if (node.code % 100 > 0) {
        node.parent = parent.level1;
        parent.level2 = node.code;
      } else {
        node.parent = parent.root;
        parent.level1 = node.code;
      }

      ExcelArr.push(node);
      return parent;
    }

    function excelToTree(data) {
      var map = {};
      for (var i = 0; i < data.length; i++) {
        var node = data[i];
        map[node.code] = i; // use map to look-up the parents
        if (node.parent !== "#") {
          data[map[node.parent]].nodes.push(node);
        } else {
          OutcomeTree.push(node);
        }
      }
    }

    function newNode(outcome) {
      return $http.post("/api/outcomes", outcome).then(function (res) {
        return res.data;
      });
    }

    function updateNode(outcome, id) {
      return $http.put("/api/outcomes/" + id, outcome).then(function (res) {
        return res.data;
      });
    }

    function deleteNode(id) {
      return $http.delete("api/outcomes/" + id).then(function (res) {
        console.log(res);
        return true;
      });
    }

    function removeOutcome(outcome) {
      if (outcome.nodes.length > 0) {
        for (var detail in outcome.nodes) {
          var index = outcome.nodes.indexOf(outcome.nodes[detail]);
          var wait = removeOutcome(outcome.nodes[detail]);
          
          wait.then(function (res) {
            if (res) {
              outcome.nodes.splice(index, 1);
              if (outcome.nodes.length === 0) {
                var promise = deleteNode(outcome);
                promise.then(function (res) {
                  return res;
                });
              }
            }
            else {
              return false;
            }
          });
        }
      }
      else {
        var promise = deleteNode(outcome);
        promise.then(function (res) {
          return res;
        });
      }

    }
  }
})();