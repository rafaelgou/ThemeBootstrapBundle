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
