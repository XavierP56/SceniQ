# Copyright Xavier Pouyollon 2014
# GPL v3 License

# This file contains the model. Will get away in a soon future.

dmx_model = {
    "1": {"channel": 1,
          "defs": {
              "dimmer": 1,
              "red": 3,
              "green": 4,
              "blue": 5
          },
          "inits": {
              "dimmer": 255,
              "red": 255,
              "green": 254,
              "blue": 253
          }
    }
}

dmx_setting = {
    "setting_red" : {
        "dimmer":255,
        "red":255,
        "green":0,
        "blue":0
    },
    "setting_green" : {
        "dimmer":255,
        "red":0,
        "green":255,
        "blue":0
    },
    "setting_green_clair" : {
        "dimmer":85,
        "red":111,
        "green":174,
        "blue":113
    },
    "setting_blue" : {
        "dimmer":255,
        "red":0,
        "green":0,
        "blue":255
    }
}

dmx_light = {
    'light1' : {
        'id' : 1,
        'name' : 'En rouge',
        'setting' : 'setting_red'
    },
    'light2' : {
        'id' : 1,
        'name' : 'En vert',
        'setting' : 'setting_green'
    },
    'light3' : {
        'id' : 1,
        'name' : 'Vert clair',
        'setting' : 'setting_green_clair'
    },
    'light4' : {
        'id' : 1,
        'name' : 'En bleu',
        'setting' : 'setting_blue',
        'transition' : True,
        'delay' : 2
    }
}

sounds = {
    "1" : {
        'songFile' : "Gnomes deform.wav",
        'songName' : "Visteurs...",
        'position' : 'l',
        'loop' : False,
        'card' : 0,
        'defLevel' : 100
    },
    "2" : {
        'songFile' : "02_ Hall-Master 16bits.wav",
        'songName' : "Musique principale",
        'position' : 's',
        'loop' : True,
        'card' : 0,
        'defLevel' : 100
    },
    "3" : {
        'songFile' : "11_ Taupe.wav",
        'songName' : "Taupe (boucle)",
        'position' : 'r',
        'loop' : True,
        'card' : 0,
        'defLevel' : 100
    },
    "4" : {
        'songFile' : "08_ Porte se ferme.wav",
        'songName' : "La porte !",
        'position' : 'l',
        'loop' : False,
        'card' : 1,
        'defLevel' : 100
    },
    "5" : {
        'songFile' : "10_ Train.wav",
        'songName' : "Train (boucle)",
        'position' : 's',
        'loop' : True,
        'card' : 0,
        'defLevel' : 80
    },
    "6" : {
        'songFile' : "09_ Explosion.wav",
        'songName' : "Explosion",
        'position' : 's',
        'loop' : False,
        'card' : 0,
        'defLevel' : 100
    },
    "7" : {
        'songFile' : "12_ rire gnome.wav",
        'songName' : "Rire (boucle)",
        'position' : 's',
        'loop' : True,
        'card' : 0,
        'defLevel' : 90
    },
    "8" : {
        'songFile' : "Gnomes2 deform.wav",
        'songName' : "Fin",
        'loop' : False,
        'position' : 'r',
        'card' : 1,
        'defLevel' : 100
    }
}
