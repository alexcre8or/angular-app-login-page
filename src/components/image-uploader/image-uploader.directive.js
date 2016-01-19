(function () {

  'use strict';

  angular
    .module('app.components')
    .controller('AlexeyAppImageUploaderController', AlexeyAppImageUploaderController)
    .directive('alexeyAppImageUploader', alexeyAppImageUploader);

  function alexeyAppImageUploader() {
    return {
      restrict:    'E',
      replace:     true,
      scope:       {
        cover: '=ngModel',
        mode:  '@'
      },
      controller:  'AlexeyAppImageUploaderController',
      templateUrl: 'src/components/image-uploader/image-uploader.html'
    };
  }

  AlexeyAppImageUploaderController.$inject = ['$scope', 'API_URL', 'UPLOAD_URL', 'FileUploader', 'toastr'];

  function AlexeyAppImageUploaderController($scope, API_URL, UPLOAD_URL, FileUploader, toastr) {
    $scope.openDialog = openDialog;
    $scope.uploader = null;

    activate();

    function activate() {
      var uploadUrl = UPLOAD_URL;

      if ($scope.mode) {
        uploadUrl = uploadUrl.replace('poster', $scope.mode);
      }

      var uploaderOptions = {
        alias:             'fileUpload',
        autoUpload:        true,
        queueLimit:        1,
        removeAfterUpload: true,
        url:               uploadUrl
      };

      var uploader = new FileUploader(uploaderOptions);
      $scope.uploader = uploader;

      uploader.filters.push({
        name: 'imageFilter',
        fn:   function (item, options) {
          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
      });

      uploader.onWhenAddingFileFailed = invalidFile;
      uploader.onCompleteItem = uploadComplete;
      uploader.onErrorItem = uploadError;
    }

    function invalidFile() {
      toastr.error('Пожалуйста, выберите файл одного из следующих форматов: jpg, jpeg, png, bmp, gif.');
    }

    function uploadError() {
      toastr.error('Во время загрузки изображения произошла ошибка');
    }

    function uploadComplete(item, response) {
      if (angular.isDefined(response.name)) {
        $scope.cover = API_URL + '/' + response.tier + '/' + response.name;
      }
    }

    function openDialog(e) {
      e.preventDefault();

      var uploaderElem = angular.element('#cover-upload');
      uploaderElem.trigger('click');
    }
  }

})();
