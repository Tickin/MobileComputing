/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['ojs/ojcore', 'knockout', 'jquery','appController'],
    function(oj, ko, $, app) {
        function HomeViewModel() {
        var self = this;
        //self.handleActivated = function(info) { };
        //self.handleAttached = function(info) { };
        //self.handleBindingsApplied = function(info) { };
        //self.handleDetached = function(info) { };
        }
        
        self.goChild1 = function() {
            console.log('go child1');
            var color = {color: 'green'};
            app.router.store(color);
            var routeState = app.router.getState('homechild_1');
            console.log(routeState);
            routeState.value = {key1: 'value1', key2: 'value2'};
            console.log(routeState.value);
            
            
            app.router.go('homechild_1');           
        };
        self.goChild2 = function() {
            app.router.go('homechild_2');           
        };
        
    return new HomeViewModel();
    }
);
