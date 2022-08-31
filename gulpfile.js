const gulp = require('gulp')
const nodemon = require('gulp-nodemon')

const startServer = (done) => {
    const stream = nodemon({
        script: 'server.js',
        env: { 'NODE_ENV': 'development' },
        done: done
    })

    stream
        .on('restart', () => console.log('restart'))
        .on('crash', () => {
            stream.emit('restart', 5)
        })
}

exports.default = startServer