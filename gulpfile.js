const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");

gulp.task("server", function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("./*.html").on("change", browserSync.reload);
});

gulp.task("styles", function() {
  return gulp
    .src("./sass/**/*.+(scss|sass)") // **/ two asterisks means that the Gulp will monitor all folders and files in the main sass folder.
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function() {
  gulp.watch("./sass/**/*.+(scss|sass)", gulp.parallel("styles")); // **/ two asterisks means that the Gulp will monitor all folders and files in the main sass folder.
});

gulp.task("default", gulp.parallel("watch", "server", "styles"));
