//scaricare da bower components e mettere nella cartella vendor
module.exports = {
  // See http://brunch.io for documentation.
  files: {
    javascripts: {
      joinTo: {
        'app.js':/^app/,
        'vendor.js':/^app\/scripts\/libs\//
      },
      order: {
        before: [
          "vendor/jquery.min.js",
          "vendor/angular.min.js"
        ]
      }
    },
    stylesheets: {joinTo: 'style/app.css'},
    templates: {joinTo: 'app.js'}
  },
  server: {
    port: 8080,
    base:'/skeletonApp/'
  },
  modules: {
    wrapper: false,
    definition: false
  },
  npm: {
    enabled: false
  },
  plugins: {
    uglify: {
      mangle: false
    }
  },
  overrides: {
    production: {
      //optimize: false,
      modules: {
        wrapper: false,
        definition: false
      }
    }
  }
};
