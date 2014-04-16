module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('bower.json'),
        karma: {
            unit: {
                configFile: 'karma.config.js',
                browsers: ['PhantomJS']
            },
            watch: {
                configFile: 'karma.conf.js',
                singleRun: false,
                autoWatch: true
            }
        },
        uglify: {
          options: {
            preserveComments: 'some'
          },
          dist: {
            src: '<%= pkg.name %>.js',
            dest: '<%= pkg.name %>.min.js'
          }
        },
        ngmin: {
          dist: {
            src: '<%= pkg.name %>.js',
            dest: '<%= pkg.name %>.js'
          }
        },
        concat: {
          options: {
            process: true
          },
          dist: {
            src: 'src/<%= pkg.name %>.js',
            dest: '<%= pkg.name %>.js'
          }
        }
    });

    grunt.registerTask('default', ['concat', 'ngmin', 'uglify']);
    grunt.registerTask('test', ['karma:unit']);
};
