module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    less: {
      development: {
        options: {
          compress: true,
        },
        files: {
          "./build/Styles/main.min.css": "./dev/Styles/main.less",
        },
      },
    },

    imagemin: {
      dynamic: {
        files: [{
            expand: true,
            cwd: './dev/img',
            src: ['**/*.{png,jpg,gif,ico,svg,jpeg}'],
            dest: './build/img'
        }]
    }
    },

    watch: {
      styles: {
        files: ["./dev/Styles/*.less"],
        tasks: ["less"],
        options: {
          spawn: false,
        },
      },
      img: {
        files: ["./dev/img/*.{png,jpg,gif,jpeg}"],
        tasks: ["newer:imagemin"],
        options: {
          spawn: false,
        },
      },
    },
    concurrent: {
      target: ["less", "watch", "imagemin"],
    },
  });

  grunt.registerTask("default", ["concurrent"]);
};
