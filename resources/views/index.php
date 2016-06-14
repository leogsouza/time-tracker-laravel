<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Time Tracker</title>
    <!-- Include compiled CSS -->
    <link rel="stylesheet" href="css/app.css">
    
</head>
<body ng-app="timeTracker" ng-controller="TimeEntry as vm">
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <a href="" class="navbar-brand">Time Tracker</a>
            </div>
        </div>
        <div class="container-fluid time-entry">
            <div class="timepicker">
                <span class="timepicker-title label label-primary">Clock In</span>
                <uib-timepicker ng-model="vm.clockIn" hour-step="1" minute-step="1" show-meridian="true"></uib-timepicker>
            </div>
            <div class="timepicker">
                <span class="timepicker-title label label-primary">Clock Out</span>
                <uib-timepicker ng-model="vm.clockOut" hour-step="1" minute-step="1" show-meridian="true"></uib-timepicker>
            </div>
            <div class="time-entry-comment">
                <form class="navbar-form">
                    <select name="user" id="" class="form-control" ng-model="vm.timeEntryUser" ng-options="user.name for user in vm.users">
                        <option value="">-- Select a option --</option>
                    </select>
                    <input type="text" ng-model="vm.comment" class="form-control" placeholder="Enter a comment" />
                    <button class="btn btn-primary" ng-click="vm.logNewTime()">Log Time</button>
                </form>
            </div>
        </div>
    </nav>

    <div class="container">
        <div class="col-sm-8">
            <div class="well timeentry" ng-repeat="time in vm.timeentries">
                <div class="row">
                    <div class="col-sm-8">
                        <h4>
                            <i class="glyphicon glyphicon-user"></i>
                            {{time.user.name}}
                        </h4>
                        <p><i class="glyphicon glyphicon-pencil"></i> {{time.comment}}</p>
                    </div>
                    <div class="col-sm-4 time-numbers">
                        <h4><i class="glyphicon glyphicon-calendar"></i>
                        {{time.end_time | date:'mediumDate'}}</h4>
                        <h2>
                            <span class="label label-primary"
                                ng-show="time.loggedTime.duration._data.hours > 0">
                                {{time.loggedTime.duration._data.hours}} hour<span ng-show="time.loggedTime.duration._data.hours > 1">s</span>
                            </span>
                        </h2>
                        <h4><span class="label label-default">
                            {{time.loggedTime.duration._data.minutes}} minutes
                        </span></h4>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-4">
            <div class="well time-numbers">
                <h1><i class="glyphicon glyphicon-time"></i> Total Time</h1>
                <h1><span class="label label-primary">{{vm.totalTime.hours}} hours</span></h1>
                <h3><span class="label label-default">{{vm.totalTime.minutes}} minutes</span></h3>
            </div>
        </div>
    </div>

    <!-- Application Dependencies 
        Added merged js scripts
        That include angular/angular.js,
        angular-bootstrap/ui-bootstrap-tpls.js,
        angular-resource/angular-resource.js and moment/moment.js
    -->
    <script src="scripts/vendor.js" charset="utf-8"></script>

    <!-- Application Scripts -->
    <script src="scripts/app/app.js" charset="utf-8"></script>
    <script src="scripts/app/controllers/TimeEntry.js" charset="utf-8"></script>
    <script src="scripts/app/services/time.js" charset="utf-8"></script>
    <script src="scripts/app/services/user.js" charset="utf-8"></script>

</body>
</html>
