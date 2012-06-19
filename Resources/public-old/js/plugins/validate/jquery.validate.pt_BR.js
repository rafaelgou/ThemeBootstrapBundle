jQuery.validator.messages.email = "Email inválido";
jQuery.validator.messages.required = "Campo obrigatório";
jQuery.validator.messages.remote = "Campo inválido";
jQuery.validator.messages.email = "Email inválido";
jQuery.validator.messages.url = "URL inválida";
jQuery.validator.messages.date = "Data inválida";
jQuery.validator.messages.dateISO = "Data ISO inválida";
jQuery.validator.messages.number = "Número decimal inválido";
jQuery.validator.messages.digits = "Informe somente dígitos";
jQuery.validator.messages.creditcard = "Cartão de Crédito inválido";
jQuery.validator.messages.equalTo = "Valores não são iguais";
jQuery.validator.messages.accept = "Extensão inválida";
jQuery.validator.messages.maxlength = $.validator.format("Máximo de {0} caracteres");
jQuery.validator.messages.minlength = $.validator.format("Mínimo de {0} caracteres");
jQuery.validator.messages.rangelength = $.validator.format("Tamanho deve ser entre {0} e {1} caracteres");
jQuery.validator.messages.range = $.validator.format("Valor deve ser entre {0} e {1}");
jQuery.validator.messages.max = $.validator.format("Valor máximo de {0}");
jQuery.validator.messages.min = $.validator.format("Valor mínimo de {0}");
jQuery.validator.messages.integer = "Informe um número inteiro válido";

/**
  * Overriding date validator with dateITA (see plugins/validate/additional-methods.js
  */
jQuery.validator.addMethod(
	"date",
	function(value, element) {
		var check = false;
		var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
		if( re.test(value)){
			var adata = value.split('/');
			var gg = parseInt(adata[0],10);
			var mm = parseInt(adata[1],10);
			var aaaa = parseInt(adata[2],10);
			var xdata = new Date(aaaa,mm-1,gg);
			if ( ( xdata.getFullYear() == aaaa ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == gg ) )
				check = true;
			else
				check = false;
		} else
			check = false;
		return this.optional(element) || check;
	},
	"Data inválida"
);

/**
  * Overriding number validator
  */
jQuery.validator.addMethod(
	"number",
	function(value, element) {
    return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:\,\d+)?$/.test(value);
	},
	"Número decimal inválido"
);


/*
 * Próximos validadores retirados de:
 * http://blog.shiguenori.com/2009/05/29/validar-cpf-cnpj-com-jquery-validate/
 */

jQuery.validator.addMethod("cpf", function(value, element) {
  value = jQuery.trim(value);
	value = value.replace('.','');
	value = value.replace('.','');
	cpf = value.replace('-','');
	while(cpf.length != 11) return this.optional(element) || false;
	var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
	var a = [];
	var b = new Number;
	var c = 11;
	for (i=0; i<11; i++){
		a[i] = cpf.charAt(i);
		if (i < 9) b += (a[i] * --c);
	}
	if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
	b = 0;
	c = 11;
	for (y=0; y<10; y++) b += (a[y] * c--);
	if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }
	if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) return this.optional(element) || false;
	return this.optional(element) || true;
}, "Informe um CPF válido."); // Mensagem padrão

jQuery.validator.addMethod("dateBR", function(value, element) {
	 //contando chars
	if(value.length!=10) return this.optional(element) || false;
	// verificando data
	var data 		= value;
	var dia 		= data.substr(0,2);
	var barra1		= data.substr(2,1);
	var mes 		= data.substr(3,2);
	var barra2		= data.substr(5,1);
	var ano 		= data.substr(6,4);
	if(data.length!=10||barra1!="/"||barra2!="/"||isNaN(dia)||isNaN(mes)||isNaN(ano)||dia>31||mes>12)return false;
	if((mes==4||mes==6||mes==9||mes==11) && dia==31) return this.optional(element) || false;
	if(mes==2  &&  (dia>29||(dia==29 && ano%4!=0))) return this.optional(element) || false;
	if(ano < 1900) return this.optional(element) || false;
	return this.optional(element) || true;
}, "Informe uma data válida");  // Mensagem padrão

jQuery.validator.addMethod("dateTimeBR", function(value, element) {
	 //contando chars
	if(value.length!=16) return this.optional(element) || false;
	 // dividindo data e hora
	if(value.substr(10,1)!=' ') return this.optional(element) || false; // verificando se há espaço
	var arrOpcoes = value.split(' ');
	if(arrOpcoes.length!=2) return this.optional(element) || false; // verificando a divisão de data e hora
	// verificando data
	var data 		= arrOpcoes[0];
	var dia 		= data.substr(0,2);
	var barra1		= data.substr(2,1);
	var mes 		= data.substr(3,2);
	var barra2		= data.substr(5,1);
	var ano 		= data.substr(6,4);
	if(data.length!=10||barra1!="/"||barra2!="/"||isNaN(dia)||isNaN(mes)||isNaN(ano)||dia>31||mes>12)return this.optional(element) || false;
	if ((mes==4||mes==6||mes==9||mes==11) && dia==31) return this.optional(element) || false;
	if (mes==2  &&  (dia>29||(dia==29 && ano%4!=0))) return this.optional(element) || false;
	// verificando hora
	var horario 	= arrOpcoes[1];
	var	hora 		= horario.substr(0,2);
	var doispontos 	= horario.substr(2,1);
	var minuto 		= horario.substr(3,2);
	if(horario.length!=5||isNaN(hora)||isNaN(minuto)||hora>23||minuto>59||doispontos!=":") return this.optional(element) || false;
	return this.optional(element) || true;
}, "Informe uma data e uma hora válida");

/*
 * NOVO METODO PARA O JQUERY VALIDATE
 * VALIDA CNPJ COM 14 OU 15 DIGITOS
 * A VALIDAÇÃO É FEITA COM OU SEM OS CARACTERES SEPARADORES, PONTO, HIFEN, BARRA
 *
 * ESTE MÉTODO FOI ADAPTADO POR:
 *
 * Shiguenori Suguiura Junior <junior@dothcom.net>
 *
 * http://blog.shiguenori.com
 * http://www.dothcom.net
 * 
 */
jQuery.validator.addMethod("cnpj", function(cnpj, element) {
   cnpj = jQuery.trim(cnpj);

	// DEIXA APENAS OS NÚMEROS
   cnpj = cnpj.replace('/','');
   cnpj = cnpj.replace('.','');
   cnpj = cnpj.replace('.','');
   cnpj = cnpj.replace('-','');

   var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
   digitos_iguais = 1;

   if (cnpj.length < 14 && cnpj.length < 15){
      return this.optional(element) || false;
   }
   
   for (i = 0; i < cnpj.length - 1; i++){
      if (cnpj.charAt(i) != cnpj.charAt(i + 1)){
         digitos_iguais = 0;
         break;
      }
   }
   if (!digitos_iguais){
      tamanho = cnpj.length - 2
      numeros = cnpj.substring(0,tamanho);
      digitos = cnpj.substring(tamanho);
      soma = 0;
      pos = tamanho - 7;

      for (i = tamanho; i >= 1; i--){
         soma += numeros.charAt(tamanho - i) * pos--;
         if (pos < 2){
            pos = 9;
         }
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0)){
         return this.optional(element) || false;
      }
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0,tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--){
         soma += numeros.charAt(tamanho - i) * pos--;
         if (pos < 2){
            pos = 9;
         }
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1)){
         return this.optional(element) || false;
      }
      return this.optional(element) || true;
   }else{
      return this.optional(element) || false;
   }
}, "Informe um CNPJ válido."); // Mensagem padrão

jQuery.validator.addMethod("notEqual", function(value, element, param) {
   return this.optional(element) || value == $(param).val() ? false : true;
}, "Este valor não pode ser igual"); // Mensagem padrão

jQuery.validator.addMethod("diferenteDe", function(value, element, strCompara) {
   return this.optional(element) || value == strCompara ? false : true;
}, "Este valor não foi alterado"); // Mensagem padrão


/*
 * Validando CPF ou CNPJ num único validador
 * Idéia de
 * http://stackoverflow.com/questions/3138646/combining-validation-methods-in-jquery-validation-plugin-with-or-instead-of-an
 */
$.validator.addMethod("cpf_cnpj", function(value, element) {
    return $.validator.methods.cpf.apply(this, arguments)
        || $.validator.methods.cnpj.apply(this, arguments);
}, "Informe um CPF ou CNPJ válidos");
