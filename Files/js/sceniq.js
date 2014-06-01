// Generated by CoffeeScript 1.6.3
(function() {
  var app;

  app = angular.module('myApp', ['ngResource', 'ui.router', 'JSONedit', 'ui.knob', 'angularFileUpload']);

  app.config(function($stateProvider) {
    var camdevices, cameleon, camfixtures, campictures, camscenes, camsettings, camsounds, config, drooms, faders;
    config = {
      url: "/Config",
      templateUrl: "/sceniq/config.html",
      controller: ConfigCtrl
    };
    faders = {
      url: "/Fader",
      templateUrl: "/sceniq/fadercfg.html",
      controller: FaderCtrl
    };
    drooms = {
      url: "/DRooms",
      templateUrl: "/sceniq/drooms.html",
      controller: ConfigRoomCtrl
    };
    cameleon = {
      url: '/Cameleon',
      templateUrl: "/sceniq/cameleon.html",
      controller: CameleonCtrl
    };
    camsettings = {
      url: '/Settings',
      templateUrl: 'partials/devs.html',
      controller: DevFixCtrl
    };
    camfixtures = {
      url: '/Fixtures',
      templateUrl: 'partials/fixtures.html',
      controller: FixturesCtrl
    };
    camdevices = {
      url: '/Devices',
      templateUrl: 'partials/devices.html',
      controller: DevicesCtrl
    };
    camsounds = {
      url: '/Sounds',
      templateUrl: 'partials/sounds.html',
      controller: SoundsCtrl
    };
    camscenes = {
      'url': '/cam-associate',
      views: {
        '': {
          templateUrl: 'partials/asso.html'
        },
        'machines@cameleon.associate': {
          templateUrl: 'partials/machines.html',
          controller: CamMachinesCtrl
        },
        'assettings@cameleon.associate': {
          templateUrl: 'partials/associate.html',
          controller: CamAssociateCtrl
        },
        'scenes@cameleon.associate': {
          templateUrl: 'partials/scenes.html',
          controller: SceneCtrl
        }
      }
    };
    campictures = {
      url: '/cam-pictures',
      views: {
        '': {
          templateUrl: 'partials/pict.html'
        },
        'picture@cameleon.pictures': {
          templateUrl: 'partials/pictures.html',
          controller: PicturesCtrl
        },
        'pictmngr@cameleon.pictures': {
          templateUrl: 'partials/picturesMngr.html',
          controller: PicturesMngrCtrl
        }
      }
    };
    $stateProvider.state('drooms', drooms);
    $stateProvider.state('cameleon', cameleon);
    $stateProvider.state('cameleon.settings', camsettings);
    $stateProvider.state('cameleon.settings.fixtures', camfixtures);
    $stateProvider.state('cameleon.settings.devices', camdevices);
    $stateProvider.state('cameleon.settings.sounds', camsounds);
    $stateProvider.state('cameleon.faders', faders);
    $stateProvider.state('cameleon.config', config);
    $stateProvider.state('cameleon.associate', camscenes);
    return $stateProvider.state('cameleon.pictures', campictures);
  });

  app.factory('sessionMngr', function() {
    var mngr;
    mngr = {
      'connected': false
    };
    mngr.IsConnected = function() {
      return mngr.connected;
    };
    mngr.SetConnected = function(sessionId) {
      mngr.connected = true;
      return mngr.sessionId = sessionId;
    };
    return mngr;
  });

  app.factory('MenuUtils', function() {
    var menus;
    menus = {};
    menus.UpdateMenu = function(list, what) {
      var found, ix, n, _i, _len;
      ix = 0;
      found = false;
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        n = list[_i];
        if (n.id === what) {
          found = true;
          break;
        } else {
          ix++;
        }
      }
      if (found) {
        return list[ix];
      } else {
        return {};
      }
    };
    return menus;
  });

  app.factory('CameleonServer', function($resource) {
    var datas, _CreatePicture, _CreateScene, _DmxScene, _DmxSet, _FaderList, _GetDebugDatas, _GetDevices, _GetFixtures, _GetPicturesList, _GetSceneList, _GetSoundList, _GetSounds, _LoadPicture, _LoadScene, _QuerySlider, _RecordPicture, _RecordScene, _RecordSetting, _SaveDebugDatas, _SetFader, _SettingList, _SlidersList, _UpdateDebugDatas, _UpdateDevices, _UpdateFixtures, _UpdateSounds;
    datas = {};
    _SettingList = $resource('/cfg/getsettinglist');
    _FaderList = $resource('/dmx/getfaderlist');
    _SlidersList = $resource('/dmx/faders/:id');
    _SetFader = $resource('/dmx/setfader', {}, {
      set: {
        method: 'POST'
      }
    });
    _QuerySlider = $resource('/dmx/query/:id/:key');
    _DmxSet = $resource('/dmx/set', {}, {
      set: {
        method: 'POST'
      }
    });
    _RecordSetting = $resource('/dmx/recordsetting/:fader/:setname');
    _GetSceneList = $resource('/cameleon/getscenelist');
    _CreateScene = $resource('/cameleon/createscene/:scene');
    _RecordScene = $resource('/cameleon/recordscene', {}, {
      set: {
        method: 'POST'
      }
    });
    _LoadScene = $resource('/cameleon/loadscene/:scene');
    _GetPicturesList = $resource('/cameleon/getpictureslist');
    _CreatePicture = $resource('/cameleon/createpicture/:picture');
    _RecordPicture = $resource('/cameleon/recordpicture', {}, {
      set: {
        method: 'POST'
      }
    });
    _LoadPicture = $resource('/cameleon/loadpicture/:picture');
    _GetSoundList = $resource('/cameleon/getsoundlist/:empty');
    _DmxScene = $resource('/cameleon/dmxscene', {}, {
      set: {
        method: 'POST'
      }
    });
    _GetDevices = $resource('/cameleon/getdevices');
    _GetFixtures = $resource('/cameleon/getfixtures');
    _UpdateDevices = $resource('/cameleon/updatedevices', {}, {
      set: {
        method: 'POST'
      }
    });
    _UpdateFixtures = $resource('/cameleon/updatefixtures', {}, {
      set: {
        method: 'POST'
      }
    });
    _GetSounds = $resource('/cameleon/getsounds');
    _UpdateSounds = $resource('/cameleon/updatesounds', {}, {
      set: {
        method: 'POST'
      }
    });
    _GetDebugDatas = $resource('/models/getdefs');
    _UpdateDebugDatas = $resource('/models/setdefs', {}, {
      set: {
        method: 'POST'
      }
    });
    _SaveDebugDatas = $resource('/models/save');
    datas.GetMachinesList = function() {
      return _FaderList.get({});
    };
    datas.GetSettingList = function() {
      return _SettingList.get({});
    };
    datas.GetSliderList = function(id) {
      return _SlidersList.get({
        id: id
      });
    };
    datas.SetFaderSetting = function(fader, setting) {
      return _SetFader.set({
        id: fader,
        setting: setting
      });
    };
    datas.QuerySlider = function(id, key) {
      return _QuerySlider.get({
        id: id,
        key: key
      });
    };
    datas.SetSliderCmd = function(id, cmds) {
      return _DmxSet.set({
        id: id,
        cmds: cmds
      });
    };
    datas.RecordFaderSetting = function(fader, setname) {
      return _RecordSetting.get({
        fader: fader,
        setname: setname
      });
    };
    datas.GetSceneList = function() {
      return _GetSceneList.get({});
    };
    datas.CreateScene = function(scene) {
      return _CreateScene.get({
        scene: scene
      });
    };
    datas.RecordScene = function(scene, machines) {
      return _RecordScene.set({
        scene: scene,
        machines: machines
      });
    };
    datas.LoadScene = function(scene) {
      return _LoadScene.get({
        scene: scene
      });
    };
    datas.GetPicturesList = function() {
      return _GetPicturesList.get({});
    };
    datas.CreatePicture = function(picture) {
      return _CreatePicture.get({
        picture: picture
      });
    };
    datas.RecordPicture = function(picture, stuff) {
      return _RecordPicture.set({
        picture: picture,
        stuff: stuff
      });
    };
    datas.LoadPicture = function(picture) {
      return _LoadPicture.get({
        picture: picture
      });
    };
    datas.GetSoundList = function(empty) {
      if (empty == null) {
        empty = false;
      }
      return _GetSoundList.get({
        empty: empty
      });
    };
    datas.DmxScene = function(scene, opts) {
      return _DmxScene.set({
        scene: scene,
        opts: opts
      });
    };
    datas.GetDevices = function() {
      return _GetDevices.get({});
    };
    datas.GetFixtures = function() {
      return _GetFixtures.get({});
    };
    datas.UpdateDevices = function(devices) {
      return _UpdateDevices.set({
        devices: devices
      });
    };
    datas.UpdateFixtures = function(fixtures) {
      return _UpdateFixtures.set({
        fixtures: fixtures
      });
    };
    datas.GetSounds = function() {
      return _GetSounds.get({});
    };
    datas.UpdateSounds = function(sounds) {
      return _UpdateSounds.set({
        sounds: sounds
      });
    };
    datas.GetDebugDatas = function() {
      return _GetDebugDatas.get({});
    };
    datas.UpdateDebugDatas = function(cmd) {
      return _UpdateDebugDatas.set(cmd);
    };
    datas.SaveDebugDatas = function() {
      return _SaveDebugDatas.get({});
    };
    return datas;
  });

  Array.prototype.move = function(old_index, new_index) {
    return this.splice(new_index, 0, this.splice(old_index, 1)[0]);
  };

  app.directive("widgets", function(MenuUtils) {
    return {
      restrict: 'E',
      templateUrl: '/sceniq/templates/widgets.html',
      scope: true,
      link: function(scope, elemt, attrs) {
        scope.forward = function(index) {
          return scope.stuff.move(index, index + 1);
        };
        scope.backward = function(index) {
          if (index > 0) {
            return scope.stuff.move(index, index - 1);
          }
        };
        scope.separator = function(index) {
          return scope.stuff.splice(index, 0, {
            'msg': '',
            'type': 'line'
          });
        };
        scope.remove = function(index) {
          return scope.stuff.splice(index, 1);
        };
        scope.setStart = function(stuff, wrapper) {
          return stuff.startSong = wrapper.entry.id;
        };
        scope.getStartSound = function(stuff, wrapper) {
          if (scope.edit === false) {
            return;
          }
          if ('startSong' in stuff) {
            return wrapper.entry = MenuUtils.UpdateMenu(scope.cameleon.associatesoundslist, stuff.startSong);
          }
        };
        scope.$watch(attrs.things, function(n, o) {
          return scope.stuff = n;
        });
        if ('edit' in attrs) {
          scope.$watch(attrs.edit, function(n, o) {
            return scope.edit = n;
          });
        } else {
          scope.edit = false;
        }
      }
    };
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

  app.directive("dmxSlider", function(CameleonServer) {
    return {
      restrict: 'E',
      templateUrl: '/sceniq/templates/dmxslider.html',
      scope: true,
      link: function(scope, elemt, attrs) {
        scope.started = function() {
          return CameleonServer.QuerySlider(scope.id, scope.key).$promise.then(function(res) {
            scope.value = res[scope.key];
            scope.knobOptions = res['knob'];
            scope.$on('update', function(sender, evt) {
              if ((evt.id !== scope.id) || (evt.key !== scope.key)) {
                return;
              }
              return scope.value = evt.val;
            });
            return scope.showMe = true;
          });
        };
        scope.send = function() {
          var cmd;
          cmd = {};
          cmd[scope.key] = scope.value;
          return CameleonServer.SetSliderCmd(scope.id, cmd).$promise.then(function() {
            return scope.$emit('sliderChanged', {
              'id': scope.id
            });
          });
        };
        scope.showMe = true;
        scope.id = attrs.id;
        scope.key = attrs.key;
        scope.def = attrs.def;
        scope.name = attrs.name;
        return scope.started();
      }
    };
  });

  app.directive("dmxScene", function() {
    return {
      restrict: 'E',
      templateUrl: '/sceniq/templates/dmxscene.html',
      scope: {
        id: '@',
        'startsong': '@'
      },
      controller: function($scope, CameleonServer) {
        $scope.dmxstyle = 'dmx';
        $scope["do"] = function() {
          var opts;
          opts = {
            'startsong': $scope.startsong,
            'endsong': ''
          };
          return CameleonServer.DmxScene($scope.id, opts).$promise.then(function(evt) {});
        };
        $scope.$on('sceneState', function(sender, evt) {
          if (evt.id !== $scope.id) {
            return;
          }
          if (evt.state === true) {
            $scope.active = "running";
          }
          if (evt.state === false) {
            return $scope.active = null;
          }
        });
      }
    };
  });

  app.directive("dmxFader", function(CameleonServer, $resource, $parse) {
    return {
      restrict: 'E',
      scope: true,
      templateUrl: '/sceniq/templates/dmxfader.html',
      link: function(scope, elemt, attrs) {
        var Generate;
        Generate = $resource('/dmx/generate/:fader/:setting/:prefix');
        scope.record = function(fader, wrapper) {
          if ((wrapper === void 0) || (wrapper === '')) {
            return alert('You must enter a setting name !');
          } else {
            return CameleonServer.RecordFaderSetting(scope.id, wrapper.name).$promise.then(function(evt) {
              return CameleonServer.GetSettingList().$promise.then(function(res) {
                scope.settings = res.settings;
                scope.currentSetting = wrapper.name;
                return wrapper.name = "";
              });
            });
          }
        };
        scope.showMe = function() {
          if (scope.settings === void 0) {
            return false;
          }
          return true;
        };
        scope.computeCssClass = function(last) {
          if (last === true) {
            return null;
          } else {
            return "leftpos";
          }
        };
        scope.$watch('currentSetting', function(n, o) {
          if (n === o) {
            return;
          }
          $parse(attrs.settingChanged)(scope, {
            newSetting: n
          });
          if (n === '') {
            return;
          }
          return CameleonServer.SetFaderSetting(scope.id, n);
        });
        scope.SetSetting = function(fader, setting) {
          return scope.currentSetting = setting;
        };
        scope.RefreshDropBox = function() {
          var ix, n, _i, _len, _ref;
          if (scope.settings === void 0) {
            return;
          }
          ix = 0;
          _ref = scope.settings;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            n = _ref[_i];
            if (n.name === scope.currentSetting) {
              break;
            } else {
              ix++;
            }
          }
          return scope.setting.menu = scope.settings[ix];
        };
        scope.setting = {};
        scope.setting.menu = {
          'name': 'me'
        };
        scope.currentSetting = '';
        scope.InitMenu = function() {
          return scope.setting.menu = scope.settings[0];
        };
        scope.$watch('settings', function(n, o) {
          return scope.RefreshDropBox();
        });
        attrs.$observe('id', function(v) {
          if (v === '') {
            return;
          }
          scope.id = v;
          CameleonServer.GetSliderList(v).$promise.then(function(res) {
            scope.sliders = res.res;
            return scope.showIt = true;
          });
          return CameleonServer.GetSettingList().$promise.then(function(res) {
            return scope.settings = res.settings;
          });
        });
        scope.$on('setFaderSetting', function(sender, evt) {
          if (evt.id !== scope.id) {
            return;
          }
          if (evt.setting !== scope.currentSetting) {
            scope.currentSetting = evt.setting;
            return scope.RefreshDropBox();
          }
        });
        scope.$on('sliderChanged', function(sender, evt) {
          if (scope.id !== evt.id) {
            return;
          }
          scope.currentSetting = '';
          return scope.RefreshDropBox();
        });
        return scope.showIt = false;
      }
    };
  });

  app.directive("soundButton", function($resource) {
    return {
      restrict: 'E',
      templateUrl: '/sceniq/templates/soundbutton.html',
      scope: true,
      link: function(scope, elemt, attrs) {
        var Query, SoundLevel, SoundPlay, SoundStop;
        scope.power = 100;
        SoundPlay = $resource('/sounds/play', {}, {
          "do": {
            method: 'POST'
          }
        });
        SoundStop = $resource('/sounds/stop/:id');
        SoundLevel = $resource('/sounds/level/:id/:power');
        Query = $resource('/sounds/query/:id');
        scope.showMe = false;
        scope.started = function() {
          return Query.get({
            id: scope.id
          }, function(res) {
            var snd;
            scope.song = res.defs;
            scope.playing = res.playing;
            if (scope.playing === true) {
              scope.classstyle = 'playStyle';
            }
            if (scope.playing === true) {
              scope.$emit('foldplay');
            }
            if (scope.playing === false) {
              scope.classstyle = 'stopStyle';
            }
            if (res.level != null) {
              snd = res.level;
            }
            if (res.level == null) {
              snd = res.defs.defLevel;
            }
            scope.power = snd;
            scope.knobOptions = res.knob;
            scope.$on('play', function(sender, evt) {
              if (evt.id !== scope.id) {
                return;
              }
              scope.playing = true;
              scope.classstyle = 'playStyle';
              return scope.$emit('foldplay');
            });
            scope.$on('stop', function(sender, evt) {
              if (evt.id !== scope.id) {
                return;
              }
              scope.playing = false;
              scope.classstyle = 'stopStyle';
              return scope.$emit('foldstop');
            });
            scope.$on('volumeUpt', function(sender, evt) {
              if (evt.id !== scope.id) {
                return;
              }
              return scope.power = evt.power;
            });
            return scope.showMe = true;
          });
        };
        scope.playSong = function() {
          var cmd;
          cmd = {
            id: scope.id,
            repeat: scope.song.loop,
            name: scope.song.songFile,
            power: scope.power,
            position: scope.song.position,
            card: scope.song.card
          };
          return SoundPlay["do"](cmd, function() {});
        };
        scope.stopSong = function() {
          return SoundStop.get({
            id: scope.id
          }, function() {});
        };
        scope.doit = function() {
          if (scope.playing === false) {
            scope.playSong();
          }
          if (scope.playing === true) {
            return scope.stopSong();
          }
        };
        scope.level = function() {
          return SoundLevel.get({
            id: scope.id,
            power: scope.power
          }, function() {});
        };
        scope.mute = function() {
          if (scope.power > 0) {
            scope.muted = scope.power;
            scope.power = 0;
          } else {
            scope.power = scope.muted;
            scope.muted = 0;
          }
          scope.level();
        };
        scope.id = attrs.id;
        return scope.started();
      }
    };
  });

  this.ConfigCtrl = function($scope, CameleonServer, $resource) {
    $scope.update = function() {
      var cmd;
      cmd = {
        'snd_setting': $scope.sndSetting,
        'dmx_fixtures': $scope.dmxFixtures,
        'dmx_model': $scope.dmxModel,
        'dmx_setting': $scope.dmxSetting,
        'camscenes': $scope.camscenes,
        'campictures': $scope.campictures
      };
      return CameleonServer.UpdateDebugDatas(cmd).$promise.then(function(evt) {
        return alert('Settings updated !');
      });
    };
    $scope.save = function() {
      var cmd;
      cmd = {
        'snd_setting': $scope.sndSetting,
        'dmx_fixtures': $scope.dmxFixtures,
        'dmx_model': $scope.dmxModel,
        'dmx_setting': $scope.dmxSetting,
        'camscenes': $scope.camscenes,
        'campictures': $scope.campictures
      };
      return CameleonServer.UpdateDebugDatas(cmd).$promise.then(function() {
        return CameleonServer.SaveDebugDatas().$promise.then(function() {
          return alert('Settings saved !');
        });
      });
    };
    CameleonServer.GetDebugDatas().$promise.then(function(res) {
      $scope.sndSetting = res.snd_setting;
      $scope.dmxFixtures = res.dmx_fixtures;
      $scope.dmxModel = res.dmx_model;
      $scope.dmxSetting = res.dmx_setting;
      $scope.camscenes = res.camscenes;
      $scope.campictures = res.campictures;
    });
    return $scope.$on('$stateChangeStart', function(event) {});
  };

  app.filter('faderFilter', function() {
    return function(input, low, high) {
      if ((low !== void 0) && (high !== void 0)) {
        return input.slice(low, +high + 1 || 9e9);
      } else {
        return input;
      }
    };
  });

  this.FaderCtrl = function($scope, CameleonServer) {
    return CameleonServer.GetMachinesList().$promise.then(function(res) {
      return $scope.faderlist = res.list;
    });
  };

  this.ConfigRoomCtrl = function($scope, CameleonServer) {
    $scope.cameleon = {};
    CameleonServer.GetPicturesList().$promise.then(function(res) {
      return $scope.cameleon.picturesList = res.list;
    });
    return $scope.load = function() {
      return CameleonServer.LoadPicture($scope.cameleon.currentPicture.id).$promise.then(function(res) {
        return $scope.cameleon.picturesStuff = res.load.list;
      });
    };
  };

  this.FixturesCtrl = function($scope, CameleonServer, MenuUtils) {
    $scope.selected = function(fixture) {
      var k, list;
      list = [];
      for (k in fixture.v.defs) {
        list.push({
          'k': k,
          'v': fixture.v.defs[k]
        });
      }
      return $scope.fixtureInfo = list;
    };
    $scope.updateFixture = function(id, fixinfo) {
      var e, _i, _len;
      $scope.fixtures[id].defs = {};
      for (_i = 0, _len = fixinfo.length; _i < _len; _i++) {
        e = fixinfo[_i];
        $scope.fixtures[id].defs[e.k] = e.v;
      }
      return CameleonServer.UpdateFixtures($scope.fixtures).$promise.then(function(evt) {
        return alert('Updated !');
      });
    };
    $scope.remove = function(index, fixinfo) {
      return fixinfo.splice(index, 1);
    };
    $scope.addFixture = function(name) {
      $scope.fixtures[name] = {
        'defs': {},
        'knobs': {}
      };
      return CameleonServer.UpdateFixtures($scope.fixtures).$promise.then(function(evt) {
        return $scope.getfixtures(function() {
          $scope.fixtureInfo = null;
          return $scope.fixtureEntry = MenuUtils.UpdateMenu($scope.cameleon.fixtureList, name);
        });
      });
    };
    $scope.addKey = function(stuff, id) {
      var obj;
      obj = JSON.parse(stuff);
      $scope.fixtures[id].defs[obj.k] = '';
      if (obj.v !== '') {
        $scope.fixtures[id].knobs[obj.k] = {
          'fgColor': obj.v
        };
      }
      return CameleonServer.UpdateFixtures($scope.fixtures).$promise.then(function(evt) {
        return $scope.getfixtures(function() {
          var createFixture;
          $scope.selected($scope.fixtureEntry);
          $scope.fixtureEntry = MenuUtils.UpdateMenu($scope.cameleon.fixtureList, id);
          return createFixture = false;
        });
      });
    };
    return $scope.addCustom = function(stuff, id) {
      $scope.fixtures[id].defs[stuff] = '';
      return CameleonServer.UpdateFixtures($scope.fixtures).$promise.then(function(evt) {
        return $scope.getfixtures(function() {
          $scope.selected($scope.fixtureEntry);
          return $scope.fixtureEntry = MenuUtils.UpdateMenu($scope.cameleon.fixtureList, id);
        });
      });
    };
  };

  this.DevicesCtrl = function($scope, CameleonServer, MenuUtils) {
    $scope.updateFixture = function(machine) {
      return machine.v.fixture = $scope.fixtureEntry.id;
    };
    $scope.selected = function(machine) {
      return $scope.fixtureEntry = MenuUtils.UpdateMenu($scope.cameleon.fixtureList, machine.v.fixture);
    };
    $scope.addDevice = function() {
      $scope.devices[$scope.devName] = {
        channel: '',
        fixture: ''
      };
      $scope.createDevice = false;
      return CameleonServer.UpdateDevices($scope.devices).$promise.then(function(evt) {
        return $scope.getdevices();
      });
    };
    $scope.updateDevices = function() {
      return CameleonServer.UpdateDevices($scope.devices).$promise.then(function(evt) {
        return alert('Update done !');
      });
    };
    return $scope.fixtureEntry = {};
  };

  this.DevFixCtrl = function($scope, CameleonServer) {
    $scope.getfixtures = function(cb) {
      return CameleonServer.GetFixtures().$promise.then(function(res) {
        var k, list, v, _ref;
        $scope.fixtures = res.fixtures;
        list = [];
        _ref = res.fixtures;
        for (k in _ref) {
          v = _ref[k];
          list.push({
            'id': k,
            'v': v
          });
        }
        $scope.cameleon.fixtureList = list;
        return cb();
      });
    };
    $scope.getdevices = function() {
      return CameleonServer.GetDevices().$promise.then(function(res) {
        var k, list, v, _ref;
        $scope.devices = res.devices;
        list = [];
        _ref = res.devices;
        for (k in _ref) {
          v = _ref[k];
          list.push({
            'id': k,
            'v': v
          });
        }
        return $scope.cameleon.machinesList = list;
      });
    };
    $scope.getdevices();
    return $scope.getfixtures(function() {});
  };

  this.SoundsCtrl = function($scope, CameleonServer, $upload) {
    $scope.getsounds = function() {
      return CameleonServer.GetSounds().$promise.then(function(res) {
        var k, list, v, _ref;
        $scope.sounds = res.sounds;
        list = [];
        _ref = res.sounds;
        for (k in _ref) {
          v = _ref[k];
          list.push({
            'id': k,
            'v': v
          });
        }
        return $scope.soundlist = list;
      });
    };
    $scope.updateSounds = function(id, soundinfo) {
      return CameleonServer.UpdateSounds($scope.sounds).$promise.then(function(res) {
        return alert('Updated !');
      });
    };
    $scope.addSound = function() {
      $scope.sounds[$scope.sndName] = {
        card: '',
        defLevel: '',
        loop: false,
        position: '',
        songFile: '',
        songName: ''
      };
      $scope.createSound = false;
      return CameleonServer.UpdateSounds($scope.sounds).$promise.then(function(evt) {
        return $scope.getsounds();
      });
    };
    $scope.onFileSelect = function($files) {
      var file, i;
      i = 0;
      while (i < $files.length) {
        file = $files[i];
        $scope.upload = $upload.upload({
          url: "/cameleon/upload",
          file: file
        }).progress(function(evt) {
          console.log("percent: " + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {
          console.log(data);
          $scope.soundEntry.v.songFile = data.name;
        });
        i++;
      }
    };
    return $scope.getsounds();
  };

  this.CamMachinesCtrl = function($scope, CameleonServer) {
    $scope.findMachine = function(id) {
      var ix, m, _i, _len, _ref;
      ix = 0;
      _ref = $scope.cameleon.machines;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        if (m.id === id) {
          return ix;
        }
        ix++;
      }
      return -1;
    };
    CameleonServer.GetMachinesList().$promise.then(function(res) {
      $scope.cameleon.machinesList = res.list;
      return $scope.cameleon.currentMachine = $scope.cameleon.machinesList[0];
    });
    $scope.addMachine = function(currentMachine) {
      var index;
      index = $scope.findMachine(currentMachine.id);
      if (index !== -1) {
        return;
      }
      currentMachine.setting = '';
      $scope.cameleon.machines.push(currentMachine);
    };
    return $scope.removeMachine = function(currentMachine) {
      var index;
      index = $scope.findMachine(currentMachine.id);
      if (index === -1) {
        return;
      }
      $scope.cameleon.machines.splice(index, 1);
      $scope.cameleon.curMachine = null;
    };
  };

  this.CamAssociateCtrl = function($scope, CameleonServer) {
    $scope.cameleon.curMachine = null;
    $scope.LoadAllCameleon();
    $scope.selectMachine = function(machine) {
      $scope.cameleon.curMachine = machine;
      return CameleonServer.SetFaderSetting(machine.id, machine.setting);
    };
    return $scope.update_setting = function(newSetting) {
      var m, _i, _len, _ref, _results;
      _ref = $scope.cameleon.machines;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        if (m === $scope.cameleon.curMachine) {
          _results.push(m.setting = newSetting);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
  };

  this.SceneCtrl = function($scope, CameleonServer, MenuUtils) {
    $scope.showCreate = false;
    $scope.$watch('cameleon.scenesList', function(n, o) {
      if ($scope.cameleon.currentScene === null) {
        return;
      }
      return $scope.cameleon.currentScene = MenuUtils.UpdateMenu($scope.cameleon.scenesList, $scope.cameleon.currentScene.id);
    });
    $scope.showNew = function() {
      return $scope.showCreate = true;
    };
    $scope.addScene = function(scene) {
      return CameleonServer.CreateScene(scene).$promise.then(function(evt) {
        return CameleonServer.GetSceneList().$promise.then(function(res) {
          $scope.cameleon.currentScene.id = scene;
          $scope.cameleon.scenesList = res.list;
          return $scope.showCreate = false;
        });
      });
    };
    $scope.record = function() {
      return CameleonServer.RecordScene($scope.cameleon.currentScene.id, $scope.cameleon.machines).$promise.then(function(evt) {
        return alert('Scene recorded !');
      });
    };
    return $scope.load = function() {
      var r;
      if ($scope.cameleon.currentScene.id === null) {
        return;
      }
      r = window.confirm('Do you want to load ?');
      if (r === true) {
        return $scope.LoadScene();
      } else {
        return alert('Beware !');
      }
    };
  };

  this.PicturesCtrl = function($scope, CameleonServer) {
    $scope.LoadAllCameleon();
    $scope.cameleon.currentScene = $scope.cameleon.scenesList[0];
    $scope.cameleon.currentSound = $scope.cameleon.soundslist[0];
    $scope.load = function() {
      return $scope.LoadScene();
    };
    $scope.findStuff = function(id, type) {
      var ix, s, _i, _len, _ref;
      ix = 0;
      _ref = $scope.cameleon.picturesStuff;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        s = _ref[_i];
        if ((s.id === id) && (s.type === type)) {
          return ix;
        }
        ix++;
      }
      return -1;
    };
    $scope.addScene = function() {
      var entry, index;
      entry = {
        'id': $scope.cameleon.currentScene.id,
        'type': 'scene'
      };
      index = $scope.findStuff(entry.id, entry.type);
      if (index !== -1) {
        return;
      }
      return $scope.cameleon.picturesStuff.push(entry);
    };
    $scope.removeScene = function() {
      var index;
      index = $scope.findStuff($scope.cameleon.currentScene.id, 'scene');
      if (index === -1) {
        return;
      }
      return $scope.cameleon.picturesStuff.splice(index, 1);
    };
    $scope.addSound = function() {
      var entry, index;
      entry = {
        'id': $scope.cameleon.currentSound.id,
        'type': 'sound'
      };
      index = $scope.findStuff(entry.id, entry.type);
      if (index !== -1) {
        return;
      }
      return $scope.cameleon.picturesStuff.push(entry);
    };
    return $scope.removeSound = function() {
      var index;
      index = $scope.findStuff($scope.cameleon.currentSound.id, 'sound');
      if (index === -1) {
        return;
      }
      return $scope.cameleon.picturesStuff.splice(index, 1);
    };
  };

  this.PicturesMngrCtrl = function($scope, CameleonServer, MenuUtils) {
    $scope.$watch('cameleon.picturesList', function(n, o) {
      if ($scope.cameleon.currentPicture === null) {
        return;
      }
      return $scope.cameleon.currentPicture = MenuUtils.UpdateMenu($scope.cameleon.picturesList, $scope.cameleon.currentPicture.id);
    });
    $scope.showNew = function() {
      return $scope.showCreate = true;
    };
    $scope.addPicture = function(picture) {
      return CameleonServer.CreatePicture(picture).$promise.then(function(evt) {
        return CameleonServer.GetPicturesList().$promise.then(function(res) {
          $scope.cameleon.currentPicture.id = picture;
          $scope.cameleon.picturesList = res.list;
          return $scope.showCreate = false;
        });
      });
    };
    $scope.record = function() {
      return CameleonServer.RecordPicture($scope.cameleon.currentPicture.id, $scope.cameleon.picturesStuff).$promise.then(function(evt) {
        return alert('Picture recorded !');
      });
    };
    return $scope.load = function() {
      var r;
      if ($scope.cameleon.currentPicture.id === null) {
        return;
      }
      r = window.confirm('Do you want to load ?');
      if (r === true) {
        return $scope.LoadPicture();
      } else {
        return alert('Beware !');
      }
    };
  };

  this.CameleonCtrl = function($scope, CameleonServer) {
    $scope.cameleon = {};
    $scope.LoadAllCameleon = function() {
      $scope.cameleon.machines = [];
      $scope.cameleon.currentScene = {
        id: null,
        name: ''
      };
      CameleonServer.GetSceneList().$promise.then(function(res) {
        return $scope.cameleon.scenesList = res.list;
      });
      $scope.LoadScene = function() {
        return CameleonServer.LoadScene($scope.cameleon.currentScene.id).$promise.then(function(res) {
          $scope.cameleon.machines = res.load.list;
          return $scope.cameleon.curMachine = $scope.cameleon.machines[0];
        });
      };
      $scope.cameleon.picturesStuff = [];
      $scope.cameleon.currentPicture = {
        id: null
      };
      CameleonServer.GetPicturesList().$promise.then(function(res) {
        return $scope.cameleon.picturesList = res.list;
      });
      $scope.LoadPicture = function() {
        return CameleonServer.LoadPicture($scope.cameleon.currentPicture.id).$promise.then(function(res) {
          return $scope.cameleon.picturesStuff = res.load.list;
        });
      };
      $scope.cameleon.currentSound = {
        id: null,
        name: ''
      };
      CameleonServer.GetSoundList().$promise.then(function(res) {
        return $scope.cameleon.soundslist = res.list;
      });
      $scope.cameleon.currentSound = {
        id: null,
        name: ''
      };
      return CameleonServer.GetSoundList(true).$promise.then(function(res) {
        return $scope.cameleon.associatesoundslist = res.list;
      });
    };
    return $scope.LoadAllCameleon();
  };

  this.MainCtrl = function($scope, $http, $q, $resource, sessionMngr) {
    var CreateSession, DmxCancel, DmxEvents, DmxPanic, Events, Query, ReloadProfile, SndCancel, SndPanic, dmxpromise, sndpromise;
    SndPanic = $resource('/sounds/panic');
    DmxPanic = $resource('/dmx/panic');
    Query = $resource('/models/scenes');
    CreateSession = $resource('/scenic/newsession');
    ReloadProfile = $resource('/cfg/reloadprofiles');
    Query.get({}, function(res) {
      return $scope.entries = res.scenes;
    });
    if (!sessionMngr.IsConnected()) {
      CreateSession.get({}, function(res) {
        sessionMngr.SetConnected(res.id);
        return $http.defaults.headers.post['SessionId'] = res.id;
      });
    }
    $scope.soundPanic = function() {
      return SndPanic.get({}, function() {});
    };
    $scope.dmxPanic = function() {
      return DmxPanic.get({}, function() {});
    };
    SndCancel = $q.defer();
    DmxCancel = $q.defer();
    sndpromise = SndCancel.promise;
    sndpromise.then(function() {});
    dmxpromise = DmxCancel.promise;
    dmxpromise.then(function() {});
    $scope.reloadProfile = function() {
      return ReloadProfile.get({}, function() {
        return alert('Profiles loaded !');
      });
    };
    Events = $resource('/sounds/events', {}, {
      'get': {
        method: 'POST',
        timeout: sndpromise
      }
    });
    DmxEvents = $resource('/dmx/events', {}, {
      'get': {
        method: 'POST',
        timeout: dmxpromise
      }
    });
    $scope.getSoundEvent = function() {
      $scope.promiseGetSnd = Events.get({});
      return $scope.promiseGetSnd.$promise.then(function(evt) {
        $scope.$broadcast(evt.evt, evt);
        return $scope.getSoundEvent();
      });
    };
    $scope.getDmxEvent = function() {
      $scope.promiseGetDmx = DmxEvents.get({});
      return $scope.promiseGetDmx.$promise.then(function(evt) {
        $scope.$broadcast(evt.evt, evt);
        return $scope.getDmxEvent();
      });
    };
    $scope.getSoundEvent();
    return $scope.getDmxEvent();
  };

}).call(this);

/*
//@ sourceMappingURL=sceniq.map
*/
