/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['ojs/ojcore', 'knockout', 'jquery', 'appController'],
    function(oj, ko, $, app) {
        function HomeChild1ViewModel() {
            var self = this;
            self.goBack = function() {
                window.history.back();
            };
            self.goHome = function() {
                app.router.go('home');
            };
            self.goHomeChild1 = function() {
                app.router.go('homechild_1');
            };
//            self.handleActivated = function(info){
//                var currentValue = app.router.currentValue();
//                console.log("currentValue: " + JSON.stringify(currentValue));
//                var routeState = app.router.currentState();
//                var value = routeState.value;
//                console.log("value: " + JSON.stringify(value));
//                value.newKey = 'new value'; // call by reference....
//                var data = app.router.retrieve();
//                console.log("data: " + JSON.stringify(data));
//                data.newKey = 'new value';
//                app.router.store(data);
//            };
        }
    return new HomeChild1ViewModel();
    }
);
