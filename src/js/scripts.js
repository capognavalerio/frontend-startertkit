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
