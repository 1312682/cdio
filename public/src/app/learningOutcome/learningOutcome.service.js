(function() {
  'use strict';

  angular
    .module('app.outcome')
    .factory('Outcome', Outcome);

  Outcome.$inject = ['$resource', '$q'];

  function Outcome($resource, $q) {
    var OutcomeResource = $resource('/api/outcomes/:outcomeId', { outcomeId: '@outcomeId' }, {
      update: {
        method: "PUT"
      },
      getLastestVersion: {
        method: "GET",
        url: "/api/outcomes/version"
      }
    });
    var ProgramResource = $resource('/api/programs/:programId', { programId: '@programId' }, {
      update: {
        method: "PUT"
      }
    });

    var ExcelArr = [];
    var OutcomeArr = [];
    var OutcomeTree = [];
    var OutcomeData = [];
    var parent = { root: "#", level1: "", level2: "", level3: "" };

    var service = {
      ToMaterializePath: toMaterializePath,
      UpdateMaterialPath: updateMaterialPath,
      ReadExcelFile: readExcelFile,
      ConvertToChar: convertToChar,
      SetParent: setParent,
      ExcelToTree: excelToTree,
      TreeToData: treeToData,
      NewNode: newNode,
      UpdateNode: updateNode,
      DeleteNode: deleteNode,
      GetAllPrograms: getAllPrograms,
      GetOutcomeTree: getOutcomeTree,
      GetLastestVersion: getLastestVersion
    };

    return service;

    ////////////////

    function toMaterializePath(tree, rootPath) {
      for (var item in tree) {
        if (typeof tree[item] == "object" && tree[item] !== null) {
          tree[item].path = rootPath + tree[item]._id + ",";

          checkItem(tree[item]);

          toMaterializePath(tree[item].nodes, tree[item].path);
        }
      }
      console.log(OutcomeData);
      return tree;
    }

    function updateMaterialPath() {
      var promiseArr = [];

      for (var i = 0; i < OutcomeData.length; i++) {
        var currentPromise = OutcomeResource
          .update({ outcomeId: OutcomeData[i]._id, version: OutcomeData[i].ver }, OutcomeData[i]).$promise
          .then(function(res) {
            return true;
          });
        promiseArr.push(currentPromise);
      }

      $q.all(promiseArr).then(function(res) {
        console.log("Update successfully");
      });
    }

    function checkItem(node) {
      for (var i = 0; i < OutcomeData.length; i++) {
        if (OutcomeData[i]._id == node._id) {
          OutcomeData[i].path = node.path;
        }
      }
    }

    function readExcelFile(workbook) {
      var sheet = workbook.Sheets["Learning Outcomes"];

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

          ExcelArr.push(node);
        }
      }
      treeToData(ExcelArr);

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
        parent.level3 = node._id;
      } else if (node.code % 100 > 0) {
        node.parent = parent.level1;
        parent.level2 = node._id;
      } else {
        node.parent = parent.root;
        parent.level1 = node._id;
      }

      OutcomeData.push(node);
      return parent;
    }

    function excelToTree(data) {
      var map = {};
      for (var i = 0; i < data.length; i++) {
        var node = data[i];
        map[node._id] = i; // use map to look-up the parents

        if (node.parent !== "#") {
          data[map[node.parent]].nodes.push(node);
        } else {
          OutcomeTree.push(node);
        }
      }
    }

    function treeToData(data) {
      var nodeArr = [],
        promiseArr = [];

      for (var i = 0; i < data.length; i++) {
        var item = {
          title: data[i].title,
          majors: []
        }

        var currentPromise = OutcomeResource.save(item).$promise.then(function(res) {
          var node = {
            _id: res._id,
            title: res.outcome.title,
            path: res.outcome.path,
            majors: res.outcome.majors,
            ver: res.outcome.ver
          }

          nodeArr.push(node);
          return true;
        });

        promiseArr.push(currentPromise);
      }

      $q.all(promiseArr).then(function(res) {
        OutcomeArr = nodeArr;
        for (var i = 0; i < OutcomeArr.length; i++) {
          OutcomeArr[i].nodes = [];
          OutcomeArr[i].code = data[i].code;
          parent = setParent(OutcomeArr[i], parent);
        }
        excelToTree(OutcomeData);
      });
    }

    // Outcome API
    function newNode(outcome) {
      return OutcomeResource.save(outcome).$promise;
    }

    function updateNode(outcome) {
      return OutcomeResource.update({ outcomeId: outcome._id }, outcome).$promise;
    }

    function deleteNode(id) {
      return OutcomeResource.remove({ outcomeId: id }).$promise;
    }

    function getOutcomeTree(id) {
      return OutcomeResource.query({ outcomeId: id }).$promise;
    }

    function getLastestVersion() {
      return OutcomeResource.getLastestVersion().$promise;
    }

    // Program API 
    function getAllPrograms() {
      return ProgramResource.query().$promise;
    }
  }
})();