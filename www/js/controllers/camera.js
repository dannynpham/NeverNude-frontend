neverNude.controller('CameraController', function($scope, $cordovaCamera, $http, $jrCrop) {

  $scope.takePicture = function() {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      // allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 400,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };



    $cordovaCamera.getPicture(options).then(function(imageData) {
      // var image = document.getElementById('myImage');
      // image.src = "data:image/jpeg;base64," + imageData;

      $jrCrop.crop({
        url: imageData,
        width: 400,
        height: 300
      }).then(function(canvas) {
        alert('woooo');
        image = canvas.toDataURL();
      }, function() {
        alert('booo');
      });

      crop(imageData);

      item = JSON.stringify({item: {user_id: '1', section_id: '2', image: image}})

      $http.post('https://nevernude.herokuapp.com/sections/2/items', item, {
        headers: {'Content-Type': 'application/json'}
      })
      .success(function(data) {
        alert('image was successfully uploaded');
      })
    });
  };
});
