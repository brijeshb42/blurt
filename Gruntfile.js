'use strict';
module.exports = function(grunt){

	require('load-grunt-tasks')(grunt);

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		opts: {
			app: 'src',
			dist: 'dist',
			tmp: '.tmp'
		},
		
		jshint: {
			options: grunt.file.readJSON('.jshintrc'),
			files: ['src/js/<%= pkg.name %>.js']
		},

		compass: {
			dev: {
				options: {
					sassDir: ['<%= opts.app %>/sass'],
					cssDir: ['<%= opts.app %>/css'],
				}
			},
			dist: {
				options: {
					sassDir: ['<%= opts.app %>/sass'],
					cssDir: ['<%= opts.dist %>/css'],
					outputStyle: 'compressed',
					noLineComments: true,
					environment: 'production'
				}
			}
		},
		
		concat: {
			options: {
				separator: ';'
			},
			dev: {
				src: ['<%= opts.app %>/js/<%= pkg.name %>.js'],
				dest: '<%= opts.tmp %>/js/concat.min.js'
			},
			dist: {
				src: ['<%= opts.app %>/js/<%= pkg.name %>.js'],
				dest: '<%= opts.tmp %>/js/<%= pkg.name %>.min.js'
			}
		},
		
		uglify: {
			options: {
				banner: '/*!\n'+
					'* @package: <%= pkg.name %>,\n'+
					'* @author: <%= pkg.author %>\n'+
					'* @creationDate: <%= grunt.template.today("dd-mm-yyyy") %>\n'+
					'* @license: <%= pkg.license %>\n*/\n',
				mangle: true
			},
			dev: {
				files: {
					'<%= opts.app %>/js/<%= pkg.name %>.min.js': ['<%= opts.app %>/js/<%= pkg.name %>.js']
				}
			},
			dist: {
				files: {
					'<%= opts.dist %>/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},

		watch: {
			js: {
				files: ['<%= opts.app %>/js/<%= pkg.name %>.js'],
				tasks: ['jshint'],
				options: {
			      	reload: true,
			    },
			},
			css: {
				files: [
					'<%= opts.app %>/sass/*.scss',
				],
				tasks: ['compass:dev'],
				options: {
			      	reload: true,
			    },
			}
		},
		
		clean: {
			cache: {
				src: ['.sass-cache']
			},
			tmp: {
				src: ['<%= opts.tmp %>']
			},
			/*dist: {
				src: ['<%= opts.dist %>']
			},*/
			dev: {
				files: [{
					src: ['<%= opts.app %>/js/<%= pkg.name %>.min.js','<%= opts.app %>/css/<%= pkg.name %>.min.css',]
				}]
			}
		}
	});

	grunt.registerTask('default',['jshint','uglify:dev','compass:dev','watch']);
	grunt.registerTask('dist',['clean','concat:dist','uglify:dist','compass:dist']);

};