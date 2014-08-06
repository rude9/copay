'use strict';

angular.module('copayApp.controllers').controller('VersionController', 
    function($scope, $rootScope, $http, notification) {

    $scope.version = copay.version;
    $scope.networkName = config.networkName;

    $http.get('https://api.github.com/repos/bitpay/copay/tags').success(function(data) {
      var toInt = function(s) {
        return parseInt(s);
      };
      var latestVersion = data[0].name.replace('v', '').split('.').map(toInt);
      var currentVersion = copay.version.split('.').map(toInt);
      var title = 'Copay ' + data[0].name + ' available.';
      var content;
      if (currentVersion[0] < latestVersion[0]) {
        content = 'It\'s important that you update your wallet at https://copay.io';
        notification.version(title, content, true);
      } else if (currentVersion[0] == latestVersion[0] && currentVersion[1] < latestVersion[1]) {
        var content = 'Please update your wallet at https://copay.io';
        notification.version(title, content, false);
      }
    });

  });
