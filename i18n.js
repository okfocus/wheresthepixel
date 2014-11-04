var default_locale = "en-US";
var i18n_strings = {
  'fr': {
    'title': "Où est le pixel?",
    'win': ["Vous l'avez trouvé!"]
  },
  'es': {
    'title': "¿Dónde está el píxel?",
    'win': ["¡Lo ha encontrado!"]
  },
  'pt': {  // thanks ingrid!
    'title': "Onde é o pixel?",
    'win': ["Encontrou! Você é experto", "Bom trabalho!", "Parabéns!", "Você trabalha aqui?"]
  },
  'de': {
    'title': "Wo ist der Pixel?",
    'win': ["Du hast es gefunden!"]
  },
  'ru': {
    'title': "Где пиксель?",
    'win': ["Отлично!", "Молодец!", "Нашёл!"]
  },
  'ko': {  // thanks sae!
    'title': "픽셀을 찾아라!",
    'win': ["찾았다!"],
    'callback': function(){
      $("u").css({"text-decoration": "none !important"});
    }
  }
};
var fb_locales = {
  'af': 'af_ZA',
  'ar': 'ar_AR',
  'bg': 'bg_BG',
  'bn': 'bn_IN',
  'ca': 'ca_ES',
  'cs': 'cs_CZ',
  'cy': 'cy_GB',
  'da': 'da_DK',
  'de': 'de_DE',
  'el': 'el_GR',
  'en': 'en_US',
  'es': 'es_LA',
  'fi': 'fi_FI',
  'fr': 'fr_FR',
  'he': 'he_IL',
  'hi': 'hi_IN',
  'hr': 'hr_HR',
  'hu': 'hu_HU',
  'id': 'id_ID',
  'it': 'it_IT',
  'ja': 'ja_JP',
  'ko': 'ko_KR',
  'lt': 'lt_LT',
  'ml': 'ml_IN',
  'ms': 'ms_MY',
  'nb': 'nb_NO',
  'nl': 'nl_NL',
  'pa': 'pa_IN',
  'pl': 'pl_PL',
  'pt': 'pt_BR',
  'ro': 'ro_RO',
  'ru': 'ru_RU',
  'sk': 'sk_SK',
  'sl': 'sl_SI',
  'sr': 'sr_RS',
  'sv': 'sv_SE',
  'ta': 'ta_IN',
  'te': 'te_IN',
  'th': 'th_TH',
  'tl': 'tl_PH',
  'tr': 'tr_TR',
  'vi': 'vi_VN',
  'zh': 'zh_CN'
};
function locale () {
  if ( navigator ) {
    if ( navigator.language )
      return navigator.language;
    else if ( navigator.browserLanguage )
      return navigator.browserLanguage;
    else if ( navigator.systemLanguage )
      return navigator.systemLanguage;
    else if ( navigator.userLanguage )
      return navigator.userLanguage;
  }
  return default_locale;
}
function language () {
  var loc = locale();
  return loc.split('-')[0]
}
function fb_locale () {
  var locale = "en_US", lang = language();
  if (fb_locales.hasOwnProperty(lang)) locale = fb_locales[lang];
  return locale;
}
$(function(){
  function do_i18n () {
    var $title = $("u"),
    $win = $("win"),
    $twitter = $("#twitter");
    var lang = language();
    if (i18n_strings.hasOwnProperty(lang)) {
      var strings = i18n_strings[lang];
      if (strings.hasOwnProperty('title'))
        $title.html(strings.title);
      if (strings.hasOwnProperty('twitter'))
        $twitter.html(strings.twitter);
      if (strings.hasOwnProperty('win')) {
        $win.html(strings.win[0]);
        window.win_strings = strings.win;
      }
      if (strings.hasOwnProperty('callback')) {
        strings.callback();
      }
    }
  }
  do_i18n();
});

