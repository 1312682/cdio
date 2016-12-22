(function () {
  'use strict';

  angular
    .module('app.outcome')
    .factory('Outcome', Outcome);

  Outcome.$inject = ['$resource', '$http'];

  function Outcome($resource, $http) {
    var OutcomeResource = $resource('/api/outcomes/:outcomeId', { outcomeId: '@outcomeId' }, {
      update: {
        method: "PUT"
      }
    });
    var ProgramResource = $resource('/api/programs/:programId', { programId: '@programId' }, {
      update: {
        method: "PUT"
      }
    });

    var OutcomeTree = [];
    var OutcomeMaterialize = [];
    var ExcelArr = [];
    var result = {};

    var service = {
      ToMaterializePath: toMaterializePath,
      ReadExcelFile: readExcelFile,
      ConvertToChar: convertToChar,
      SetParent: setParent,
      ExcelToTree: excelToTree,
      NewNode: newNode,
      UpdateNode: updateNode,
      DeleteNode: deleteNode,
      GetAllPrograms: getAllPrograms,
      UpdatePrograms: updatePrograms
    };

    return service;

    ////////////////

    function toMaterializePath(tree, data, parentPath, rootPath) {
      var root = false;
      var newPath = "";
      for (var key in tree) {
        if (typeof tree[key] == "object" && tree[key] !== null) {
          var outcome = {
            title: tree[key].title,
            majors: []
          }

          newNode(outcome)
          .then(function (res) {
            result = res;
          });

          if (parentPath === "") {
            newPath = "," + rootPath + "," + result._id + ",";
            root = true;
          } else {
            newPath = parentPath;
          }

          var node = {
            id: result._id,
            title: tree[key].title,
            majors: result.majors,
            path: newPath
          }

          if (root === false) {
            newPath += result._id + ",";
          }

          data.push(node);
          if (tree[key].nodes.length > 0) {
            toMaterializePath(tree[key].nodes, data, newPath, rootPath);            
          }
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

    // Outcome API
    function newNode(outcome) {
      return OutcomeResource.save(outcome).$promise;
    }

    function updateNode(outcome) {
      outcome.outcomeId = outcome._id;
      return OutcomeResource.update(outcome).$promise;
    }

    function deleteNode(id) {
      return OutcomeResource.remove({ outcomeId: id }).$promise;
    }

    // function removeOutcome(outcome) {
    //   if (outcome.nodes.length > 0) {
    //     for (var detail in outcome.nodes) {
    //       var index = outcome.nodes.indexOf(outcome.nodes[detail]);
    //       var wait = removeOutcome(outcome.nodes[detail]);

    //       wait.then(function (res) {
    //         if (res) {
    //           outcome.nodes.splice(index, 1);
    //           if (outcome.nodes.length === 0) {
    //             var promise = deleteNode(outcome);
    //             promise.then(function (res) {
    //               return res;
    //             });
    //           }
    //         }
    //         else {
    //           return false;
    //         }
    //       });
    //     }
    //   }
    //   else {
    //     var promise = deleteNode(outcome);
    //     promise.then(function (res) {
    //       return res;
    //     });
    //   }
    // }

    // Program API 
    function getAllPrograms() {
      return ProgramResource.query().$promise;
    }

    function updatePrograms(program) {
      program.programId = program._id;
      return ProgramResource.update(program).$promise;
    }
  }
})();