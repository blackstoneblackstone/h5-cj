var gulp = require('gulp'),
    connect = require('gulp-connect-php'),
    spritesmith = require('gulp.spritesmith'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('default', function () {
    connect.server();
});

// 雪碧图合并
gulp.task(
    'spritesmith',
    function () {
        return gulp.src('sprite/*.png').pipe(
            spritesmith({
                imgName: 'sprite.png',//保存合并后图片的地址
                padding: 5,
                cssName: 'css/index.css'
            }))
            .pipe(gulp.dest('sprite/'));
    });

gulp.task("min",function(){
    // 把1.js和2.js合并压缩为main.js，输出到dest/js目录下
    gulp.src(['js/C*.js']).pipe(concat('index.js')).pipe(uglify()).pipe(gulp.dest('js/'));
})