'use strict';

/**
 * @ngdoc function
 * @name computerVisionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the computerVisionApp
 */
angular.module('computerVisionApp')
  .controller('MainCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.init = function(){
      $(function () {
        $(document).ready(function(){
          console.log('testtt');

          Webcam.attach( '#my_camera' );
          $( "#my_camera" ).find( "video").attr('id', 'my_video')

          var video = document.getElementById('my_video');
          var canvas = document.getElementById('canvas');
          var context = canvas.getContext('2d');

          var tracker = new tracking.ObjectTracker('face');
          tracker.setInitialScale(4);
          tracker.setStepSize(2);
          tracker.setEdgesDensity(0.1);

          tracking.track('#my_video', tracker, { camera: true });

          tracker.on('track', function(event) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            event.data.forEach(function(rect) {
              context.strokeStyle = '#a64ceb';
              context.strokeRect(rect.x, rect.y, rect.width, rect.height);
              context.font = '11px Helvetica';
              context.fillStyle = "#fff";
              context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
              context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
            });
          });

          var gui = new dat.GUI();
          gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
          gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
          gui.add(tracker, 'stepSize', 1, 5).step(0.1);

        })
      });
    };

    $scope.init()

  });