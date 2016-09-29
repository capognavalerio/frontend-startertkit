module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      main: 'src/js/**/*.js'
    },
    modernizr: {
      dist: {
        "crawl": false,
        "customTests": [],
        "dest": "src/.tmp/js/modernizr.min.js",
        // Define any tests you want to explicitly include
        "tests": [
          "hashchange",
          "history",
          "json",
          "pointerevents",
          "requestanimationframe",
          "svg",
          "touchevents",
          "video",
          "cssanimations",
          "csscalc",
          "ellipsis",
          "flexbox",
          "cssmask",
          "mediaqueries",
          "srcset",
          "matchmedia"
        ],
        "options": [
          "setClasses"
        ],
        "uglify": true
      }
    },
    copy: {
      vendors: {
        files: [{
          expand: true,
          cwd: 'bower_components/outdated-browser/outdatedbrowser/lang',
          src: ['en.html'], // Choose languages that you need
          dest: 'dist/js/outdated-browser'
        }, {
          expand: true,
          cwd: 'bower_components/device.js/lib',
          src: 'device.min.js',
          dest: 'src/.tmp/js'
        }, {
          expand: true,
          cwd: 'bower_components/font-awesome/fonts',
          src: '**',
          dest: 'dist/fonts/font-awesome'
        }]
      }
    },
    bower_concat: {
      all: {
        dest: {
          'js': 'src/.tmp/js/vendors-bottom.js',
          'css': 'src/.tmp/css/vendors.css'
        },
        options: { separator : ';' },
        exclude: [
          'device.js',
          'font-awesome',
          'bootstrap'
        ],
        mainFiles: {},
        dependencies: {}
      }
    },
    uglify: {
      options: {
        sourceMap: true
      },
      vendors: {
        files: {
          'dist/js/vendors-top.min.js': 'src/.tmp/js/vendors-top.js',
          'dist/js/vendors-bottom.min.js': 'src/.tmp/js/vendors-bottom.js'
        }
      },
      main: {
        files: {
          'dist/js/scripts.min.js': 'src/.tmp/js/scripts.js'
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'dist/css/vendors.min.css': 'src/.tmp/css/vendors.css'
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
    concat: {
      options: {
        separator: ';',
        stripBanners: true
      },
      vendors: {
        src:  [
          'src/.tmp/js/modernizr.min.js',
          'src/.tmp/js/device.min.js',
        ],
        dest: 'src/.tmp/js/vendors-top.js'
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
        dest: 'src/.tmp/js/scripts.js',
      },
    },
    notify: {
      scripts: {
        options: {
          title: 'JS Task complete',
          message: 'jshint scripts, concatenated and uglified'
        }
      },
      css: {
        options: {
          title: 'CSS Task complete',
          message: 'less files compiled'
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/js/**/*.js'],
        tasks: ['js', 'notify:scripts']
      },
      css: {
        files: ['src/less/**/*.less'],
        tasks: ['less', 'notify:css']
      }
    },
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
  grunt.loadNpmTasks('grunt-notify');

  grunt.registerTask('vendors', ['modernizr:dist', 'copy:vendors', 'bower_concat', 'concat:vendors', 'uglify:vendors', 'cssmin']);
  grunt.registerTask('style',   ['less']);
  grunt.registerTask('js',      ['jshint:main', 'concat:main', 'uglify:main']);

  grunt.registerTask('default', ['vendors', 'style', 'js']);
  grunt.registerTask('main',    ['style', 'js']);
};
