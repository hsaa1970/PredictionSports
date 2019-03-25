'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.PredictionCtrl
 * @description PredictionCtrl
 * @requires ng.$scope
 */
angular
    .module('core')
    .controller('PredictionCtrl',  ['$http', '$rootScope', '$scope', '$state', '$localStorage', '$translate',
        'Client', 'WebManager', '$window','Bets', 'Moment', 'iScroll', 'Competitions', 'Notification',
        function($http, $rootScope, $scope, $state, $localStorage, $translate, Client, WebManager, $window,
                 Bets, Moment, iScroll, Competitions, Notification) {

            $rootScope.$storage.settings = true;
            $scope.hasCompetition = true;
            var scrollH = null;
            var vScrolls = [];
            var _currentPage = -1;
            var _Match = -1;
            var _mBet = -1;
            var strings = {};

            var width = $window.innerWidth;
            var widthTotal = $window.innerWidth;
            $scope.getNameClient = Client.getNickname();
            $scope.points = 0;
            $scope.ddate = '';
            $scope.dhour = '';
            $scope.showSource = false;
            $scope.counter = 0;
            $scope.counterbase = 0;
            $scope.loadbaseball = false;

            var indexOrder = [];


            $scope.getEndOfTime = function(date) {
              if (date === undefined) {
                return strings['NO_MATCH'];
              } else {
                return Moment.endOf(date);
              }
            }

            function getTranslations(){

              $translate(['ALERT.SET_BET.TITLE',
                          'ALERT.SET_BET.SUBTITLE',
                          'ALERT.SET_BET.MSG',
                          'NO_MATCH'])
              .then(function(translation){
                  strings['SET_BET_TITLE'] = translation['ALERT.SET_BET.TITLE'];
                  strings['SET_BET_SUBTITLE'] = translation['ALERT.SET_BET.SUBTITLE'];
                  strings['SET_BET_MSG'] = translation['ALERT.SET_BET.MSG'];
                  strings['NO_MATCH'] = translation['NO_MATCH'];
              });

              $translate(['ALERT.MAX_BETS_REACHED.TITLE',
                          'ALERT.MAX_BETS_REACHED.SUBTITLE',
                          'ALERT.MAX_BETS_REACHED.MSG',
                          'NO_MATCH'])
              .then(function(translation){
                  strings['SET_MAX_BETS_TITLE'] = translation['ALERT.MAX_BETS_REACHED.TITLE'];
                  strings['SET_MAX_BETS_SUBTITLE'] = translation['ALERT.MAX_BETS_REACHED.SUBTITLE'];
                  strings['SET_MAX_BETS_MSG'] = translation['ALERT.MAX_BETS_REACHED.MSG'];
                  strings['NO_MATCH'] = translation['NO_MATCH'];
              });

            };

            $scope.vWrapper = {
                name:'wrapperV',
                getName : function(_index) {
                    return this.name + _index;
                }
            };

            $scope.leagues = [];
            $scope.leaguesbaseball = [];

            $scope.getWidth = function(){
                return { 'width': width + 'px'}
            };

            $scope.getTotalWidth = function(){
                return { 'width': widthTotal + 'px'}
            };

            $scope.nextPage = function(){
                scrollH.next();
            };

            $scope.prevPage = function(){
                scrollH.prev();
            };

            $scope.nextPageBase = function(_index){
                if(indexOrder.indexOf(_index) == (indexOrder.length -1)) $scope.loadbaseball = true;
                scrollH.next();
            };

            $scope.prevPageBase = function(_index){
                if(_index < 0) $scope.loadbaseball = false;
                scrollH.prev();
            };

            $scope.getDate = function (_date) {
                return Moment.dateNoUTC(_date).format('ll');
            };

            $scope.getTime = function (_date) {
                return Moment.dateNoUTC(_date).format('HH:mm');
            };

            $scope.addOne = function () {
                $scope.counter++;
                //console.log('Number is ' + $scope.counter);
            };


            $scope.addToIndex = function (_value) {
                $scope.counter++;
                indexOrder.push(_value);
                //console.log('Number is ' + $scope.counter);
            };

            $scope.addToIndexBase = function (_value) {
                $scope.counterbase++;
                //indexOrder.push(_value);
                //console.log('Number is ' + $scope.counter);
            };



            $scope.addOneBase = function () {
                
                //console.log('Number is on base' + $scope.counterbase);
            };

            $scope.getCount = function (_value) {
                //console.log('Number is ' + ($scope.counter + _value));

                return $scope.counter + _value;
                //return $scope.leagues.length + _value;
            };

             $scope.BeforeAfter = function (_value) {
                //console.log('Number is ' + ($scope.counter + _value));
                if(_value > (counter + counterbase)) return false;
                if(_value > (counter + counterbase)) return false;
                return true;
                //return $scope.leagues.length + _value;
            };

            $scope.setBet = function (_status, _bet, _iLeague ,_iFixture, _iMatch) {

                if (_status == 3) {

                    var _jLeagues = $scope.leagues[_iLeague];
                    var _jMatch = _jLeagues.fixtures[_iFixture].matches[_iMatch];

                    //var diffHours = Moment.date(_jMatch.date,'YYYYMMDDhhmmss').diff(Moment.date(Moment.date(),'YYYYMMDDhhmmss'), 'h');
                    var diffMinutes = Moment.date(_jMatch.date,'YYYYMMDDhhmmss').diff(Moment.date(Moment.date(),'YYYYMMDDhhmmss'), 'minutes');

                    //console.log('diffHours -> ' + diffHours);
                    //console.log('diffMinutes -> ' + diffMinutes);

                    /*var a = moment(_jMatch.date,'YYYYMMDDHHmmss');
                    var b = Moment.date(_jMatch.date,'YYYYMMDDhhmmss');
                    
                    var diffMinutes = a.diff(moment(), 'minutes');
                    if (Moment.GMT() > 0) var diffMinutes = b.diff(moment(), 'minutes');*/

                    /*console.warn(a.format('YYYYMMDDHHmmss'));
                    console.warn(b.format('YYYYMMDDHHmmss'));
                    console.warn(app.format('YYYYMMDDHHmmss'));*/
                    console.log('diffMinutes -> ' + diffMinutes);



                    if (diffMinutes >= 15) {
                      if (( _jMatch.id_game_matches != _Match) || (_bet != _mBet)) {
                        $scope.$emit('load');
                        if (_status == 3) {
                            if (_jMatch.bet) {
                                _jMatch.bet.client_bet = _bet;
                            } else {
                                _jMatch.bet = {client_bet: _bet};
                                if (_jLeagues.bet.total_bets > _jLeagues.bet.client_bets){
                                    _jLeagues.bet.client_bets = _jLeagues.bet.client_bets + 1;
                                }
                            }
                        }

                        _jLeagues.fixtures[_iFixture].matches[_iMatch] = _jMatch;
                        $scope.leagues[_iLeague] = _jLeagues;

                        var _jBet = {
                            'bet': {
                                'id_tournament': $scope.leagues[_iLeague].id_competitions,
                                'id_game_match': _jMatch.id_game_matches,
                                'client_bet': _jMatch.bet.client_bet
                            }
                        };

                        Bets.create(_jBet, function(data) {
                            console.log("Data apuesta: " + JSON.stringify(data));
                            if (data.error == 1) { 

                                console.log("El cliente ha llegado al maximo de apuestas");
                                _jMatch.bet.client_bet = false;

                              //   Notification.showInfoAlert({
                              //     title: strings['SET_MAX_BETS_TITLE'],
                              //     subtitle: strings['SET_MAX_BETS_SUBTITLE'],
                              //     message: strings['SET_MAX_BETS_MSG'],
                              //     type: 'warning'
                              // });

                              //colocar otra notificacion
                              Notification.showLockedSectionDialog();


                            }
                            $scope.$emit('unload');
                        }, function () {
                            $scope.$emit('unload');
                            //$scope.$emit('error');
                        });

                        _Match = _jMatch.id_game_matches;
                        _mBet = _bet;
                      }
                    } else {
                        //Enviar notificacion de no puede apostar en este match.
                      Notification.showInfoAlert({
                          title: strings['SET_BET_TITLE'],
                          subtitle: strings['SET_BET_SUBTITLE'],
                          message: strings['SET_BET_MSG'],
                          type: 'warning'
                      });
                    }
                }
            };


            $scope.setBetBaseball = function (_status, _bet, _iLeague ,_iFixture, _iMatch) {

                if (_status == 3) {

                    var _jLeagues = $scope.leaguesbaseball[_iLeague];
                    var _jMatch = _jLeagues.fixtures[_iFixture].matches[_iMatch];

                    //var diffHours = Moment.date(_jMatch.date,'YYYYMMDDhhmmss').diff(Moment.date(Moment.date(),'YYYYMMDDhhmmss'), 'h');
                    var diffMinutes = Moment.date(_jMatch.date,'YYYYMMDDhhmmss').diff(Moment.date(Moment.date(),'YYYYMMDDhhmmss'), 'minutes');

                    //console.log('diffHours -> ' + diffHours);
                    //console.log('diffMinutes -> ' + diffMinutes);

                    /*var a = moment(_jMatch.date,'YYYYMMDDHHmmss');
                    var b = Moment.date(_jMatch.date,'YYYYMMDDhhmmss');
                    
                    var diffMinutes = a.diff(moment(), 'minutes');
                    if (Moment.GMT() > 0) var diffMinutes = b.diff(moment(), 'minutes');*/

                    /*console.warn(a.format('YYYYMMDDHHmmss'));
                    console.warn(b.format('YYYYMMDDHHmmss'));
                    console.warn(app.format('YYYYMMDDHHmmss'));*/
                    console.log('diffMinutes -> ' + diffMinutes);



                    if (diffMinutes >= 15) {
                      if (( _jMatch.id_game != _Match) || (_bet != _mBet)) {
                        $scope.$emit('load');
                        if (_status == 3) {
                            if (_jMatch.bet) {
                                _jMatch.bet.client_bet = _bet;
                            } else {
                                _jMatch.bet = {client_bet: _bet};
                                if (_jLeagues.bet.total_bets > _jLeagues.bet.client_bets){
                                    _jLeagues.bet.client_bets = _jLeagues.bet.client_bets + 1;
                                }
                            }
                        }

                        _jLeagues.fixtures[_iFixture].matches[_iMatch] = _jMatch;
                        $scope.leaguesbaseball[_iLeague] = _jLeagues;

                        var _jBet = {
                            'bet': {
                                'id_tournament': $scope.leaguesbaseball[_iLeague].id_competitions,
                                'id_game_match': _jMatch.id_game,
                                'sport_id': 2,
                                'client_bet': _jMatch.bet.client_bet
                            }
                        };

                        Bets.create(_jBet, function(data) {
                            console.log("Data apuesta: " + JSON.stringify(data));
                            if (data.error == 1) { 

                                console.log("El cliente ha llegado al maximo de apuestas");
                                _jMatch.bet.client_bet = false;

                              //   Notification.showInfoAlert({
                              //     title: strings['SET_MAX_BETS_TITLE'],
                              //     subtitle: strings['SET_MAX_BETS_SUBTITLE'],
                              //     message: strings['SET_MAX_BETS_MSG'],
                              //     type: 'warning'
                              // });

                              //colocar otra notificacion
                              Notification.showLockedSectionDialog();


                            }
                            $scope.$emit('unload');
                        }, function () {
                            $scope.$emit('unload');
                            //$scope.$emit('error');
                        });

                        _Match = _jMatch.id_game_matches;
                        _mBet = _bet;
                      }
                    } else {
                        //Enviar notificacion de no puede apostar en este match.
                      Notification.showInfoAlert({
                          title: strings['SET_BET_TITLE'],
                          subtitle: strings['SET_BET_SUBTITLE'],
                          message: strings['SET_BET_MSG'],
                          type: 'warning'
                      });
                    }
                }
            };

            function mapEmptyTeamNames(fixtures){
                fixtures.forEach(function(fixture){
                    fixture.matches.map(function(match){
                        if(!match.home_team.name)
                            match.home_team.name = $scope.strings.NOT_AVAILABLE;
                        if(!match.away_team.name)
                            match.away_team.name = $scope.strings.NOT_AVAILABLE;
                    });
                });
            }

            function setEmptyLeagueFlag(league){
                if(league.fixtures.length > 0){
                    var leagueReduce = league.fixtures.reduce(function(previousValue, currentValue, index) {
                        if(index > 1){
                            return previousValue + currentValue.matches.length;
                        }else{
                            return previousValue.matches.length + currentValue.matches.length;
                        }
                    });
                    league.empty = leagueReduce <= 0;
                } else {
                    league.empty = true;
                }
            }

            function getBets(){
                //$scope.loadbaseball = false;
                if($scope.loadbaseball) return getBetsBaseball();
                var _index =  scrollH.currentPage.pageX;
                var league = $scope.leagues[_index];
                if (!league.fixtures) {
                    $scope.$emit('load');
                    Bets.get(league.id_competitions, function(data){
                        console.log("Data competicion: " + JSON.stringify(data) );
                        if (data.error == 0) {
                            data = data.response;


                            setGameStatus(data);
                            mapEmptyTeamNames(data.fixtures);
                            league.fixtures = data.fixtures;
                            league.bet = {
                                total_bets: data.total_bets,
                                client_bets : data.client_bets
                            };
                            setEmptyLeagueFlag(league);
                        }
                        $scope.$emit('unload');
                    }, function(){
                        $scope.$emit('unload');
                        league.empty = true;
                    });
                }
            }

            function getBetsBaseball(){
                var _index =  scrollH.currentPage.pageX;
                var league = $scope.leaguesbaseball[_index - $scope.counter];
                if (!league.fixtures) {
                    $scope.$emit('load');
                    Bets.getbaseball(league.id_competitions, function(data){
                        console.log("Data competicion: " + JSON.stringify(data) );
                        if (data.error == 0) {
                            data = data.response;


                            setGameStatus(data);
                            mapEmptyTeamNames(data.fixtures);
                            league.fixtures = data.fixtures;
                            league.bet = {
                                total_bets: data.total_bets,
                                client_bets : data.client_bets
                            };
                            setEmptyLeagueFlag(league);
                        }
                        $scope.$emit('unload');
                    }, function(){
                        $scope.$emit('unload');
                        league.empty = true;
                    });
                }
            }

            function setUpIScroll() {
                scrollH = iScroll.horizontal('wrapperH');

                scrollH.on('beforeScrollStart', function () {
                    this.refresh();
                });

                scrollH.on('scrollStart', function () {
                    _currentPage = this.currentPage.pageX;
                });

                scrollH.on('scroll', function () {
                    if (this.currentPage.pageX != _currentPage) {
                         getBets();
                        _currentPage = this.currentPage.pageX;
                         $scope.showSource = false;
                    }
                });

                $scope.$on('onRepeatLast', function(scope, element, attrs) {
                    $scope.showSource = true;
                    if(vScrolls != null && _currentPage >= 0) {
                        vScrolls[_currentPage] = iScroll.vertical($scope.vWrapper.getName(_currentPage));
                        $scope.$emit('unload');
                    }
                });

                $scope.$on('$destroy', function() {

                    scrollH.destroy();
                    scrollH = null;

                    vScrolls.forEach(function(scroll){
                        scroll.destroy();
                        scroll = null;
                    });
                });
            }


              $scope.showContentPrediction = function(index) {
                $scope.loadbaseball = false;
                  scrollH.refresh();
                  scrollH.goToPage(index,0);
                  $rootScope.transitionPageBack('#wrapperH', 'left');
              };

               $scope.showContentPredictionBaseball = function(index) {
                  $scope.loadbaseball = true;

                  scrollH.refresh();
                  scrollH.goToPage(index,0);
                  $rootScope.transitionPageBack('#wrapperH', 'left');
              };

            function getCompetitions(){
                Competitions.getPrediction().then(function(data){
                    $scope.points = data.points;
                    $scope.ddate = data.ddate;
                    $scope.dhour = data.dhour;
                    $scope.leagues  = data.competitions.competitions_football;
                    $scope.leaguesbaseball  = data.competitions.competitions_baseball;
                    $scope.hasCompetition = $scope.leagues.length > 0;
                    $scope.scroll = iScroll.vertical('wrapper');
                    widthTotal = ($window.innerWidth * ($scope.leagues.length+ $scope.leaguesbaseball.length));
                    setUpIScroll();
                    $scope.$emit('unload');
                }, function(){
                  $scope.$emit('unload');
                  Notification.showNetworkErrorAlert();
                });

            }


            function setGameStatus(data){
              data.fixtures.forEach(function(league){
                league.matches.forEach(function(match){
                    match.status.name = 'MATCH.STATUS.' + match.status.id_status;
                });
              });
            }

            function init(){
                $scope.$emit('load');
                getTranslations();
                getCompetitions();
            }

            init();

        }
    ]);
