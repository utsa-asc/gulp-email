var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var gulpIf = require('gulp-if');
var reload = browserSync.reload;
var email = require('gulp-mail');
var smtpInfo = {
  host: 'osmtp.utsa.edu',
  secureConnection: false,
  port: 25
};

var src = {
  html: "app/**/*.html"
};

gulp.task('email-single', function() {
  /*
  gulp.src('./app/PRES/pres-vision.html')
    .pipe(email({
      subject: 'We are UTSA! - TESTING | President Vision',
      to: [
        'john.garza@utsa.edu'
      ],
      from: 'WebTeam <webteam@utsa.edu>',
      smtp: smtpInfo
    }));
    */

  return gulp.src('./app/PRES/pres-vision.html')
    .pipe(email({
      subject: 'We are UTSA! - TESTING | President Vision',
      to: [
        'john.garza@utsa.edu'
      ],
      from: 'WebTeam <webteam@utsa.edu>',
      smtp: smtpInfo
    }));
});

gulp.task('email-multiple', function(done) {
  return gulp.src('./app/events/utsa-dc-invite.html')
    .pipe(email({
      subject: 'We are UTSA! - TESTING | UTSA DC VISIT ',
      to: [
        'john.garza@utsa.edu',
        'webteam@utsa.edu'
//        'utsawams.runme@previews.emailonacid.com'
      ],
      from: 'WebTeam <webteam@utsa.edu>',
      smtp: smtpInfo
    }));
});

gulp.task('serve', function(cb) {
  browserSync.init({
    server: {
      baseDir: './app',
      routes : {
        '/node_modules' : './node_modules'
      }
    },
    port: 3000,
    notify: true,
    open: false
  });

  gulp.watch(src.html).on('change', reload);

});

gulp.task('email', gulp.series('email-single', function(done) {
  done();
}));

gulp.task('emails', gulp.series('email-multiple', function(done) {
  done();
}));

gulp.task('default', gulp.series('serve', function(done) {
  done();
}));
