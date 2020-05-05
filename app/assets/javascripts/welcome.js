//= require jquery3
//= require bootstrap
//= require bootstrap-datepicker
//= require bootstrap-datepicker/core
//= require bootstrap-datepicker/locales/bootstrap-datepicker.es
//= require jquery.easy-autocomplete

$(function () {
    let options_easy = {

        url: "/welcome/resources.json",

        getValue: "name",

        list: {
            match: {
                enabled: true
            }
        },

        theme: "blue-light"
    };
    function stringToDate(_date, _format, _delimiter) {
        var formatLowerCase = _format.toLowerCase();
        var formatItems = formatLowerCase.split(_delimiter);
        var dateItems = _date.split(_delimiter);
        var monthIndex = formatItems.indexOf("mm");
        var dayIndex = formatItems.indexOf("dd");
        var yearIndex = formatItems.indexOf("yyyy");
        var month = parseInt(dateItems[monthIndex]);
        month -= 1;
        var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
        return formatedDate;
    }

    function dateManipulation(date, days, hrs, mins, operator) {
        date = new Date(date);
        if (operator == "-") {
            var durationInMs = (((24 * days) * 60) + (hrs * 60) + mins) * 60000;
            var newDate = new Date(date.getTime() - durationInMs);
        } else {
            var durationInMs = (((24 * days) * 60) + (hrs * 60) + mins) * 60000;
            var newDate = new Date(date.getTime() + durationInMs);
        }
        return newDate;
    }
    $("#with_search_home").easyAutocomplete(options_easy);
    $("#with_search_results").easyAutocomplete(options_easy);
    let fromD = $("#with_date_gte").val();
    let toD = $("#with_date_lte").val();
    let startDate;
    let endDate;
    let newStartDate = dateManipulation(new Date(), 1, 0, 0, "+");
    let newEndDate = dateManipulation(new Date(), 365, 0, 0, "+");
    let ToEndDate = dateManipulation(new Date(), 365, 0, 0, "+");

    $("#with_date_gte").datepicker({
        weekStart: 1,
        startDate: new Date(),
        endDate: newEndDate,
        autoclose: true,
        orientation: "bottom auto",
        format: "dd MM yyyy",
        language: 'es',
        todayHighlight: true
    });
    $("#with_date_lte").datepicker({
        weekStart: 1,
        startDate: newStartDate,
        endDate: ToEndDate,
        autoclose: true,
        orientation: "bottom auto",
        format: "dd MM yyyy",
        language: 'es',
        todayHighlight: true
    });
    $("#with_date_gte").datepicker().on('changeDate', function (selected) {
        fromD = selected.date;
        console.log("from " + fromD);
        newStartDate = fromD;
        let date = dateManipulation(newStartDate, 1, 0, 0, "+");
        $("#with_date_lte").datepicker('setStartDate', date);
    });
    $("#with_date_lte").datepicker().on('changeDate', function (selected) {
        toD = selected.date;
        console.log("to " + toD);
        newEndDate = toD;
        let date = dateManipulation(newEndDate, 1, 0, 0, "-");
        $("#with_date_gte").datepicker('setEndDate', date);
    });
});   