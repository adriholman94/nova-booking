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
    let fromD;
    let toD;
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
    }).on('changeDate', function (selected) {
        newStartDate = new Date(selected.date.valueOf());
        let date = dateManipulation(newStartDate, 1, 0, 0, "+");
        $("#with_date_lte").datepicker('setStartDate', date);
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
    }).on('changeDate', function (selected) {
        newEndDate = new Date(selected.date.valueOf());
        let date = dateManipulation(newEndDate, 1, 0, 0, "-");
        $("#with_date_gte").datepicker('setEndDate', date);
    });

    if ($("#with_date_gte").val() != '') {
        fromD = $("#with_date_gte").val(); console.log(fromD);
        startDate = stringToDate(fromD, "yyyy-mm-dd", "-");
        newStartDate = dateManipulation(startDate, 1, 0, 0, "+");
        $("#with_date_gte").datepicker('setDate', startDate);
        $("#with_date_lte").datepicker('setStartDate', newStartDate);
    }
    if ($("#with_date_lte").val() != '') {
        toD = $("#with_date_lte").val(); console.log(toD);
        endDate = stringToDate(toD, "yyyy-mm-dd", "-");
        newEndDate = dateManipulation(endDate, 1, 0, 0, "-");
        $("#with_date_lte").datepicker('setDate', endDate);
        $("#with_date_gte").datepicker('setEndDate', newEndDate);
    }


});