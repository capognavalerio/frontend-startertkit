// Load Lato Font Family from google web font
WebFontConfig = {
  google: { families: [ 'Lato:400,300,100,100italic,300italic,400italic,700,900,700italic,900italic:latin' ] }
};
(function() {
  var wf = document.createElement('script');
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();


(function($, FastClick, outdatedBrowser) {

  // Initialize Fastclick to remove click delays on browsers with touch UIs
  FastClick.attach(document.body);

  // Enable outdated browser to
  outdatedBrowser({
    bgColor: '#f25648',
    color: '#ffffff',
    lowerThan: 'transform', // < IE10
    languagePath: 'dist/js/outdated-browser/lang/' + $('html').attr('lang') + '.html'
  });

})(jQuery, FastClick, outdatedBrowser);
