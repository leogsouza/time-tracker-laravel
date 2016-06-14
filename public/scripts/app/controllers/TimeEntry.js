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
        }
})();
