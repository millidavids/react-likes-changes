module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    cssmin: {
      combine: {
        files: {
          './build/assets/styles/application.min.css': ['./src/assets/styles/*.css']
        }
      }
    },
    uglify: {
      options: {
        manage: false
      },
      target: {
        files: {
          './build/assets/scripts/application.min.js': ['./src/assets/scripts/js/*.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
};
