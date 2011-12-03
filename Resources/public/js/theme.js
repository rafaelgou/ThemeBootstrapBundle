/**
 * Javascript alert function overrided by jQuery UI
 * @param string message
 * @author Rafael Goulart <rafaelgou@gmail.com>
 */
window.alert = function(message)
{
  $('<div></div>', {html: message.replace(/\n/, "<br />")}).dialog(
  {
    title: window.document.title,
    bgiframe: true,
    modal: true,
    buttons: {
        Ok: function() {
            $(this).dialog('close');
        }
    }
  });
};

/**
 * Confirme delete - used to confirm delete in symfony forms
 * overrides default Javascript confirm delete dialog with jQuery UI
 * @param string message
 * @param object atag The <a> tag element itself
 * @param string csrf_token_field_name The csrf_token fieldname
 * @param string csrf_token The csrf_token
 * @author Rafael Goulart <rafaelgou@gmail.com>
 */
function deleteConfirm(message, atag, csrf_token_field_name, csrf_token)
{
  $('<div></div>', {html: message.replace(/\n/, "<br />")}).dialog(
  {
    title: window.document.title,
    bgiframe: true,
    modal: true,
    buttons: {
//      Cancel: function() {
      Cancelar: function() {
          $(this).dialog('close');return false;
      },
//      Confirm: function() {
      Confirmar: function() {
          $(this).dialog('close');
          var f = document.createElement('form');
          f.style.display = 'none';
          this.parentNode.appendChild(f);
          f.method = 'post';
          f.action = atag.href;
          var m = document.createElement('input');
          m.setAttribute('type', 'hidden');
          m.setAttribute('name', 'sf_method');
          m.setAttribute('value', 'delete');
          f.appendChild(m);
          if ( typeof( csrf_token_field_name ) != 'undefined' && typeof( csrf_token ) != 'undefined')
          {
            var m = document.createElement('input');
            m.setAttribute('type', 'hidden');
            m.setAttribute('name', csrf_token_field_name);
            m.setAttribute('value', csrf_token);
            f.appendChild(m);
            f.submit();
            return false;
          }
      }
    }
  });
}

/**
 * jQuery UI Modal Form loadded by remote requests
 * @param object element The <a> tag element with href attribute to load
 * @param integer width  Width of de dialog (500px as default)
 * @param integer heigh  Height of de dialog (500px as default)
 * @author Rafael Goulart <rafaelgou@gmail.com>
 */
function modalForm(element, width, height)
{
  if (width == undefined) width=500;
  if (height == undefined) height=500;

  $('#loading').show();

  $('#dialog_form').html('');

  var url = element.href;
  var match = url.search( /.*\?.*=.*/);

  if ( match != -1 )
  {
    var random = "&random=" + Math.random()*99999;
  } else {
    var random = "?random=" + Math.random()*99999;
  }

  $('#dialog_form').load(element.href + random, function() {
    container = $(this);
    $('#loading').hide();
    container.dialog({
      //title: title,
      title: window.document.title,
      bgiframe: true,
      modal: true,
      height: height,
      width: width,
      buttons: {
//      Cancel: function() {
        Cancelar: function() {
            $(this).dialog('close');
            return false;
        },
//      Save: function() {
        Salvar: function() {
            $(this).find("form").validate();
            $(this).find("form").submit();
            return false;
        }
      }
    })
  });
}

/**
 * Slugfy a text element
 * @param string element The element to slugigy
 * @author Rafael Goulart <rafaelgou@gmail.com>
 */
function slugfyElement(element)
{
  $(element).val( slugfy($(element).val()) );
}

/**
 * Slugfy text
 * @param string text Text to slugfy
 * @param string separator The separator used to replace spaces
 * @author Rafael Goulart <rafaelgou@gmail.com>
 */
function slugfy(text, separator)
{
  var string = text;
  if (separator == undefined) separator="_";
  var remove = /\$|,|@|#|~|`|\%|\*|\^|\&|\(|\)|\+|\=|\[|\-|\]|\[|\}|\{|\;|\:|\'|\"|\<|\>|\?|\||\\|\!|\$|\./g;
  string = string.replace(remove, "");
  string = string.replace(" ", separator);
  string = removeAccent(string);
  string = string.replace(" ", separator);
  return string.toLowerCase();
}
/**
 * Remove Accents
 * @param string text Text to remove accents
 * @author Rafael Goulart <rafaelgou@gmail.com>
 */
function removeAccent(text)
{
  var varString = text;
  var stringAccent = new String('ŠŒŽšœžŸ¥µÀÁÂÃÄÅÆÇÈÉÊËẼÌÍÎÏĨÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëẽìíîïĩðñòóôõöøùúûüýÿ');
  var stringNoAccent = new String('SOZsozYYuAAAAAAACEEEEEIIIIIDNOOOOOOUUUUYsaaaaaaaceeeeeiiiiionoooooouuuuyy');

  var i = new Number();
  var j = new Number();
  var cString = new String();
  var varRes = '';

  for (i = 0; i < varString.length; i++)
  {
    cString = varString.substring(i, i + 1);
    for (j = 0; j < stringAccent.length; j++)
    {
      if (stringAccent.substring(j, j + 1) == cString)
      {
        cString = stringNoAccent.substring(j, j + 1);
      }
    }
    varRes += cString;
  }
  return varRes;
}

/**
 * Tooltips Activation
 * @author Rafael Goulart <rafaelgou@gmail.com>
 */
$(function() {
  $('.tooltip').tooltip({
    showURL: false
  });
});

/**
 * Tabs Activation
 * @author Rafael Goulart <rafaelgou@gmail.com>
 */
//$(function() {
//
//  var $tabs = $('.tabs').tabs({
//    //fx: { height: 'toggle', opacity: 'toggle', duration: '10' },
//    //event: 'mouseover',
//    tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' style='cursor:pointer;'>Remove Tab</span></li>",
//    add: function(event, ui) {
//      $(this).tabs('select',ui.index);
//    }
//    //,spinner: '<em style="font-size:0.9em;font-weight:normal">Retrieving data...</em>'
//  });
//
//  $('.tabs').tabs('option','spinner','<em style="font-size:0.9em;font-weight:normal">Retrieving data...</em>');
//
//  $('.tabs span.ui-icon-close').live('click', function() {
//    var index = $('li', $tabs ).index( $(this).parent() );
//    $tabs.tabs('remove', index );
//  });
//});

/**
 * Resets a form by id
 * @param string id The form id
 * @author Rafael Goulart <rafaelgou@gmail.com>
 */
function resetForm(id) {
	$('#'+id).each(function(){
    this.reset();
	});
}

/**
 * Activates onmouseover details under <tr> tags
 * @author Rafael Goulart <rafaelgou@gmail.com>
 */
$(function() {
  $(function() {
    $('tr').hover(
      function() {
        $(this).find('.details').show();
        $(this).find('.details_fixed').addClass('details_fixed_show');
      },
      function() {
        $(this).find('.details').hide();
        $(this).find('.details_fixed').removeClass('details_fixed_show');
      }
    );
    $('.dyn_list_element').hover(
      function() {
        $(this).find('.details').show();
        $(this).find('.details_fixed').addClass('details_fixed_show');
      },
      function() {
        $(this).find('.details').hide();
        $(this).find('.details_fixed').removeClass('details_fixed_show');
      }
    )
    $('.has_details').hover(
      function() {
        $(this).find('.details').show();
        $(this).find('.details_fixed').addClass('details_fixed_show');
      },
      function() {
        $(this).find('.details').hide();
        $(this).find('.details_fixed').removeClass('details_fixed_show');
      }
    )
  });
});

/**
 * Sets Flash message to show
 * @param string  type Type of the message
 * @param string  message The message itself
 * @param int     timeout Timeout to fadeOut (default 5000ms)
 * @param boolean timeout Show close button (default false)
 * @author Rafael Goulart <rafaelgou@gmail.com>
 */
function setFlashMessage(type, message, timeout, close)
{
  if (timeout == undefined) timeout=5000;
  if (close   == undefined) close=false;
  $("#flash").addClass(type);
  $("#flash").show();
  if (close) {
      $("#flash").html(
      '<a class="close" href="#" ' +
      'onclick="closeWithFade(\'flash\');return false;">' +
      '&times;</a>' +
      message);
  } else {
      $("#flash").html(message);
  }
  $(function() {
    setTimeout(function(){
    $("#flash").fadeOut("slow", function () {
      $("#flash").hide();
    });}, timeout);
  });
}

function closeWithFade(element)
{
  $('#'+element).fadeOut(
    'slow',
    function () {
        $("#flash").hide();
    });
}

/**
 * Define classes to be transformed to styled buttons
 * @author Rafael Goulart <rafaelgou@gmail.com>
 */
$(function() {
  $(".button_edit").button({icons: {primary:'ui-icon-document-b'}});
  $(".button_close").button({icons: {primary:'ui-icon-circle-close'}});
  $(".button_cancel").button({icons: {primary:'ui-icon-cancel'}});
  $(".button_trash").button({icons: {primary:'ui-icon-trash'}});
  $(".button_delete").button({icons: {primary:'ui-icon-trash'}});
  $(".button_add").button({icons: {primary:'ui-icon-add'}});
  $(".button_check").button({icons: {primary:'ui-icon-check'}});
  $(".button_confirm").button({icons: {primary:'ui-icon-check'}});
  $(".button_search").button({icons: {primary:'ui-icon-search'}});
  $(".button_calendar").button({icons: {primary:'ui-icon-calendar'}});
  $(".button_plus").button({icons: {primary:'ui-icon-plus'}});
  $(".button_minus").button({icons: {primary:'ui-icon-minus'}});
  $(".button_flag").button({icons: {primary:'ui-icon-flag'}});
  $(".button_save").button({icons: {primary:'ui-icon-circle-check'}});
  $(".button_save_and_add").button({icons: {primary:'ui-icon-circle-arrow-e'}});
  $(".button_list").button({icons: {primary:'ui-icon-circle-arrow-w'}});
  $(".button_reset").button({icons: {primary:'ui-icon-cancel'}});
  $(".button_home").button({icons: {primary:'ui-icon-home'}});
  $(".dyn_list_pagination").buttonset();
  $(".dyn_modeller_field_list").buttonset();
  $(".buttonset").buttonset();
  $(".button_switch").button({icons: {primary:'ui-icon-transferthick-e-w'}});
  $(".pag_add_new").button({text: true, icons: {primary: "ui-icon-plus",secondary: "ui-icon-triangle-1-s"}});
  $(".pag_add_new2").button({text: true, icons: {primary: "ui-icon-plus"}});
  $(".pag_add_new_single").button({text: true, icons: {primary: "ui-icon-plus"}});
  $(".pag_filter").button({text: true, icons: {primary: "ui-icon-search"}});
  $(".pag_filter_profile").button({text: true, icons: {primary: "ui-icon-search",secondary: "ui-icon-triangle-1-s"}});
  $(".pag_filter_profile2").button({text: true, icons: {primary: "ui-icon-search",secondary: "ui-icon-triangle-1-s"}});
  $(".pag_first").button({text: false, icons: {primary: "ui-icon-seek-start"}});
  $(".pag_prev").button({text: false, icons: {primary: "ui-icon-seek-prev"}});
  $(".pag_next").button({text: false, icons: {primary: "ui-icon-seek-next"}});
  $(".pag_last").button({text: false, icons: {primary: "ui-icon-seek-end"}});
  $(".pag_current").button({text: true});
  $("button").button({});
});

/**
 * Checks all checkbox with unique checkbox on pattern
 *
 * Usage
 * <input type="checkbox" id="my_id" onclick="checkAllCheckboxes(this, 'checkboxes_beggin_name_pattern' )" /></th>
 *
 * @param element         object  Element who calls the function
 * @param id_base_pattern string  Base id pattern to
 * @param exceptions      array   Array with IDs to mantain checked
 * @author Rafael Goulart <rafaelgou@gmail.com>
 *
 */
function checkAllCheckboxes(element, id_base_pattern, exceptions)
{
   $("input[id^=" + id_base_pattern + "][type='checkbox']:not([disabled='disabled'])").attr('checked',$(element).is(':checked'));
   //if ( exceptions != 'undefined')
   //{
   //  for(i=0;i<exceptions.length;i++)
   //  {
   //    $('#'+exceptions[i]).attr('checked', 'true');
   //  }
   //}
}

$(function() {
  //clicking the parent checkbox should check or uncheck all child checkboxes
  $(".parentCheckBox").click(
      function() {
          $(this).parents('fieldset:eq(0)').find('.childCheckBox[type="checkbox"]:not([disabled="disabled"])').attr('checked', this.checked);
      }
  );
  //clicking the last unchecked or checked checkbox should check or uncheck the parent checkbox
  $('.childCheckBox[type="checkbox"]:not([disabled="disabled"])').click(
    function() {
      if ($(this).parents('fieldset:eq(0)').find('.parentCheckBox').attr('checked') == true && this.checked == false)
          $(this).parents('fieldset:eq(0)').find('.parentCheckBox').attr('checked', false);
      if (this.checked == true) {
        var flag = true;
        $(this).parents('fieldset:eq(0)').find('.childCheckBox[type="checkbox"]:not([disabled="disabled"]))').each(
          function() {
            if (this.checked == false) flag = false;
          }
        );
        $(this).parents('fieldset:eq(0)').find('.parentCheckBox').attr('checked', flag);
      }
    }
  );
  }
);

/**
 * Activates datepicker
 * @author Rafael Goulart <rafaelgou@gmail.com>
 */
$(function() {
  $.datepicker.setDefaults($.datepicker.regional['pt-BR']);
  $('.date').datepicker();
  //$('.date').datepicker($.datepicker.regional['pt-BR']);
});

/**
 * Activates richtext editor
 * @author Rafael Goulart <rafaelgou@gmail.com>
 */
$(function() { $('.richtext').cleditor({ useCSS: true, width: 700, height: 500 }); });

$(function() { $('.richtext1').cleditor({ useCSS: true, width: 40, height: 500 }); });
$(function() { $('.richtext2').cleditor({ useCSS: true, width: 100, height: 500 }); });
$(function() { $('.richtext3').cleditor({ useCSS: true, width: 160, height: 500 }); });
$(function() { $('.richtext4').cleditor({ useCSS: true, width: 220, height: 500 }); });
$(function() { $('.richtext5').cleditor({ useCSS: true, width: 280, height: 500 }); });
$(function() { $('.richtext6').cleditor({ useCSS: true, width: 340, height: 500 }); });
$(function() { $('.richtext7').cleditor({ useCSS: true, width: 400, height: 500 }); });
$(function() { $('.richtext8').cleditor({ useCSS: true, width: 460, height: 500 }); });
$(function() { $('.richtext9').cleditor({ useCSS: true, width: 520, height: 500 }); });
$(function() { $('.richtext10').cleditor({ useCSS: true, width: 580, height: 500 }); });
$(function() { $('.richtext11').cleditor({ useCSS: true, width: 640, height: 500 }); });
$(function() { $('.richtext12').cleditor({ useCSS: true, width: 700, height: 500 }); });
$(function() { $('.richtext13').cleditor({ useCSS: true, width: 760, height: 500 }); });
$(function() { $('.richtext14').cleditor({ useCSS: true, width: 820, height: 500 }); });
$(function() { $('.richtext15').cleditor({ useCSS: true, width: 880, height: 500 }); });
$(function() { $('.richtext16').cleditor({ useCSS: true, width: 940, height: 500 }); });
$(function() { $('.richtext17').cleditor({ useCSS: true, width: 1000, height: 500 }); });
$(function() { $('.richtext18').cleditor({ useCSS: true, width: 1060, height: 500 }); });
$(function() { $('.richtext19').cleditor({ useCSS: true, width: 1120, height: 500 }); });
$(function() { $('.richtext20').cleditor({ useCSS: true, width: 1180, height: 500 }); });
$(function() { $('.richtext21').cleditor({ useCSS: true, width: 1240, height: 500 }); });
$(function() { $('.richtext22').cleditor({ useCSS: true, width: 1300, height: 500 }); });
$(function() { $('.richtext23').cleditor({ useCSS: true, width: 1360, height: 500 }); });
$(function() { $('.richtext24').cleditor({ useCSS: true, width: 1420, height: 500 }); });

$(function() { $('.richtext1-h300').cleditor({ useCSS: true, width: 40, height: 300 }); });
$(function() { $('.richtext2-h300').cleditor({ useCSS: true, width: 100, height: 300 }); });
$(function() { $('.richtext3-h300').cleditor({ useCSS: true, width: 160, height: 300 }); });
$(function() { $('.richtext4-h300').cleditor({ useCSS: true, width: 220, height: 300 }); });
$(function() { $('.richtext5-h300').cleditor({ useCSS: true, width: 280, height: 300 }); });
$(function() { $('.richtext6-h300').cleditor({ useCSS: true, width: 340, height: 300 }); });
$(function() { $('.richtext7-h300').cleditor({ useCSS: true, width: 400, height: 300 }); });
$(function() { $('.richtext8-h300').cleditor({ useCSS: true, width: 460, height: 300 }); });
$(function() { $('.richtext9-h300').cleditor({ useCSS: true, width: 520, height: 300 }); });
$(function() { $('.richtext10-h300').cleditor({ useCSS: true, width: 580, height: 300 }); });
$(function() { $('.richtext11-h300').cleditor({ useCSS: true, width: 640, height: 300 }); });
$(function() { $('.richtext12-h300').cleditor({ useCSS: true, width: 700, height: 300 }); });
$(function() { $('.richtext13-h300').cleditor({ useCSS: true, width: 760, height: 300 }); });
$(function() { $('.richtext14-h300').cleditor({ useCSS: true, width: 820, height: 300 }); });
$(function() { $('.richtext15-h300').cleditor({ useCSS: true, width: 880, height: 300 }); });
$(function() { $('.richtext16-h300').cleditor({ useCSS: true, width: 940, height: 300 }); });
$(function() { $('.richtext17-h300').cleditor({ useCSS: true, width: 1000, height: 300 }); });
$(function() { $('.richtext18-h300').cleditor({ useCSS: true, width: 1060, height: 300 }); });
$(function() { $('.richtext19-h300').cleditor({ useCSS: true, width: 1120, height: 300 }); });
$(function() { $('.richtext20-h300').cleditor({ useCSS: true, width: 1180, height: 300 }); });
$(function() { $('.richtext21-h300').cleditor({ useCSS: true, width: 1240, height: 300 }); });
$(function() { $('.richtext22-h300').cleditor({ useCSS: true, width: 1300, height: 300 }); });
$(function() { $('.richtext23-h300').cleditor({ useCSS: true, width: 1360, height: 300 }); });
$(function() { $('.richtext24-h300').cleditor({ useCSS: true, width: 1420, height: 300 }); });

$(function() { $('.richtext1-h750').cleditor({ useCSS: true, width: 40, height: 750 }); });
$(function() { $('.richtext2-h750').cleditor({ useCSS: true, width: 100, height: 750 }); });
$(function() { $('.richtext3-h750').cleditor({ useCSS: true, width: 160, height: 750 }); });
$(function() { $('.richtext4-h750').cleditor({ useCSS: true, width: 220, height: 750 }); });
$(function() { $('.richtext5-h750').cleditor({ useCSS: true, width: 280, height: 750 }); });
$(function() { $('.richtext6-h750').cleditor({ useCSS: true, width: 340, height: 750 }); });
$(function() { $('.richtext7-h750').cleditor({ useCSS: true, width: 400, height: 750 }); });
$(function() { $('.richtext8-h750').cleditor({ useCSS: true, width: 460, height: 750 }); });
$(function() { $('.richtext9-h750').cleditor({ useCSS: true, width: 520, height: 750 }); });
$(function() { $('.richtext10-h750').cleditor({ useCSS: true, width: 580, height: 750 }); });
$(function() { $('.richtext11-h750').cleditor({ useCSS: true, width: 640, height: 750 }); });
$(function() { $('.richtext12-h750').cleditor({ useCSS: true, width: 700, height: 750 }); });
$(function() { $('.richtext13-h750').cleditor({ useCSS: true, width: 760, height: 750 }); });
$(function() { $('.richtext14-h750').cleditor({ useCSS: true, width: 820, height: 750 }); });
$(function() { $('.richtext15-h750').cleditor({ useCSS: true, width: 880, height: 750 }); });
$(function() { $('.richtext16-h750').cleditor({ useCSS: true, width: 940, height: 750 }); });
$(function() { $('.richtext17-h750').cleditor({ useCSS: true, width: 1000, height: 750 }); });
$(function() { $('.richtext18-h750').cleditor({ useCSS: true, width: 1060, height: 750 }); });
$(function() { $('.richtext19-h750').cleditor({ useCSS: true, width: 1120, height: 750 }); });
$(function() { $('.richtext20-h750').cleditor({ useCSS: true, width: 1180, height: 750 }); });
$(function() { $('.richtext21-h750').cleditor({ useCSS: true, width: 1240, height: 750 }); });
$(function() { $('.richtext22-h750').cleditor({ useCSS: true, width: 1300, height: 750 }); });
$(function() { $('.richtext23-h750').cleditor({ useCSS: true, width: 1360, height: 750 }); });
$(function() { $('.richtext24-h750').cleditor({ useCSS: true, width: 1420, height: 750 }); });

$(function() { $('.richtext1-h1000').cleditor({ useCSS: true, width: 40, height: 1000 }); });
$(function() { $('.richtext2-h1000').cleditor({ useCSS: true, width: 100, height: 1000 }); });
$(function() { $('.richtext3-h1000').cleditor({ useCSS: true, width: 160, height: 1000 }); });
$(function() { $('.richtext4-h1000').cleditor({ useCSS: true, width: 220, height: 1000 }); });
$(function() { $('.richtext5-h1000').cleditor({ useCSS: true, width: 280, height: 1000 }); });
$(function() { $('.richtext6-h1000').cleditor({ useCSS: true, width: 340, height: 1000 }); });
$(function() { $('.richtext7-h1000').cleditor({ useCSS: true, width: 400, height: 1000 }); });
$(function() { $('.richtext8-h1000').cleditor({ useCSS: true, width: 460, height: 1000 }); });
$(function() { $('.richtext9-h1000').cleditor({ useCSS: true, width: 520, height: 1000 }); });
$(function() { $('.richtext10-h1000').cleditor({ useCSS: true, width: 580, height: 1000 }); });
$(function() { $('.richtext11-h1000').cleditor({ useCSS: true, width: 640, height: 1000 }); });
$(function() { $('.richtext12-h1000').cleditor({ useCSS: true, width: 700, height: 1000 }); });
$(function() { $('.richtext13-h1000').cleditor({ useCSS: true, width: 760, height: 1000 }); });
$(function() { $('.richtext14-h1000').cleditor({ useCSS: true, width: 820, height: 1000 }); });
$(function() { $('.richtext15-h1000').cleditor({ useCSS: true, width: 880, height: 1000 }); });
$(function() { $('.richtext16-h1000').cleditor({ useCSS: true, width: 940, height: 1000 }); });
$(function() { $('.richtext17-h1000').cleditor({ useCSS: true, width: 1000, height: 1000 }); });
$(function() { $('.richtext18-h1000').cleditor({ useCSS: true, width: 1060, height: 1000 }); });
$(function() { $('.richtext19-h1000').cleditor({ useCSS: true, width: 1120, height: 1000 }); });
$(function() { $('.richtext20-h1000').cleditor({ useCSS: true, width: 1180, height: 1000 }); });
$(function() { $('.richtext21-h1000').cleditor({ useCSS: true, width: 1240, height: 1000 }); });
$(function() { $('.richtext22-h1000').cleditor({ useCSS: true, width: 1300, height: 1000 }); });
$(function() { $('.richtext23-h1000').cleditor({ useCSS: true, width: 1360, height: 1000 }); });
$(function() { $('.richtext24-h1000').cleditor({ useCSS: true, width: 1420, height: 1000 }); });


/*
 * To be used in range input dates (from -> to)
 *
var dates = $('#finance_datefilter_from, #finance_datefilter_to').datepicker({
  showButtonPanel: true,
  onSelect: function(selectedDate){
    var option = this.id == "finance_datefilter_from" ? "minDate" : "maxDate";
    var option = this.id == "finance_datefilter_to" ? "maxDate" : "minDate";
    var instance = $(this).data("datepicker");
    var date = $.datepicker.parseDate(
      instance.settings.dateFormat ||
      $.datepicker._defaults.dateFormat,
      selectedDate,
      instance.settings
    );
    dates.not(this).datepicker("option", option, date);
  },
  yearRange: '-10:+0',
  changeMonth: 'true',
  changeYear: 'true'
})
*/


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

/**
 * Activates age calculation
 * @author Rafael Goulart <rafaelgou@gmail.com>
 */
$(function() {
  $('.age_calc').change(function() {
    var age = $().calculaIdade($('.age_calc').val() );
    $('.age_calc').append('<span class="age_calc_value">' + age + '</span>');
  });
});

/* Bootstrap */

