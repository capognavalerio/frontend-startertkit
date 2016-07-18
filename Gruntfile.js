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
        exclude: [],
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
        expand: true,
        cwd: 'bower_components/outdated-browser/outdatedbrowser/lang',
        src: '**',
        dest: 'dist/js/outdated-browser'
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

  grunt.registerTask('vendors', ['bower_concat', 'uglify:vendors', 'cssmin', 'copy:vendors']);
  grunt.registerTask('style',   ['less']);
  grunt.registerTask('js',      ['jshint:main', 'concat:main', 'uglify:main']);

  grunt.registerTask('default', ['vendors', 'style', 'js']);
  grunt.registerTask('main',    ['style', 'js']);
};
