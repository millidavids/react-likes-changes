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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-react');

  grunt.registerTask('default', ['sass', 'cssmin', 'react', 'uglify']);
};
