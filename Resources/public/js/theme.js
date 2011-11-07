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
 * Sets Flash Message to show
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
$(function() {
    $('.richtext').cleditor({
        useCSS: true
    });
});


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


/* UNDER Tests - not used ===================================================== */
/**
 * Render a menu
 * @param string menu_id ID of ul menu
 * @author Rafael Goulart <rafaelgou@gmail.com>
 */
function renderMenu(element, menu_id)
{
  //alert(menu_id);
  //alert(menu_id + ' ' + $(element).id);

  var menu = $('#'+menu_id).menu({
    selected: function(event, ui) {
        $(this).hide();
     }
  }).hide().css({position: 'absolute', zIndex: 1});;

  if (menu.is(':visible') )
  {
    menu.hide();
    return false;
  }

  menu.menu('deactivate').show();
  menu.position(
  {
    my: "right top",
    at: "right bottom",
    of: element
  });

/*
  $(function($)
  {
    $(document).one("click", function()
    {
      if (menu.is(':visible') )
      {
        //menu.hide();
        return false;
      }
    }
  )};
*/
  return false;
}
/*
$('.menu').live('click', function(event) {
  renderMenu(this, this.menu)
});
*/

/**
* jQuery CalculaIdade v1.0.0 - http://wborbajr.blogspot.com/jquery.CalculaIdade.php
*
* Copyright (c) 2008 Waldir Borba Junior (stilbuero.de)
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
* Usando calculaIdade().
*
* @exemplo
*
* $('#campos_formulario').val( $().calculaIdade( "dd/mm/yyyy" ) );
*
* $('#campos_formulario').val( $().calculaIdade( "dd/mm/yy" ) );
*
* @desc Calcula a idade de uma data informada e retorno no formato 99 a 99 m -
*            #ERR# - se a data informada  nao estiver correta
*
*/

$.fn.calculaIdade = function ( dataNascimento ) {
 var hoje = new Date();

 var arrayData = dataNascimento.split("/");

 var retorno = "n/d";

 if (arrayData.length == 3) {
  // Decompoem a data em array
  var ano = parseInt( arrayData[2] );
  var mes = parseInt( arrayData[1] );
  var dia = parseInt( arrayData[0] );

  // Valida a data informada
  if ( arrayData[0] > 31 || arrayData[1] > 12 ) {
   return retorno;
  }

  ano = ( ano.length == 2 ) ? ano += 1900 : ano;

  // Subtrai os anos das duas datas
  var idade = ( hoje.getYear()+1900 ) - ano;

  // Subtrai os meses das duas datas
  var meses = ( hoje.getMonth() + 1 ) - mes;

  // Se meses for menor que 0 entao nao cumpriu anos. Se for maior sim ja cumpriu
  idade = ( meses < 0 ) ? idade - 1 : idade;
  meses = ( meses < 0 ) ? meses + 12 : meses;
  retorno = ( idade + " anos " + meses + " meses" );
 }

 return retorno;
};

/**
 * Activates age calculation
 * @author Rafael Goulart <rafaelgou@gmail.com>
 */
$(function() {
  $('#pessoa_data_de_nascimento').change(function() {
    var idade = $().calculaIdade($('#pessoa_data_de_nascimento').val() );
    if ($('p#dyn_field_data_de_nascimento > span'))
    $('p#dyn_field_data_de_nascimento').append('<span>' + idade + '</span>');
  });
});

/* Bootstrap */

