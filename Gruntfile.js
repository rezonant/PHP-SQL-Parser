module.exports = function(grunt) {
	var pkg = grunt.file.readJSON('package.json');
	
	// Project configuration.
	
	grunt.initConfig({
		pkg: pkg,
		chmod: {
			options: {
				mode: 'go-w,a+rX'
			},
			all: {
				src: ['doc', 'doc/**']
			}
		},
		watch: {
			gruntfile: {
				files: ['Gruntfile.js'],
				options: {
					reload: true
				},
				tasks: ['default', 'chmod']
			},
			php: {
				files: [
					'src/**/*.php'
				],
				tasks: ['doc']
			}
		},
		shell: {
			options: {
				stderr: false
			},
			doc: {
				command: 'apigen --source src --destination doc'
			}
		},

		githubPages: {
			target: {
				options: {
					// The default commit message for the gh-pages branch
					commitMessage: 'Updated documentation'
				},
				
				// The folder where your gh-pages repo is
				src: 'doc',
				dest: '_site/doc'
			}
		}
	});

	// Load the plugin that provides the "uglify" task
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-chmod');
	grunt.loadNpmTasks('grunt-github-pages');

	// Default task(s).
	grunt.registerTask('doc', ['shell:doc', 'chmod']);
	grunt.registerTask('push-doc', ['doc', 'githubPages']);
	grunt.registerTask('default', ['doc']);

};
