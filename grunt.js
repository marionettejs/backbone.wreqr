/*global module:false*/
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-rigger');
  grunt.loadNpmTasks('grunt-jasmine-runner');

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.0.0',
      banner: '// Backbone.Wreqr, v<%= meta.version %>\n' +
        '// Copyright (c)<%= grunt.template.today("yyyy") %> Derick Bailey, Muted Solutions, LLC.\n' + 
        '// Distributed under MIT license\n' + 
        '// http://github.com/marionettejs/backbone.wreqr'
    },

    lint: {
      files: ['src/wreqr*.js']
    },

    rig: {
      build: {
        src: ['<banner:meta.banner>', 'src/wreqr.js'],
        dest: 'lib/backbone.wreqr.js'
      },
      amd: {
        src: ['<banner:meta.banner>', 'src/amd.js'],
        dest: 'lib/amd/backbone.wreqr.js'
      }
    },

    min: {
      standard: {
        src: ['<banner:meta.banner>', '<config:rig.build.dest>'],
        dest: 'lib/backbone.wreqr.min.js'
      },
      amd: {
        src: ['<banner:meta.banner>', '<config:rig.amd.dest>'],
        dest: 'lib/amd/backbone.wreqr.min.js'
      },
    },

    jasmine : {
      src : [
        'public/javascripts/json2.js',
        'public/javascripts/jquery.js',
        'public/javascripts/underscore.js',
        'public/javascripts/backbone.js',
        'src/wreqr.js',
        'spec/javascripts/support/wreqrHelper.js',
        'src/wreqr.handlers.js',
        'src/wreqr.*.js'
      ],
      helpers : 'spec/javascripts/helpers/*.js',
      specs : 'spec/javascripts/**/*.spec.js'
    },

    'jasmine-server' : {
      browser : false
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: false,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true,
        Backbone: true,
        _: true,
        Marionette: true,
        Wreqr: true,
        $: true,
        slice: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint rig min');

};
