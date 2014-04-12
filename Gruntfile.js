'use strict';

module.exports = function(grunt) {

  // Configurable paths
  var myConfig = {
    src: 'src',
    dist: 'dist'
  };

  // Load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    co: myConfig,
    meta: {
      banner: '/**\n' +
        ' * <%= pkg.name %>\n' +
        ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * @link <%= pkg.homepage %>\n' +
        ' * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
        ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
        ' */\n'
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= co.dist %>/*',
            '!<%= co.dist %>/.git*'
          ]
        }]
      }
    },
    jshint: {
      src: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['<%= co.src %>/{,*/}*.js']
      }
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>',
        stripBanners: true
      },
      dist: {
        src: ['<%= co.src %>/<%= pkg.name %>.js'],
        dest: '<%= co.dist %>/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: '<%= co.dist %>/<%= pkg.name %>.min.js'
      }
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'concat:dist',
    'uglify:dist'
  ]);

  grunt.registerTask('default', ['build']);

};