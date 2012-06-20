/**
 * Javascript alert function overrided by jQuery UI
 * @param string message
 * @author Rafael Goulart <rafaelgou@gmail.com>
 */
window.alert = function(message)
{
    bootbox.alert(message.replace(/\n/, "<br />"));
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
    bootbox.confirm(message, "Cancelar", "Confirmar", function(confirmed) {
        if (confirmed == true) {
          var f = document.createElement('form');
          f.style.display = 'none';
          $('body').after(f);
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
          return true;
        } else {
            return false;
        }
    });
    return false;
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
  $("#flash").addClass('alert-'+type);
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
}
/**
TODO Find a way to uncheck
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
*/


/**
* Open Ready
*/
$(function() {

    /**
     * Activates datepicker
     * @author Rafael Goulart <rafaelgou@gmail.com>
     */
    $.datepicker.setDefaults($.datepicker.regional['pt-BR']);
    $('input[type=date], .date').datepicker();
    $('.datetime').datetimepicker();

    /**
     * Activates richtext editor
     * @author Rafael Goulart <rafaelgou@gmail.com>
     */
    $('.richtext, .cleditor').cleditor({
        useCSS: true,
        height:"100%",
        width: "90%"
    });

    /**
     * Activates age calculation
     * @author Rafael Goulart <rafaelgou@gmail.com>
     */
    $('.age_calc').change(function() {
    var age = $().calculaIdade($('.age_calc').val() );
    $('.age_calc').append('<span class="age_calc_value">' + age + '</span>');
    });

    /**
     * Chosen Activation
     * @author Rafael Goulart <rafaelgou@gmail.com>
     */
    $(".chzn-select, .chzn-choices, .chosen").chosen();
    $(".chzn-select-deselect").chosen({allow_single_deselect:true});
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
    $(".tabs").tab();

    /**
     * Activates onmouseover details under <tr> tags
     * @author Rafael Goulart <rafaelgou@gmail.com>
     */
    $('tr,.has_details').hover(
      function() {
        $(this).find('.details').show();
        $(this).find('.details_fixed').addClass('details_fixed_show');
      },
      function() {
        $(this).find('.details').hide();
        $(this).find('.details_fixed').removeClass('details_fixed_show');
      }
    );


    /**
     * DataTables Activate
     * @author Rafael Goulart <rafaelgou@gmail.com>
     */
	$(".dataTables").dataTable({
        //"sDom": '<"H"frC>t<"F"ip>',
        "sDom": "<'row'<'span4'l><'span2'C><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
        "oColVis": {
            "buttonText": "Colunas Visíveis",
            "bRestore": true,
            "sRestore": "Restaurar Todas",
            "sAlign": "right",
            "iOverlayFade": 100,
            "aiExclude": [ 0 ]
        },
		"bJQueryUI": false,
		"bInfo": true,
		"bLengthChange": true,
        "sPaginationType": "bootstrap",
        "iDisplayLength": 10,
//		"aoColumnDefs": [
//			{ "bSortable": false, "aTargets": [ 0 ] }
//		],
		"oLanguage": {
			"sLengthMenu": "Mostrar _MENU_ por página",
			"sZeroRecords": "Nada encontrado",
			"sInfo": "Mostrando _START_ até _END_ de _TOTAL_ itens",
			"sInfoEmpty": "Mostrando 0 itens",
			"sInfoFiltered": "(de um total de _MAX_ itens)",
			"sSearch": "Busca: ",
			"oPaginate": {
				"sFirst": "Primeira",
				"sLast": "Última",
				"sNext": "Próxima",
				"sPrevious": "Anterior"
			}
		}
	});

    /**
     * DataTables Activate
     * @author Rafael Goulart <rafaelgou@gmail.com>
     */
	$(".gridDataTables").dataTable({
        //"sDom": '<"H"frC>t<"F"ip>',
        "sDom": "<'row'<'span3'l><'span2'C><'span3'f>r>t<'row'<'span4'i><'span4'p>>",
        "oColVis": {
            "buttonText": "Colunas Visíveis",
            "bRestore": true,
            "sRestore": "Restaurar Todas",
            "sAlign": "right",
            "iOverlayFade": 100,
            "aiExclude": [ 0 ]
        },
		"bJQueryUI": false,
		"bInfo": true,
		"bLengthChange": true,
        "sPaginationType": "bootstrap",
        "iDisplayLength": 10,
//		"aoColumnDefs": [
//			{ "bSortable": false, "aTargets": [ 0 ] }
//		],
		"oLanguage": {
			"sLengthMenu": "Mostrar _MENU_ por página",
			"sZeroRecords": "Nada encontrado",
			"sInfo": "Mostrando _START_ até _END_ de _TOTAL_ itens",
			"sInfoEmpty": "Mostrando 0 itens",
			"sInfoFiltered": "(de um total de _MAX_ itens)",
			"sSearch": "Busca: ",
			"oPaginate": {
				"sFirst": "Primeira",
				"sLast": "Última",
				"sNext": "Próxima",
				"sPrevious": "Anterior"
			}
		}
	});

    /**
     * DataTables Activate
     * @author Rafael Goulart <rafaelgou@gmail.com>
     */
	$(".stackedDataTables").dataTable({
        //"sDom": '<"H"frC>t<"F"ip>',
        "sDom": "<'row'<'span4'l><'span4'f>r>t<'row'<'span4'i><'span4'p>>",
		"bJQueryUI": false,
		"bInfo": true,
		"bLengthChange": true,
        "sPaginationType": "bootstrap",
        "iDisplayLength": 10,
		"aoColumnDefs": [
			{"bSortable": false, "aTargets": [ 0 ]}
		],
		"oLanguage": {
			"sLengthMenu": "Mostrar _MENU_ por página",
			"sZeroRecords": "Nada encontrado",
			"sInfo": "Mostrando _START_ até _END_ de _TOTAL_ itens",
			"sInfoEmpty": "Mostrando 0 itens",
			"sInfoFiltered": "(de um total de _MAX_ itens)",
			"sSearch": "Busca: ",
			"oPaginate": {
				"sFirst": "Primeira",
				"sLast": "Última",
				"sNext": "Próxima",
				"sPrevious": "Anterior"
			}
		}
	});
    $('.ColVis_Button').addClass('btn');

// Closing Ready
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
