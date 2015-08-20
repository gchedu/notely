'use strict';

var nevernoteBasePath = 'http://nevernote-1150.herokuapp.com/api/v1/',
    apiKey = '$2a$10$M/obut/hswmA1SsC3ON/GeX4o0iVVOStsHRr.tBdLH28Hez.oE8oW';

angular.module('notely.notes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {
    templateUrl: 'notes/notes.html' //template = view
  });
}])

.controller('NotesController', ['$scope', '$http', function($scope, $http){
  $scope.note = {};

  $http.get(nevernoteBasePath + 'notes?api_key=' + apiKey)
    .success(function(notesData) {
      $scope.notes = notesData;
    });

    $scope.commit = function() {
      $http.post(nevernoteBasePath + 'notes', {
        api_key: apiKey,
        note: $scope.note
      }).success(function(newNoteData) {
        $scope.notes.unshift(newNoteData.note);
      });
    };
}]);
