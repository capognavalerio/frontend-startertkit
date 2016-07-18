module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      main: 'src/js/**/*.js'
    },
    bower_concat: {
      all: {
        dest: {
          'js': '.tmp/js/vendors.js',
          'css': '.tmp/css/vendors.css'
        },
        options: { separator : ';' },
        exclude: [
          'device.js'
        ],
        mainFiles: {},
        dependencies: {}
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      main: {
        src: 'src/js/*.js',
        /*
        Use array to concat js files
        src: [
          'src/js/script-1.js',
          'src/js/script-2.js',
          'src/js/script-3.js',
          'src/js/script-4.js',
        ],
        */
        dest: '.tmp/js/scripts.js',
      },
    },
    cssmin: {
      target: {
        files: {
          'dist/css/vendors.min.css': '.tmp/css/vendors.css'
        }
      }
    },
    uglify: {
      vendors: {
        files: {
          'dist/js/vendors.min.js': '.tmp/js/vendors.js'
        }
      },
      main: {
        files: {
          'dist/js/scripts.min.js': '.tmp/js/scripts.js'
        }
      }
    },
    less: {
      all: {
        options: {
          compress: true,
          strictMath: false,
          paths: ['src/less'],
          plugins: [
            (new (require('less-plugin-autoprefix'))({ browsers: ['> 1%', 'Last 2 versions', 'IE 9']})),
            (new (require('less-plugin-clean-css'))({ advanced: true }))
          ]
        },
        files: {
          'dist/css/style.min.css': 'src/less/style.less'
        }
      }
    },
    copy: {
      vendors: {
        files: [{
          expand: true,
          cwd: 'bower_components/outdated-browser/outdatedbrowser/lang',
          src: '**', // copy all languages file or choose languages that you need []
          dest: 'dist/js/outdated-browser'
        }, {
          expand: true,
          cwd: 'bower_components/device.js/lib',
          src: 'device.min.js',
          dest: 'dist/js'
        }]
      }
    },
    modernizr: {
      dist: {
        "crawl": false,
        "customTests": [],
        "dest": "dist/js/modernizr.min.js",
        // Define any tests you want to explicitly include
        "tests": [
          "audio",
          "canvas",
          "cookies",
          "hashchange",
          "history",
          "json",
          "pointerevents",
          "requestanimationframe",
          "svg",
          "touchevents",
          "unicode",
          "video",
          "cssanimations",
          "appearance",
          "backdropfilter",
          "backgroundblendmode",
          "backgroundcliptext",
          "bgpositionshorthand",
          "bgpositionxy",
          [
            "bgrepeatspace",
            "bgrepeatround"
          ],
          "backgroundsize",
          "bgsizecover",
          "borderimage",
          "borderradius",
          "boxshadow",
          "boxsizing",
          "csscalc",
          "checked",
          "csschunit",
          "csscolumns",
          "cubicbezierrange",
          "display-runin",
          "displaytable",
          "ellipsis",
          "cssescape",
          "cssexunit",
          "cssfilters",
          "flexbox",
          "flexboxlegacy",
          "flexboxtweener",
          "flexwrap",
          "fontface",
          "generatedcontent",
          "cssgradients",
          "csshairline",
          "hsla",
          [
            "csshyphens",
            "softhyphens",
            "softhyphensfind"
          ],
          "cssinvalid",
          "lastchild",
          "cssmask",
          "mediaqueries",
          "multiplebgs",
          "nthchild",
          "objectfit",
          "opacity",
          "overflowscrolling",
          "csspointerevents",
          "csspositionsticky",
          "csspseudoanimations",
          "csspseudotransitions",
          "cssreflections",
          "regions",
          "cssremunit",
          "cssresize",
          "rgba",
          "cssscrollbar",
          "scrollsnappoints",
          "shapes",
          "siblinggeneral",
          "subpixelfont",
          "supports",
          "target",
          "textalignlast",
          "textshadow",
          "csstransforms",
          "csstransforms3d",
          "preserve3d",
          "csstransitions",
          "userselect",
          "cssvalid",
          "cssvhunit",
          "cssvmaxunit",
          "cssvminunit",
          "cssvwunit",
          [
            "devicemotion",
            "deviceorientation"
          ],
          "placeholder",
          "sizes",
          "srcset",
          "xhrresponsetypejson",
          "scriptasync",
          "getusermedia",
          [
            "atobbtoa"
          ],
          "matchmedia"
        ],
        "options": [
          "setClasses"
        ],
        "uglify": true
      }
    },
    watch: {
      scripts: {
        files: ['src/js/**/*.js'],
        tasks: ['js']
      },
      css: {
        files: ['src/less/**/*.less'],
        tasks: ['less']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-modernizr");

  grunt.registerTask('vendors', ['bower_concat', 'uglify:vendors', 'cssmin', 'copy:vendors', 'modernizr:dist']);
  grunt.registerTask('style',   ['less']);
  grunt.registerTask('js',      ['jshint:main', 'concat:main', 'uglify:main']);

  grunt.registerTask('default', ['vendors', 'style', 'js']);
  grunt.registerTask('main',    ['style', 'js']);
};
