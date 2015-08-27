/*global $ */
// var serviceURL = "http://www.clockduster.com:8080/";
// var serviceURL = "127.0.0.1:8080/myapp/";
var serviceURL = "localhost:8080/myapp/";

function truncateValue (value, valueLength) {
    if (valueLength == undefined) {
        valueLength = 10;
    }
    if (value.length > valueLength) {
        value = value.slice(0, valueLength) + '...';
    }
    return value;
}
function updateCells () {
    'use strict';
    $.get(serviceURL + "cell/A1" ,
        function loadCell (data) {
            $('#A1 .label').html(truncateValue(data.val));
            $('#A1 input').val(data.val);
        },
        'json');
    $.get(serviceURL + "cell/A2" ,
        function loadCell (data) {
            $('#A2 .label').html(truncateValue(data.val));
            $('#A2 input').val(data.val);
        },
        'json');
    $.get(serviceURL + "cell/B1" ,
        function loadCell (data) {
            $('#B1 .label').html(truncateValue(data.val));
            $('#B1 input').val(data.val);
        },
        'json');
    $.get(serviceURL + "cell/B2" ,
        function loadCell (data) {
            $('#B2 .label').html(truncateValue(data.val));
            $('#B2 input').val(data.val);
        },
        'json');
    setTimeout(updateCells, 2000);
}


$(document).ready(function initialSetup() {
        updateCells();

        $('img').on('click', function editCell () {
            var cell = $(this).parent(),
                  currentVal = cell.html(),
                  cellKey = cell.attr('id');

            // hide all inputs
            $('input').hide();
            $(this).hide();
            $('.label').show();
            cell.find('.label').hide();
            cell.find('input').show();

            cell.find('input').on('keypress', function updateCell(e) {
                if (e.which == 13) {
                    var newValue = cell.find('input').val();
                    $.post(serviceURL + 'cell/' + cellKey + '/' + newValue,
                        function finishEditingCell() {
                            cell.find('.label').html(newValue);
                            cell.find('input').val(newValue);
                            cell.find('.label').show();
                            cell.find('input').hide();
                        });
                }
            });
        });

        $('.label').on('mouseenter', function showEditIcon () {
            $(this).html(truncateValue($(this).nextAll('input').val(), 8));
            $(this).nextAll('img').show();
        })
        $('td').on('mouseleave', function showEditIcon () {
            $(this).find('.label').html(truncateValue($(this).find('input').val()));
            $(this).find('img').hide();
        })
});