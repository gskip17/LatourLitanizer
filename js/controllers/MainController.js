app.controller('MainController',['$scope',function($scope){
  $scope.titles = [];
  $scope.number = 10;
  var getRandomArticleTitle = function(){
    var mwjs = MediaWikiJS('https://en.wikipedia.org');
    var title
    mwjs.send({action: 'query', list:"random", rnlimit:"1", rnnamespace:"category"}, function (data) {
        var page = data.query.pages;
        console.log(data);
        console.log(data.query.random[0].title);

        title = data.query.random[0].title;


        //if string is an IP/geolocation find a new one
        if(title.indexOf('.') > -1 || title.indexOf('~') > -1 || title.includes('User') || title.includes('/')){
          console.log("invalid, finding a new one");
          return getRandomArticleTitle();
        }

        //take care of title string
        var colon = title.indexOf(':') + 1;
        title = title.slice(colon, title.length);
        $scope.titles.push(title);
        $scope.$apply();
        console.log(title);
    });
  }

  $scope.colorize = function(id){

      var randomColor = Math.floor(Math.random()*16777215).toString(16);
      $('#Title' + id + '').css({
        color:'#' + randomColor
      });
  }

  $scope.scrubTitle = function(title){
    for(var i = 0; i < title.length; i++){
      if(title.charAt(i) == ' '){
        title.replace(" ","+");
      }
      return title;
    }
  }

  $scope.litanizer = function(){
    $scope.titles=[];
    if($scope.number > 50){
      alert("Only 50 requests allowed per list please")
      $scope.number = 50;
    }
    for(var i = 0; i < $scope.number; i++){
      getRandomArticleTitle();
    }
  }



  $scope.litanizer();

  console.log("done");


}]);
