// 0. Khai báo biến
var app = angular.module("myApp", ["ngRoute"]);

// 1. Sử dụng $routeProvider để cấu hình route cho các single page khác nhau
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "01_Home.html"
        })
        .when("/", {
            templateUrl: "01_Home.html"
        })
        .when("/02_Itemlist", {
            templateUrl: "02_Itemlist.html",
            controller: "myCtrl"
        })
        .when("/03_Comparison", {
            templateUrl: "03_Comparison.html",
            controller: "myCtrl"
        })
        .when("/05_Contact", {
            templateUrl: "05_Contact.html",
            controller: "myCtrl"
        })
        .when("/04_Payment", {
            templateUrl: "04_Payment.html",
            controller: "myCtrl"
        })
        ;
        
        
});

// 2. Phát triển controller
app.controller('myCtrl', function ($scope, $http, $window, $location) {
    // 2.1 getData(): Lấy dữ liệu từ database.json
    function getData() 
    {
        $scope.selectedOption1 = 0;
        $scope.selectedOption2 = 0;
        $http.get("database.json")
            .then(function (response) {
                if (sessionStorage.getItem("n") == null) {
                    // Nếu null thì ghi giá trị vào
                    sessionStorage.setItem("n", JSON.stringify(response.data));
                    // Lấy data
                    $scope.database = JSON.parse(sessionStorage.getItem("n"));
                } else {
                    // Lấy data
                    $scope.database = JSON.parse(sessionStorage.getItem("n"));
                }
            });
    }

    // Gọi hàm getData()
    getData();

    // 2.6 sortData()
    $scope.sort = {};
    $scope.sortData = function (cot) {
        var sort = $scope.sort;
        if (sort.cot === cot) {
            // Đảo chiều sắp xếp sort.descending
            sort.descending = !sort.descending;
        } else {
            sort.cot = cot;
            // Khóa sort.descending = false
            sort.descending = false;
        }
    };

   // Compare car
   $scope.item1 = function(a) {
    var select2 = $scope.selectedOption2;
    if (a != select2) {
        $scope.Image1 = $scope.database[a].Image;
        $scope.brand1 = $scope.database[a].Brand;
        $scope.Design1 = $scope.database[a].Design;
        $scope.year1 = $scope.database[a].Year;
        $scope.area1 = $scope.database[a].Area;
        $scope.color1 = $scope.database[a].Color;
        $scope.Seatingcapacity1 = $scope.database[a].Seatingcapacity;
        $scope.price1 = $scope.database[a].Price;
    } else 
    {
        $scope.selectedOption1 = 0;
        $scope.Image1 = $scope.database[0].Image;
        $scope.brand1 = $scope.database[0].Brand;
        $scope.Design1 = $scope.database[0].Design;
        $scope.year1 = $scope.database[0].Year;
        $scope.area1 = $scope.database[0].Area;
        $scope.color1 = $scope.database[0].Color;
        $scope.Seatingcapacity1 = $scope.database[0].Seatingcapacity;
        $scope.price1 = $scope.database[0].Price;

    }
    $scope.selectedCar1 = $scope.database[a];
};

$scope.item2 = function(a) {
    var select1 = $scope.selectedOption1;
    if (a != select1) {
        $scope.Image2 = $scope.database[a].Image;
        $scope.brand2 = $scope.database[a].Brand;
        $scope.Design2 = $scope.database[a].Design;
        $scope.year2 = $scope.database[a].Year;
        $scope.area2 = $scope.database[a].Area;
        $scope.color2 = $scope.database[a].Color;
        $scope.price2 = $scope.database[a].Price;
    } else {
        $scope.selectedOption2 = 0;
        $scope.Image2 = $scope.database[0].Image;
        $scope.brand2 = $scope.database[0].Brand;
        $scope.Design2 = $scope.database[0].Design;
        $scope.year2 = $scope.database[0].Year;
        $scope.area2 = $scope.database[0].Area;
        $scope.color2 = $scope.database[0].Color;
        $scope.Seatingcapacity2 = $scope.database[0].Seatingcapacity;
        $scope.price2 = $scope.database[0].Price;
    }
    $scope.selectedCar2 = $scope.database[a];
};
});
