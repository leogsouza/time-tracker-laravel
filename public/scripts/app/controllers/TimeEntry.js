(function() {

    'use script';

    angular
        .module('timeTracker')
        .controller('TimeEntry', TimeEntry);

        function TimeEntry(time, user, $scope) {

            // vm is our capture variable
            var vm = this;

            vm.timeentries = [];
            vm.totalTime = {};
            vm.users = [];

            // Initialize the clockIn and clockOut times to the current time
            vm.clockIn = moment();
            vm.clockOut = moment();

            // Grab all the entries saved in the database
            getTimeEntries()

            // Get the users from the database so we can select
            // who the time entry belongs to
            getUsers();

            function getUsers() {
                user.getUsers().then(function(result) {
                    vm.users = result;
                }, function(error) {
                    console.log('Error getting TimeEntries',error);
                });
            }

            // Fetch the time entries from the static JSON file
            // and puts the results on the vm.timeentries array
            function getTimeEntries() {
                time.getTime().then(function(results) {
                    vm.timeentries = results;
                    updateTotalTime(vm.timeentries);
                    console.log(vm.timeentries);
                }, function(error) {
                    console.log('Erro ao obter os dados em TimeEntry.js', error);
                });
            }
            

            // Updates the values in the total time box by calling the
            // getTotalTime method on the time service
            function updateTotalTime(timeentries) {
                vm.totalTime = time.getTotalTime(timeentries);
            }

            // Submit the time entry that will be called
            // when we click the "Log Time" button
            vm.logNewTime = function() {

                // Make sure that the clock-in time isn't after
                // the clock-out time!
                if(vm.clockOut < vm.clockIn) {
                    alert("You can't clock out before you clock in!");
                    return;
                }

                // Make sure the time entry is greater than zero
                if(vm.clocOut - vm.clockIn == 0) {
                    alert("Your time enty has to be greater than zero!");
                    return;
                }

                // Call to the saveTime method on the time service
                // to save the new time entry to the database
                time.saveTime({
                    "user_id"   :   vm.timeEntryUser.id,
                    "start_time":   vm.clockIn,
                    "end_time"  :   vm.clockOut,
                    "comment"   :   vm.comment
                }).then(function(success) {
                    getTimeEntries();
                    console.log('Time Entry saved successfully',success);
                }, function(error) {
                    console.log('Error on save the time entry',error);
                });

                getTimeEntries();

                // Reset clockIn and clockOut times to the current time
                vm.clockIn = moment();
                vm.clockOut = moment();

                // Clear the comment field
                vm.comment = "";

                // Deselect the user
                vm.timeEntryUser = "";
            }

            vm.updateTimeEntry = function(timeEntry) {

                var updateTimeEntry = {
                    "id":   timeEntry.id,
                    "user_id": timeEntry.user.id,
                    "start_time": timeEntry.start_time,
                    "end_time": timeEntry.end_time,
                    "comment": timeEntry.comment
                }

                time.updateTime(updateTimeEntry).then(function(success) {

                    getTimeEntries();
                    $scope.showEditDialog = false;
                    console.log(success);
                }, function(error) {
                    console.log(error);
                });
            }

            vm.deleteTimeEntry = function(timeEntry) {

                var id = timeEntry.id;
                time.deleteTime(id).then(function(success) {
                    getTimeEntries();
                    console.log(success)    
                }, function(error) {
                     console.log(error);
                });
                
            }
        }
})();
