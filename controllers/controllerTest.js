app.controller("ctrlTest", function ($scope, $http) {
  $scope.courses = [];
  $scope.course = {
    Id: "",
    Name: "",
    Logo: ""
  }
  const api = 'db/Subjects.js';
  $http.get(api) 
      .then(function (response) {
          $scope.courses = response.data;
      })
      .catch(function (error) {
          console.log(error);
      });
      // Phân trang
      $scope.begin = 0;
      var pageSelectInit = document.querySelector('.nav-page__icon');
      pageSelectInit.classList.add('nav-select');
      var navPagesSelect = document.querySelectorAll('.nav-page__icon');
      navPagesSelect.forEach( function(navPageSelect) {
          navPageSelect.onclick = function() {
              for( var i = 0; i < navPagesSelect.length; i++) {
                  navPagesSelect[i].classList.remove('nav-select')
              }
              navPageSelect.classList.add('nav-select');
              // Nhận số trang người dùng Click vào
              var getPage = navPageSelect.querySelector('a');
              var getNum = getPage.innerText;
              switch(getNum) {
                          case '1': {
                              $scope.begin = 0;
                              break;
                          }
                          case '2': {
                              $scope.begin = 6;
                              break;
                          }
                          case '3': {
                              $scope.begin = 12;
                              break;
                          }
                          case '4': {
                              $scope.begin = 18;
                              break;
                          }
                      }
          }
      })
});
