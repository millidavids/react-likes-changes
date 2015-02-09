module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          'sourcemap': 'none'
        },
        files: [{
          expand: true,
          cwd: './src/assets/styles/sass/',
          src: ['*.scss'],
          dest: './src/assets/styles/css/',
          ext: '.css'
        }]
      }
    },

    cssmin: {
      combine: {
        files: {
          './build/assets/styles/main.min.css': ['./src/assets/styles/css/*.css']
        }
      }
    },

    react: {
      dynamic_mappings: {
        files: [{
          expand: true,
          cwd: './src/assets/scripts/jsx/',
          src: ['*.jsx'],
          dest: './src/assets/scripts/js/',
          ext: '.js'
        }]
      }
    },

    uglify: {
      options: {
        manage: false
      },
      target: {
        files: {
          './build/assets/scripts/bundle.min.js': ['./src/assets/scripts/js/bundle.js']
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      bower: {
        files: ['./bower.json'],
        tasks: ['wiredep']
      },
      sass: {
        files: ['./src/assets/styles/sass/*.scss'],
        tasks: ['sass', 'cssmin']
      },
      jsx: {
        files: ['./src/assets/scripts/jsx/*.jsx'],
        tasks: ['react', 'uglify']
      },
      index: {
        files: ['./src/index.html'],
        tasks: ['copy']
      }
    },

    copy: {
      index: {
        files: [{
          expand: true,
          cwd: './src/',
          src: ['index.html'],
          dest: './build/'
        }]
      }
    },

    express: {
      all: {
        options: {
          hostname: 'localhost',
          bases: './build/',
          livereload: true
        }
      }
    },

    wiredep: {
      app: {
        src: ['./src/index.html']
      }
    },

    browserify: {
      dev: {
        files: {
          './src/assets/scripts/js/bundle.js': ['./src/assets/scripts/js/*.js']
        }
      }
    },

    bower: {
      install: {
        options : {
          targetDir : './vendor/bower_components',
          layout : 'byComponent',
          verbose: true,
          cleanup: true
        }
      }
    },

    browserifyBower: {
      vendor: {

      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-browserify-bower');

  grunt.registerTask('default', ['sass', 'cssmin', 'react', 'browserify', 'uglify','wiredep', 'copy']);
  grunt.registerTask('server', ['default', 'express', 'watch']);
};
