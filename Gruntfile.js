module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    cssmin: {
      my_target: {
        files: [{
          expand: true,
          cwd: './app/assets/styles/',
          src: ['*.css', '!*.min.css'],
          dest: './app/assets/styles/',
          ext: '.min.css'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
};
