// Generated by CoffeeScript 1.6.3
(function() {
  var app;

  app = angular.module('myApp', ['ngResource', 'ui.router']);

  app.config(function($stateProvider) {
    var room1, room2;
    room1 = {
      url: "/Room1",
      templateUrl: "/sceniq/room1.html",
      controller: RoomCtrl
    };
    room2 = {
      url: "/Room2",
      templateUrl: "/sceniq/room2.html",
      controller: RoomCtrl
    };
    $stateProvider.state('room1', room1);
    return $stateProvider.state('room2', room2);
  });

  app.directive('soundButton', function() {
    return {
      restrict: 'E',
      scope: {
        songName: '@',
        id: '@',
        songFile: '@',
        height: '@',
        loop: '=?'
      },
      controller: function($scope, $resource, $q) {
        var Query, SoundLevel, SoundPlay, SoundStop;
        SoundPlay = $resource('/sounds/play/:id', {}, {
          "do": {
            method: 'POST'
          }
        });
        SoundStop = $resource('/sounds/stop/:id');
        SoundLevel = $resource('/sounds/level/:id/:power');
        Query = $resource('/sounds/query/:id');
        $scope.loop = $scope.loop || false;
        $scope.started = Query.get({
          id: $scope.id
        }, function(res) {
          var snd;
          $scope.playing = res.playing;
          if ($scope.playing === true) {
            $scope.classstyle = 'playStyle';
          }
          if ($scope.playing === false) {
            $scope.classstyle = 'stopStyle';
          }
          snd = res.level * 100;
          return $scope.power = snd;
        });
        $scope.playSong = function() {
          return SoundPlay["do"]({
            id: $scope.id,
            repeat: $scope.loop,
            name: $scope.songFile,
            power: $scope.power
          }, function() {});
        };
        $scope.stopSong = function() {
          return SoundStop.get({
            id: $scope.id
          }, function() {});
        };
        $scope.doit = function() {
          if ($scope.playing === false) {
            $scope.playSong();
          }
          if ($scope.playing === true) {
            return $scope.stopSong();
          }
        };
        $scope.level = function() {
          return SoundLevel.get({
            id: $scope.id,
            power: $scope.power
          }, function() {});
        };
        return $scope.started.$promise.then(function() {
          $scope.$on('play', function(sender, evt) {
            if (evt.id !== $scope.id) {
              return;
            }
            $scope.playing = true;
            return $scope.classstyle = 'playStyle';
          });
          return $scope.$on('stop', function(sender, evt) {
            if (evt.id !== $scope.id) {
              return;
            }
            $scope.playing = false;
            return $scope.classstyle = 'stopStyle';
          });
        });
      },
      templateUrl: '/sceniq/soundbutton.html'
    };
  });

  this.RoomCtrl = function($scope, $http, $q, $resource) {
    var Events, Start;
    Events = $resource('/sounds/events');
    Start = $resource('/sounds/starts');
    $scope.getEvent = function() {
      return Events.get({}, function(evt) {
        if (evt.evt === 'play') {
          $scope.$broadcast('play', evt);
        }
        if (evt.evt === 'stop') {
          $scope.$broadcast('stop', evt);
        }
        return $scope.getEvent();
      });
    };
    return $scope.getEvent();
  };

}).call(this);

/*
//@ sourceMappingURL=sceniq.map
*/
