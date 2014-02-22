// Generated by CoffeeScript 1.6.3
(function() {
  var app;

  app = angular.module('myApp', ['ngResource', 'ui.router', 'JSONedit']);

  app.config(function($stateProvider) {
    var config, room1, room2;
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
    config = {
      url: "/Config",
      templateUrl: "/sceniq/config.html",
      controller: ConfigCtrl
    };
    $stateProvider.state('room1', room1);
    $stateProvider.state('room2', room2);
    return $stateProvider.state('config', config);
  });

  app.directive("fold", function() {
    return {
      restrict: 'E',
      templateUrl: '/sceniq/templates/fold.html',
      scope: {
        foldName: '@'
      },
      transclude: true,
      compile: function(element, attr, linker) {
        return {
          pre: function(scope, element, attr) {
            return linker(scope, function(clone) {
              element.children().eq(1).append(clone);
            });
          }
        };
      },
      controller: function($scope) {
        $scope.nb = 0;
        $scope.$on('foldplay', function(sender, evt) {
          return $scope.nb = $scope.nb + 1;
        });
        return $scope.$on('foldstop', function(sender, evt) {
          return $scope.nb = $scope.nb - 1;
        });
      }
    };
  });

  app.directive("dmxSlider", function() {
    return {
      restrict: 'E',
      templateUrl: '/sceniq/templates/dmxslider.html',
      scope: {
        id: '@',
        key: '@',
        def: '@',
        name: '@'
      },
      controller: function($scope, $resource) {
        var DmxSet, Query;
        Query = $resource('/dmx/query/:id/:key');
        DmxSet = $resource('/dmx/set', {}, {
          set: {
            method: 'POST'
          }
        });
        $scope.started = Query.get({
          id: $scope.id,
          key: $scope.key
        }, function(res) {
          $scope.value = res[$scope.key];
          return $scope.send();
        });
        $scope.send = function() {
          var cmd;
          cmd = {};
          cmd[$scope.key] = $scope.value;
          return DmxSet.set({
            id: $scope.id,
            cmds: cmd
          }, function() {});
        };
        return $scope.$on('update', function(sender, evt) {
          if ((evt.id !== $scope.id) || (evt.key !== $scope.key)) {
            return;
          }
          return $scope.value = evt.val;
        });
      }
    };
  });

  app.directive("dmxLight", function() {
    return {
      restrict: 'E',
      templateUrl: '/sceniq/templates/dmxlight.html',
      scope: {
        id: '@'
      },
      transclude: true,
      controller: function($scope, $resource) {
        var LightQuery;
        LightQuery = $resource('/dmx/light/:id');
        LightQuery.get({
          id: $scope.id
        }, function(res) {
          $scope.light = res.light;
          if ($scope.light.transition === "False") {
            $scope.dmxstyle = 'dmx';
          }
          if ($scope.light.transition === "True") {
            $scope.dmxstyle = 'transit';
          }
          return $scope.DmxSet = $resource('/dmx/set', {}, {
            set: {
              method: 'POST'
            }
          });
        });
        $scope["do"] = function() {
          return $scope.DmxSet.set({
            id: $scope.light.id,
            setting: $scope.light.setting,
            transition: $scope.light.transition,
            delay: $scope.light.delay
          }, function() {});
        };
      }
    };
  });

  app.directive("soundButton", function() {
    return {
      restrict: 'E',
      scope: {
        id: '@'
      },
      templateUrl: '/sceniq/templates/soundbutton.html',
      controller: function($scope, $resource) {
        var Query, SoundLevel, SoundPlay, SoundStop;
        SoundPlay = $resource('/sounds/play', {}, {
          "do": {
            method: 'POST'
          }
        });
        SoundStop = $resource('/sounds/stop/:id');
        SoundLevel = $resource('/sounds/level/:id/:power');
        Query = $resource('/sounds/query/:id');
        $scope.started = Query.get({
          id: $scope.id
        }, function(res) {
          var snd;
          $scope.song = res.defs;
          $scope.playing = res.playing;
          if ($scope.playing === true) {
            $scope.classstyle = 'playStyle';
          }
          if ($scope.playing === true) {
            $scope.$emit('foldplay');
          }
          if ($scope.playing === false) {
            $scope.classstyle = 'stopStyle';
          }
          if (res.level != null) {
            snd = res.level;
          }
          if (res.level == null) {
            snd = res.defs.defLevel;
          }
          return $scope.power = snd;
        });
        $scope.playSong = function() {
          return SoundPlay["do"]({
            id: $scope.id,
            repeat: $scope.song.loop,
            name: $scope.song.songFile,
            power: $scope.power,
            position: $scope.song.position,
            card: $scope.song.card
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
            $scope.classstyle = 'playStyle';
            return $scope.$emit('foldplay');
          });
          return $scope.$on('stop', function(sender, evt) {
            if (evt.id !== $scope.id) {
              return;
            }
            $scope.playing = false;
            $scope.classstyle = 'stopStyle';
            return $scope.$emit('foldstop');
          });
        });
      }
    };
  });

  this.RoomCtrl = function($scope, $http, $q, $resource) {
    var DmxEvents, Events;
    Events = $resource('/sounds/events');
    DmxEvents = $resource('/dmx/events');
    $scope.getSoundEvent = function() {
      return Events.get({}, function(evt) {
        $scope.$broadcast(evt.evt, evt);
        return $scope.getSoundEvent();
      });
    };
    $scope.getDmxEvent = function() {
      return DmxEvents.get({}, function(evt) {
        $scope.$broadcast(evt.evt, evt);
        return $scope.getDmxEvent();
      });
    };
    $scope.getSoundEvent();
    return $scope.getDmxEvent();
  };

  this.ConfigCtrl = function($scope, $http, $q, $resource) {
    var Query, Save, Update;
    Query = $resource('/models/getdefs');
    Update = $resource('/models/setdefs', {}, {
      set: {
        method: 'POST'
      }
    });
    Save = $resource('/models/save');
    $scope.update = function() {
      Update.set({
        'dmx_model': $scope.dmxModel,
        'dmx_setting': $scope.dmxSetting,
        'snd_setting': $scope.sndSetting,
        "dmx_light": $scope.dmxLight
      }, function() {});
      return alert('Settings updated !');
    };
    $scope.save = function() {
      return Save.get({}, function() {
        return alert('Settings saved !');
      });
    };
    Query.get({}, function(res) {
      $scope.dmxModel = res.dmx_model;
      $scope.dmxSetting = res.dmx_setting;
      $scope.dmxLight = res.dmx_light;
      $scope.sndSetting = res.snd_setting;
    });
    return $scope.$on('$stateChangeStart', function(event) {});
  };

}).call(this);

/*
//@ sourceMappingURL=sceniq.map
*/
