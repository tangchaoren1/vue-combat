module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + '/src/main.js', //唯一的入口文件
    output: {
        path: __dirname + '/public', //打包后文件存放的地方
        filename: 'bundle.js' //打包后生成的文件名称
    },
    devServer: {
        contentBase: './public',
        historyApiFallback: true,
        inline: true,
        port: 3000
    }
}