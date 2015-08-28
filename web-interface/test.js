/*global $ */
// var serviceURL = 'http://www.clockduster.com:8080/';
var serviceURL = 'http://localhost:8080/myapp/',
    // used to prevent updating active cells
    activeCell = '';

function truncateValue (value, valueLength) {
    if (valueLength == undefined) {
        valueLength = 10;
    }
    if (value.length > valueLength) {
        value = value.slice(0, valueLength) + '...';
    }
    return value;
}
function updateCell(address) {
    'use strict';
    if (address !== activeCell) {
        $.get(serviceURL + 'cell/' + address ,
            function loadCell (data) {
                $('#' + address + ' .label').html(truncateValue(data.val));
                $('#' + address + ' input').val(data.val);
            },
            'json');
    }
}
function updateCells () {
    'use strict';
    updateCell('A1');
    updateCell('A2');
    updateCell('B1');
    updateCell('B2');
    setTimeout(updateCells, 2000);
}


$(document).ready(function initialSetup() {
    updateCells();

    $('img').on('click', function editCell () {
        var cell = $(this).parent(),
              currentVal = cell.html(),
              cellKey = cell.attr('id');

        activeCell = cellKey;

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
                        activeCell = '';
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