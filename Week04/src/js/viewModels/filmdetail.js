/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojtabs', 'ojs/ojinputtext', 'ojs/ojlistview', 'ojs/ojarraytabledatasource'],
    function(oj, ko, $, app) {
        function FilmDetailViewModel() {
            var self = this;
            
            self.title = ko.observable();
            self.episode_id = ko.observable();
            self.opening_crawl = ko.observable();
            self.director = ko.observable();
            self.producer = ko.observable();
            self.release_date = ko.observable();
            
            self.characters = ko.observableArray();
            self.characterDataSource = new oj.ArrayTableDataSource(self.characters, {idAttribute: "url"});
            
            self.planets = ko.observableArray();
            self.planetDataSource = new oj.ArrayTableDataSource(self.planets, {idAttribute: "url"});
            
            self.starships = ko.observableArray();
            self.starshipDataSource = new oj.ArrayTableDataSource(self.starships, {idAttribute: "url"});
            
            // 화면에 출력되는 변수 정의
            self.handleActivated = function(info) { // 데이터를 읽어 오는 로직 구현
                var url = app.router.retrieve();
                console.log(url);
                
                $.get(url, function(json, status){
                    self.title(json.title);
                    self.episode_id(json.episode_id);
                    self.opening_crawl(json.opening_crawl);
                    self.director(json.director);
                    self.producer(json.producer);
                    self.release_date(json.release_date);
                    
                    self.characters([]);
                    for(var idx in json.characters) {
                        if(idx >= 5)
                            break;
                        
                        var characterUrl = json.characters[idx];
                        $.get(characterUrl, null, function(character, status) {
                            self.characters.push({name: character.name,
                                height: character.height,
                                mass: character.mass,
                                birth_year: character.birth_year,
                                gender: character.gender,
                                url: character.url
                            });
                        });
                    }
                    
                    self.planets([]);
                    for(var idx in json.planets) {
                        if(idx >= 5)
                            break;
                        
                        var planetUrl = json.planets[idx];
                        $.get(planetUrl, null, function(planet, status) {
                            self.planets.push({name: planet.name,
                                diameter: planet.diameter,
                                climate: planet.climate,
                                gravity: planet.gravity,
                                population: planet.population,
                                url: planet.url
                            });
                        });
                    }
                });
            };
        //self.handleAttached = function(info) { };
        //self.handleBindingsApplied = function(info) { };
        //self.handleDetached = function(info) { };
        }
        return new FilmDetailViewModel();
    }
);

