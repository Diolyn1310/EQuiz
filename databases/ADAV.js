// QUIZZ

app.controller("ctrlADAV", function ($scope, $http) {
  $scope.title = "Lập trình Android nâng cao";
  $scope.srcs = [];
  $scope.src = {
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
  };
  // Code xử lý load câu hỏi lên Page
  $scope.getApi = function() {
      // Get API
      const api ='https://620fbe2aec8b2ee2834b77d0.mockapi.io/api/ADAV';
      $http.get(api) // Gửi request dạng GET lên API
          .then(function (response) {
              $scope.srcs = response.data.filter(function(us){
                return us.id == $scope.ID;
              });  
              $scope.len= 10; 
      });
  }
  
  $scope.showQuestion = function() {
        $scope.limitSentence = true;
        $scope.isShow = false;
        $scope.start();
        $scope.getApi();
  }

  $scope.ID = 1;
  $scope.totalMark= 0;
  $scope.len = 0; 
  $scope.isShow = true;
  $scope.limitSentence = true;


  // function next
  $scope.nextQuestion = function() {
    $scope.ID++;
    if($scope.ID > 10) {
      $scope.limitSentence = false;
    }
    $scope.getApi();
    if($scope.ID > $scope.len) {
      Swal.fire({
        position: 'center center',
        icon: 'success',
        title: 'Bạn đã hoàn thành bài thi',
        showConfirmButton: false,
        timer: 3500
      })
    }
  };
  // function check - Cách tính điểm
  $scope.check = function () {
    if (!$("input[name = answer]:checked").length) {
      Swal.fire(
        '',
        'Vui lòng chọn câu hỏi?',
        'question'
      )
      return;
    }
    var answ = $("input[name = answer]:checked").val();
    $scope.flag = false;
    for (var i = 0; i < $scope.srcs.length; i++) {
      if (answ == $scope.srcs[i].AnswerId) {
        $scope.totalMark++;
        $scope.flag = true;
      } 
    };
    $scope.flag ?  Swal.fire(
                      '',
                      'Câu trả lời chính xác',
                      'success'
                    ) :
                    Swal.fire(
                      '',
                      'Câu trả lời sai',
                      'error'
                    )
     $scope.nextQuestion();
  };
$scope.viewResult = function() {
  Swal.fire(
    '',
    'Điểm của bạn là: ' + $scope.totalMark,
    'Success'
  )
}
  // countdown from stackoverflow:))
// https://stackoverflow.com/questions/20618355/how-to-write-a-countdown-timer-in-javascript  
  $scope.start = function() {
  let timer = 60 * 1,
  minutes,
  seconds;
  const myTimer = setInterval(function () {
  minutes = parseInt(timer / 60, 10);
  seconds = parseInt(timer % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10? "0" + seconds : seconds;

  const txtContent = document.querySelector("#mytime").textContent = (minutes + ":" + seconds);

  if (--timer < 0) {
    timer = 60*1;
  }

  if (txtContent == "00:00") {
    Swal.fire(
      'Hết giờ!',
      '',
      'error'
    )
    clearInterval(myTimer);
  }
  }, 1000);
  };

});
