// check pass
//   camelCase
app.directive("checkPassword", function () {
  return {
    require: "ngModel",
    link: function (scope, element, attr, controller) {
      const fnValidate = function (value) {
        if (value.length >= 8) {
          controller.$setValidity("check_password", true);
        } else {
          controller.$setValidity("check_password", false);
        }

        return value;
      };
      controller.$parsers.push(fnValidate);
    },
  };
});
// module
app.controller("ctrlAdmin", function ($scope, $http) {
  $scope.users = [];
  $scope.user = {
    id: "",
    username: "",
    password: "",
    fullname: "",
    email: "",
    gender: "",
    birthday: "",
    marks: "",
  };
  $scope.courses = [];
  $scope.course = {
    id :"",
    Id : "",
    Name : "",
    Logo : "",
  };
  $scope.quizs = [];
  $scope.quiz = {
    id: "",
    Text: "",
    Marks: "",
    AnswerId: "",
    Answers: [
     {
      Id: "",
      Text: ""
     },
     {
      Id: "",
      Text: ""
     },
     {
      Id: "",
      Text: ""
     },
     {
      Id: "",
      Text: ""
     }
    ]
  }

  $scope.isSuccess = false;
  $scope.message = "";
  $scope.index = -1;
  // $scope.fullname  ;

  // handler API Account

  const apiAccount = "https://620fbe2aec8b2ee2834b77d0.mockapi.io/api/Account";
  $http.get(apiAccount)
    .then(function (res) {
    $scope.users = res.data;
  }).catch(function(error){
    console.log(error);
  });
    // handler API Course

    const apiCourse = "db/Subjects.js";
    $http.get(apiCourse)
      .then(function (res) {
      $scope.courses = res.data;
    }).catch(function(error){
      console.log(error);
    });
    // handler API Quizs

    const apiQuiz = "https://620fbe2aec8b2ee2834b77d0.mockapi.io/api/ADAV";
    $http.get(apiQuiz)
      .then(function (res) {
      $scope.quizs = res.data;
    }).catch(function(error){
      console.log(error);
    });
  // Hàm xử lý đăng nhập
  $scope.submitLogin = function(event){
    event.preventDefault();
    $scope.flag = false;
    for (var i = 0; i < $scope.users.length; i++) {
      // Validate
      if ($scope.user.username == $scope.users[i].username && $scope.user.password == $scope.users[i].password) {
        $scope.flag = true;
        const nameUser =  $scope.users[i].fullname;
        console.log(nameUser)
        $scope.isLogin = function() {
          $scope.user.fullname = nameUser;
        }
      } 
    }
    if($scope.flag) {
      Swal.fire(
        '',
        'Đăng nhập thành công',
        'success'
      )
      window.location.href= "#home";
      $scope.isLogin();
    } else {
      Swal.fire(
        '',
        'Đăng nhập thất bại',
        'error'
      )
    }
  };

  // Fotget password
  $scope.getindex = 0;
  $scope.getpass = (getemail, getUsername) => {
    for (var i = 0; i < $scope.users.length; i++) {
      if (getemail == $scope.users[i].email && getUsername == $scope.users[i].username) {
        $scope.getindex = i;
        Swal.fire(
          'Mật khẩu của bạn',
          '' + $scope.users[$scope.getindex].password,
          'success'
          )
        break;
      } else {
          Swal.fire(
            '',
            'Vui lòng kiểm tra lại Email hoặc tên tài khoản',
            'error'
          )
      }
    }

    // $scope.flagpass == 1 ? Swal.fire(
    //                       'Mật khẩu của bạn',
    //                       '' + $scope.users[$scope.getindex].password,
    //                       'success'
    //                       ): 
    //                       Swal.fire(
    //                         '',
    //                         'Nhập sai mã xác nhận',
    //                         'error'
    //                       )
  };

  // Hàm xử lý Đăng Ký - Xử lý trường hợp nhập lại mật khẩu không chính xác
  $scope.submitSignup = function(event) {
  // event.preventDefault();
  // HANDLER SIGNUP
  $scope.repassword;
  // validate
  if($scope.repassword != $scope.user.password) {
    Swal.fire(
      '',
      'Mật khẩu không trùng khớp',
      'error'
    )
    $scope.isSuccess = false;
    return
  }
  // Add new a account
  // Gửi request dạng POST kèm dữ liệu tới API
  $http.post(apiAccount, $scope.user)
  .then(function (response) {
    // Thông báo thành công
    $scope.isSuccess = true;
    $scope.message = "Đăng ký tài khoản thành công";
    // Thêm vào mảng Users
    $scope.users.push(response.data);
 })
};

  // ACCOUNT
  $scope.onFormSubmitAccount = function(event){
    event.preventDefault();
    if($scope.index == -1) {
      // Add new a account
      // Gửi request dạng POST kèm dữ liệu tới API
      $http.post(apiAccount, $scope.user)
      .then(function (response) {
        // Thông báo thành công
        Swal.fire(
          '',
          'Thêm mới tài khoản thafnhh công',
          'success'
        )
        $scope.onClearAccount();
        // Thêm vào table
        $scope.users.push(response.data);
     })
      } else {
        Swal.fire(
          '',
          'Cập nhập thành công',
          'success'
        )
        const id = $scope.users[$scope.index].id;
        $http.put("https://620fbe2aec8b2ee2834b77d0.mockapi.io/api/Account/" +id,$scope.user);
        $scope.users[$scope.index] = angular.copy($scope.user); // update to table
      }
  }

 



});
