/**
* jQuery ageCalc v1.0.0 - http://wborbajr.blogspot.com/jquery.CalculaIdade.php
*
* Copyright (c) 2008 Waldir Borba Junior (stilbuero.de)
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
* Using ageCalc().
*
* $('#date').val( $().ageCalc( date, format="dd/mm/yyyy" ) );
*
* @desc Calcs age for a informed date and returns 99 y 99 m
*
*
*/
$.fn.ageCalc = function ( birthday, year_label, month_label )
{
    if (year_label == undefined) {
        year_label = 'years';
    }

    if (month_label == undefined) {
        month_label = 'months';
    }

    var today = new Date();

    var arrayData = birthday.split("/");

    var result = "";

    if (arrayData.length == 3) {

        var year = parseInt( arrayData[2] );
        var month = parseInt( arrayData[1] );
        var day = parseInt( arrayData[0] );

        // Validates
        if ( arrayData[0] > 31 || arrayData[1] > 12 ) {
        return result;
        }

        year = ( year.length == 2 ) ? year += 1900 : year;

        // Get years diff
        var age = ( today.getYear()+1900 ) - year;

        // Get months diff
        var months = ( today.getMonth() + 1 ) - month;

        // If month less than 0 so years is not complete. If greater than 0, so year is complete
        age = ( months < 0 ) ? age - 1 : age;
        months = ( months < 0 ) ? months + 12 : months;
        result = ( age + " " + month_label + " " +  months + " " + year_label );
    }

    return result;
};

