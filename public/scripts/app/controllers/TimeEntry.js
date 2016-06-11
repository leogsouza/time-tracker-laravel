(function() {

    'use script';

    angular
        .module('timeTracker')
        .controller('TimeEntry', TimeEntry);

        function TimeEntry(time) {

            // vm is our capture variable
            var vm = this;

            vm.timeentries = [];
            vm.totalTime = {};

            // Fetch the time entries from the static JSON file
            // and puts the results on the vm.timeentries array
            time.getTime().then(function(results) {
                vm.timeentries = results;
                updateTotalTime(vm.timeentries);
                console.log(vm.timeentries);
            }, function(error) {
                console.log('Erro ao obter os dados em TimeEntry.js', error);
            });

            // Updates the values in the total time box by calling the
            // getTotalTime method on the time service
            function updateTotalTime(timeentries) {
                vm.totalTime = time.getTotalTime(timeentries);
            }
        }
})();
