/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';

/**
 * Example of Require.js boostrap javascript
 */

requirejs.config(
{
  baseUrl: 'js',

  // Path mappings for the logical module names
  paths:
  //injector:mainReleasePaths
  {
    'knockout': 'libs/knockout/knockout-3.4.0.debug',
    'jquery': 'libs/jquery/jquery-3.1.0',
    'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.0',
    'promise': 'libs/es6-promise/es6-promise',
    'hammerjs': 'libs/hammer/hammer-2.0.8',
    'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0',
    'ojs': 'libs/oj/v2.1.0/debug',
    'ojL10n': 'libs/oj/v2.1.0/ojL10n',
    'ojtranslations': 'libs/oj/v2.1.0/resources',
    'text': 'libs/require/text',
    'signals': 'libs/js-signals/signals'
  }
  //endinjector
  ,
  // Shim configurations for modules that do not expose AMD
  shim:
  {
    'jquery':
    {
      exports: ['jQuery', '$']
    }
  }
}
);

/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */
require(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojknockout',
  'ojs/ojmodule', 'ojs/ojrouter', 'ojs/ojnavigationlist', 'ojs/ojbutton'],
  function (oj, ko, $, app) { // this callback gets executed when all required modules are loaded

    function MainViewModel() {
      var self = this;
      self.router = app.router;
      self.navDataSource = app.navDataSource;
      self.navChangeHandler = app.navChangeHandler;
      self.toggleDrawer = app.toggleDrawer;

      // Sample user data
      self.userName = ko.observable("James");
      
      self.profileAvatar = ko.observable("css/images/james_avatar.png");
      
      (function(){
        $.ajax({
            url: 'https://mcsoraclejet-busanuniv.mobileenv.us2.oraclecloud.com:443/mobile/platform/storage/collections/SLR_ProfileCollection/objects/profile_image?user=f97f246c-1503-4179-a4f1-421e4bb20aca',
            method: "GET",
            headers: {
                "oracle-mobile-backend-id": "619cfcb8-c2ef-4f58-ad73-34422b95a783",
                "Authorization": "Basic Y3JlZGVtb2xAeWFob28uY29tOk9kaGZrem1mMSE="
            }
        }).done(function(data, statusCode) {
            self.profileAvatar("data:image/jpeg;base64," + data);
        }).fail(function(xhr, statusCode) {
            console.log("ERROR: " + statusCode);
        }());
      
      self.takeProfilePicture = function(){
          console.log("takeProfilePicture");
          if(navigator.camera && typeof navigator.camera !== "undefined"){
              var cameraOptions = {
                  quality: 50,
                  destinationType: Camera.DestinationType.DATA_URL,
                  sourceType: Camera.PictureSourceType.CAMERA,
                  allowEdit: false,
                  targetWidth: 640,
                  targetHeight:640,
                  encodingType: Camera.EncodingType.JPEG,
                  saveToPhotoAlbum: false,
                  correctOrientation: true
                };
                
                navigator.camera.getPicture(
                function(imageData) { // success callback
                // in this case, imageData should be a file path.
                    self.profileAvatar('data:image/jpeg;base64,'+imageData);
                },
                function() { // error callback.
                    alert("Errors occurred while getting a picture");
                },
                cameraOptions);
          }else{
              alert("can't use camera");
          }
      }
    }

    $(function() {
      
      function init() {
        oj.Router.sync().then(
          function () {
            // Bind your ViewModel for the content of the whole page body.
            ko.applyBindings(new MainViewModel(), document.getElementById('globalBody'));
            // Adjust the content top and bottom margins after the header bindings have been applied.
            app.adjustContentPadding();
          },
          function (error) {
            oj.Logger.error('Error in root start: ' + error.message);
          }
        );
      }

      // If running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready 
      // event before executing any code that might interact with Cordova APIs or plugins.
      if ($(document.body).hasClass('oj-hybrid')) {
        document.addEventListener("deviceready", init);
      } else {
        init();
      }

    });

  }
);
