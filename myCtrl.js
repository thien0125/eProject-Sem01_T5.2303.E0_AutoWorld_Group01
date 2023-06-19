//0. khai báo biến
    var app = angular.module("myApp",["ngRoute"]);

//1. Dùng $routeProvider cấu hình route mở các single page khác
    app.config(function($routeProvider)
    {
        $routeProvider
        .when("/",{
            templateUrl: "03_Home.html"
        })
        .when("/02_Itemlist", {
            templateUrl: "02_Itemlist.html",
            controller: "myCtrl"
        })
    });

//2. phát triển controller
    app.controller('myCtrl', function($scope, $http, $window, $location)
    {
        //2.1 getData()     Lấy dữ liệu từ database.json
            //tạo hàm
                function getData()
                    {
                        $http.get("database.json")
                        .then(function(x)
                        {
                            if (sessionStorage.getItem("n")==null)
                            {
                                //nếu null thì ghi giá trị vào
                                    sessionStorage.setItem("n", JSON.stringify(x.data));
                                //lấy data
                                    $scope.database = JSON.parse(sessionStorage.getItem("n"));
                            }
                            else
                            {
                                //lấy data
                                $scope.database = JSON.parse(sessionStorage.getItem("n"));
                            }
                        });
                    }

            //gọi hàm
                getData();

        //2.3 addData()     Thêm dữ liệu vào database.json
            $scope.addData = function()
            {
                var add = 
                {
                    Stt: $scope.database.length,
                    Brand: $scope.Brand,
                    Model: $scope.Model,
                    Image: $scope.Image,
                    Price: $scope.Price
                };

                if (!$scope.Brand || !$scope.Model || !$scope.Price) 
                {
                    $window.alert("Can't leave any field blank");
                }
                    else 
                    {
                        $scope.database.push(add);
                        setStorage();
                        var message = [];
                        message.push("Data input successfull");
                        alert(message.join());
                        location = "index.html#!/02_Itemlist";
                    };

            }
        //2.4 deleteData()  Xóa dữ liệu từ database.json
        $scope.deleteData = function(add) 
        {
            var msg = "Are you sure to delete this record?";
            if (confirm(msg)) {
                var index = $scope.database.indexOf(add);
                $scope.database.splice(index, 1);
                setStorage();
                $location.path("/02_Itemlist"); // Chuyển đến trang danh sách các mục sau khi xóa thành công
            }
        }

        //2.5 hàm ghi vào session
                function setStorage()
                {
                    var data = JSON.stringify ($scope.database);
                    sessionStorage.setItem("n",data);
                }

        //2.6 sortData()
            $scope.sort = {};
            $scope.sortData = function(cot) 
            {
            var sort = $scope.sort;
            if (sort.cot === cot) 
            {
                // Đảo chiều sắp xếp sort.descending
                sort.descending = !sort.descending;
            } 
            else 
            {
                sort.cot = cot;
                // Khóa sort.descending = false
                sort.descending = false;
            }
            };
        
        //2.7 Fetch record lên bản input
            $scope.fillInputs = function(data) 
            {
                $scope.selectedData = angular.copy(data); // Sao chép dữ liệu vào đối tượng selectedData
                $scope.Brand = $scope.selectedData.Brand;
                $scope.Model = $scope.selectedData.Model;
                $scope.Price = $scope.selectedData.Price;
            };
        
        //2.8 Update current record
            $scope.updateData = function() 
            {
                var index = $scope.database.findIndex(function(item) 
                {
                    return item.Brand === $scope.Brand;
                });
            
                if (index !== -1) 
                {
                    $scope.database[index].Brand = $scope.Brand;
                    $scope.database[index].Model = $scope.Model;
                    $scope.database[index].Price = $scope.Price;
                    setStorage();
                }
            };
        //2.9 Sort trong datalist
            //chưa làm dc, nó chỉ sort cột đầu tiên trong table
        
        
        
    });