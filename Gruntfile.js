module.exports = function(grunt) {
  grunt.initConfig({
  
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n',
    meta: {
      version: '2.0.0'
    },

    // Config Tasks

    sass: {
      dist: {
        options: {
          unixNewlines:true,
          style:"compressed",
          loadPath: [
            "_assets/style/",
          ],
        },
        files: {
          "dist/app.css": "_assets/style/app.scss",
        },
      },
    },
    concat: {
      options: {
        stripBanners: true,
      },
      custom: {
        src: [ '_assets/scripts/app.js' ],
        dest: 'dist/app.js',
        //nonull: true,
      },
    },
    copy: {
      options: {
        stripBanners:true,
      },
    },
    uglify: {
      options: {
        stripBanners: true,
      },
      custom: {
        src: ['<%= concat.custom.dest %>'],
        dest: 'dist/app.min.js',
        nonull: true,
      },
    },
    jshint: {
      gruntfile: {
        files: {
          src: ['gruntfile.js']
        }
      },
      concat_before: {
        files: {
          src: ['_assets/scripts/**/*.js']
        }
      },
      concat_after: {
        files: {
          src: ['dist/app.js']
        }
      }
    },
    watch: {
      gruntfile: {
        files: [ 'gruntfile.js' ],
        tasks: [ 'jshint:gruntfile' ]
      },
      js: {
        files: [
          "_assets/scripts/**/*.js"
        ],
        tasks: [ "jshint:concat_before", "concat:custom", "jshint:concat_after", "uglify:custom" ],
      },
      style: {
        files: [
          "_assets/style/**/*.scss",
        ],
        tasks: [ "sass" ],
      },
    },
  });
  
  // Load the plugins for tasks.
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  // Inital Setup Task
  grunt.registerTask( 'init', [ 'init' , 'build' ] );
  
  // Build Task
  grunt.registerTask( 'build' , [ 'concat' , 'copy' , 'sass' , 'uglify' ] );

  // Default task(s).
  grunt.registerTask( 'default' , ['build'] );
  
};