const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const minify = require("gulp-minify");

gulp.task("imagemin", () => {
  gulp
    .src("src/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"));
});

gulp.task("prefix", () =>
  gulp
    .src("src/css/*.css")
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest("dist/css"))
);

gulp.task("minify-css", () => {
  return gulp
    .src("dist/css/*.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("minify-html", function() {
  return gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));
});

gulp.task("minify-js", function() {
  gulp
    .src(["src/js/*.js"])
    .pipe(minify())
    .pipe(gulp.dest("dist/js"));
});

gulp.task("default", [
  "imagemin",
  "prefix",
  "minify-html",
  "minify-css",
  "minify-js"
]);

gulp.task("watch", function() {
  gulp.watch("src/img/*", ["imagemin"]);
  gulp.watch("src/css/*.css", ["prefix"]);
  gulp.watch("src/*.html", ["minify-html"]);
  gulp.watch("src/css/*.css", ["minify-css"]);
  gulp.watch("src/js/*.js", ["minify-js"]);
});
