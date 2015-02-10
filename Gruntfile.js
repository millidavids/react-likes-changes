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
          './build/assets/scripts/main.min.js': ['./src/assets/scripts/js/*.js']
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: ['./src/assets/styles/sass/*.scss'],
        tasks: ['sass', 'cssmin']
      },
      jsx: {
        files: ['./src/assets/scripts/jsx/*.jsx'],
        tasks: ['react', 'uglify', 'browserify']
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

    browserify: {
      build: {
        files: {
          'build/assets/scripts/browserified.min.js': ['build/assets/scripts/main.min.js'],
        }
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
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['sass', 'cssmin', 'react',
                                 'uglify', 'browserify', 'copy']);
  grunt.registerTask('server', ['default', 'express', 'watch']);
};
