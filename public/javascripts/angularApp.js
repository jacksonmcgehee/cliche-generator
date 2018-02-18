angular.module('flapperNews', ['ui.router'])

.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl',
        resolve: {
            postPromise: ['posts', function(posts){
              return posts.getAll();
            }]
        }
    })

    .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
      });

    $urlRouterProvider.otherwise('home');
}])

.factory('posts', ['$http', function($http){
    const o = {
      posts: []
    }
    o.getAll = (() => {
        return $http.get('/api/posts').success((data) => {
            angular.copy(data, o.posts)
        })
    })
    o.create = function(post) {
        return $http.post('/api/posts', post).success((data) => {
          o.posts.push(data)
        })
      }
    return o
  }])

.controller('MainCtrl', [
'$scope',
'posts',
function($scope, posts){
    $scope.posts = posts.posts

    $scope.addPost = function(){
        if(!$scope.cliche || $scope.cliche === '') { return }
        posts.create({
        cliche: $scope.cliche,
        photo_url: $scope.photo_url,
        })
        $scope.cliche = ''
        $scope.photo_url = ''
    }

    $scope.incrementUpvotes = function(post) {
        post.upvotes += 1
    }
}])
.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){

    $scope.post = posts.posts[$stateParams.id];

    $scope.addComment = function(){
        if($scope.body === '') { return; }
        $scope.post.comments.push({
            body: $scope.body,
            author: 'user',
            upvotes: 0
    });
        $scope.body = '';
    };

}]);