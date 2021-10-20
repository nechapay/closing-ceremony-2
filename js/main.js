;
Array.prototype.shuffle = function () {
  for (var i = this.length - 1; i > 0; i--) {
    var num = Math.floor(Math.random() * (i + 1));
    var d = this[num];
    this[num] = this[i];
    this[i] = d;
  }
  return this;
};

window.addEventListener('load', function (e) {
  $('#start').on('click', function () {
    app.setClosing();
    app.setWinners();
    app.ignition();
    //$('.place').addClass('in');
    // $(this).off('click');
    // var el = document.documentElement,
    //     rfs = el.requestFullscreen
    //         || el.webkitRequestFullScreen
    //         || el.mozRequestFullScreen
    //         || el.msRequestFullscreen
    // ;
    //
    // rfs.call(el);
    playAudio('audioGimn');
    $('.controls-container').addClass('hide');
  });
  $('#setting').on('click', function () {
    $('.winners-container').removeClass('hide');
  });
  $('#close').on('click', function () {
    $('.winners-container').addClass('hide');
    app.setWinners();
    app.reset();
    save();
  });
  $('#stop').on('click', function () {
    app.reset();
  });
  $('#third').on('click', function () {
    app.setViewer(winners.place3.img);
  });
  $('#second').on('click', function () {
    app.setViewer(winners.place2.img);
  });
  $('#first').on('click', function () {
    app.setViewer(winners.place1.img);
  });

  $(document).on('keypress', function (e) {
    if(e.keyCode === 49) {
      app.setViewer(winners.place1.img);
    }
    if(e.keyCode === 50) {
      app.setViewer(winners.place2.img);
    }
    if(e.keyCode === 51) {
      app.setViewer(winners.place3.img);
    }
    if(e.keyCode === 32) {
      app.setClosing();
      app.setWinners();
      app.ignition();
      playAudio('audioGimn');
      $('.controls-container').addClass('hide');
    }
  });
  //localStorage.clear();
  setTeams();
  load();
  initDrag();
  initDrop();

});

var teams = [
  {
    id: 'team1',
    name: 'Аксайский Данилы Ефремова казачий кадетский корпус',
    img: 'img/АДЕКК.png'
  },
  {
    id: 'team2',
    name: 'Владивостокское президентское кадетское училище',
    img: 'img/ВладПКУ.png'
  },
  {
    id: 'team3',
    name: 'Екатеринбургское суворовское военное училище',
    img: 'img/ЕкСВУ.png'
  },
  {
    id: 'team4',
    name: 'Кадетский корпус (инженерная школа) ВУНЦ ВВС ВВА',
    img: 'img/ВУНЦВВС.png'
  },
  {
    id: 'team5',
    name: 'Кадетская школа IT-технологий Военной академии связи',
    img: 'img/ITSchool.png'
  },
  {
    id: 'team6',
    name: 'Казанское суворовское военное училище',
    img: 'img/КСВУ.png'
  },
  {
    id: 'team7',
    name: 'Краснодарское президентское кадетское училище',
    img: 'img/КПКУ.png'
  },
  {
    id: 'team8',
    name: 'Кронштадтский морской кадетский военный корпус',
    img: 'img/КМКВК.png'
  },
  {
    id: 'team9',
    name: 'Кызылское президентское кадетское училище',
    img: 'img/КыПКУ.png'
  },
  {
    id: 'team10',
    name: 'Московское военно-музыкальное училище',
    img: 'img/МсВМУ.png'
  },
  {
    id: 'team11',
    name: 'Московское суворовское военное училище',
    img: 'img/МсСВУ.png'
  },
  {
    id: 'team12',
    name: 'Нахимовское военно-морское училище',
    img: 'img/НВМУ.png'
  },
  {
    id: 'team13',
    name: 'Нахимовское военно-морское училище г.Мурманск',
    img: 'img/МНВМУ.png'
  },
  {
    id: 'team14',
    name: 'Омский кадетский военный корпус',
    img: 'img/ОКВК.png'
  },
  {
    id: 'team15',
    name: 'Оренбургское президентское кадетское училище',
    img: 'img/ОПКУ.png'
  },
  {
    id: 'team16',
    name: 'Пермское суворовское военное училище',
    img: 'img/ПСВУ.png'
  },
  {
    id: 'team17',
    name: 'Петрозаводское президентское кадетское училище',
    img: 'img/ППКУ.png'
  },
  {
    id: 'team18',
    name: 'Санкт-Петербургский кадетский военный корпус',
    img: 'img/СПбКВК.png'
  },
  {
    id: 'team19',
    name: 'Санкт-Петербургское суворовское военное училище',
    img: 'img/СПбСВУ.png'
  },
  {
    id: 'team20',
    name: 'Севастопольское президентское кадетское училище',
    img: 'img/СевПКУ.png'
  },
  {
    id: 'team21',
    name: 'Северо-Кавказское суворовское военное училище',
    img: 'img/СевКавСВУ.png'
  },
  {
    id: 'team22',
    name: 'Ставропольское президентское кадетское училище',
    img: 'img/СПКУ.png'
  },
  {
    id: 'team23',
    name: 'Тверское суворовское военное училище',
    img: 'img/ТвСВУ.png'
  },
  {
    id: 'team24',
    name: 'Тульское суворовское военное училище',
    img: 'img/ТСВУ.png'
  },
  {
    id: 'team25',
    name: 'Тюменское президентское кадетское училище',
    img: 'img/ТюПКУ.png'
  },
  {
    id: 'team26',
    name: 'Уссурийское суворовское военное училище',
    img: 'img/УссСВУ.png'
  }
];

var groups = [
  {
    id: 'place1',
    size: 1,
    teams: []
  },
  {
    id: 'place2',
    size: 1,
    teams: []
  },
  {
    id: 'place3',
    size: 1,
    teams: []
  }
];

var winners = {
  place1 : {
    id: '',
    img: ''
  },
  place2: {
    id: '',
    img: ''
  },
  place3: {
    id: '',
    img: ''
  }
};


var app = new Vue({
  el: '#app',
  data: {
    team1: '<img src="img/team1.png">',
    team2: '<img src="img/team2.png">',
    team3: '<img src="img/team3.png">',
    teamToView: '',
    closing: false,
    viewer: false,
    inClass: ''
  },
  computed: {
    isViewerVisible: function () {
      return this.viewer;
    },
    isClosingVisible: function () {
      return this.closing;
    }
  },
  methods: {
    setWinners: function () {
      this.team1 = winners.place1.img || '<img src="img/team1.png">';
      this.team2 = winners.place2.img || '<img src="img/team2.png">';
      this.team3 = winners.place3.img || '<img src="img/team3.png">';
    },
    setViewer: function (val) {
      this.viewer = true;
      this.closing = false;
      this.teamToView = val || '<img src="img/team1.png">';
      $('.place-viewer__team').attr('class', 'place-viewer__team animated zoomIn').on('animationend', function () {
        $('.animated').attr('class', 'place-viewer__team');
      });
    },
    setClosing: function () {
      this.viewer = false;
      this.closing = true;
    },
    reset: function () {
      this.viewer = false;
      this.closing = false;
      this.inClass = '';
    },
    ignition: function () {
      this.inClass = 'in';
    }
  }
});

function setTeams() {
  var $teams = $('.teams-container');

  teams.forEach(function (item) {
    $teams.append('<div id="' + item.id + '" class="team drag">' + item.name + '</div>');
  });
}

function load() {
  winners = JSON.parse(localStorage.getItem('winners')) || {
    place1 : {
      id: '',
      img: ''
    },
    place2: {
      id: '',
      img: ''
    },
    place3: {
      id: '',
      img: ''
    }
  };
  console.log(winners);
  if(winners.place1.id !== ''){
    groups.forEach(function (item) {
      for(var key in winners) {
        if(item.id === key) {
          item.teams.push(getTeamName(winners[key].id))
          $('#' + winners[key].id).addClass('my-hide');
        }
      }
    });
    placeTeams();
    app.setWinners();
  }
}

function save() {
  localStorage.setItem('winners', JSON.stringify(winners));
}

function initDrag() {
  var $drag = $('.drag');
  $drag.draggable({
    revert: true,
    start: function () {
      $('.drop').toggleClass('highlight');
    },
    stop: function () {
      $('.drop').toggleClass('highlight');
    },
    stack: $drag
  });
}

function initDrop() {
  var $drop = $('.drop');
  $drop.droppable({
    accept: $('.drag'),
    drop: function (e, ui) {
      var id = $(this).parent().attr('id');
      var txt = $(ui.draggable).text();
      groups.forEach(function (item) {
        if (item.id === id) {
          if (item.teams.length < item.size) {
            if($(ui.draggable).hasClass('team-place')) {
              removeTeam(txt);
            } else {
              $(ui.draggable).draggable('destroy').addClass('my-hide');
            }
            item.teams.push(txt);
            placeTeams();
          }
        }
      });
    }
  });
}

function placeTeams() {
  $('.group-body').empty();
  groups.forEach(function (item) {
    item.teams.forEach(function (team) {
      $('#' + item.id).find('.group-body').append('<div class="team-place"><div class="team-place__image"><img src="'
          + getTeamImg(team) + '" alt=""></div><div class="team-place__name">'
          + team + '</div><button class="team-place__close-btn">&#x274C;</button></div>');
      winners[item.id].img = '<img src="' + getTeamImg(team) + '">';
      winners[item.id].id =  getTeamId(team);
    });
  });
  initDrag();
  initDrop();
  initRemove();
}

function removeTeam(team) {
  groups.forEach(function (item) {
    var idx = item.teams.indexOf(team);

    if(idx >= 0) {
      item.teams.splice(idx, 1);
    }
  });
}

function getTeamImg(team) {
  var result = '';
  teams.forEach(function (item) {
    if(item.name === team) result = item.img;
  });
  return result;
}

function getTeamId(team) {
  var result = '';
  teams.forEach(function (item) {
    if(item.name === team) result = item.id;
  });
  return result;
}

function getTeamName(team) {
  var result = '';
  teams.forEach(function (item) {
    if(item.id === team) result = item.name;
  });
  return result;
}

function initRemove() {
  $('.team-place').on('dblclick', function () {
    var txt = $(this).find('.team-place__name').text();
    removeTeam(txt);
    teams.forEach(function (item) {
      if(item.name === txt) {
        $('#' + item.id).removeClass('my-hide');
        placeTeams();
        initDrag();
        initDrop();
      }
    });
  });

  $('.team-place__close-btn').on('click', function () {
    var txt = $(this).parent().find('.team-place__name').text();
    removeTeam(txt);
    teams.forEach(function (item) {
      if(item.name === txt) {
        $('#' + item.id).removeClass('my-hide');
        placeTeams();
        initDrag();
        initDrop();
      }
    });
  });
}

function playAudio(audio, options) {
  options = options || {};
  var a = document.getElementById(audio);
  //a.playbackRate = options.speed || 1;

  // if(a.currentTime)
  //     a.currentTime = 0;
  $(a).off();

  var onEnded = function (e) {

  };

  a.play();
  a.addEventListener('ended', onEnded);
}
