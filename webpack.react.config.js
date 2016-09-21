var path = require("path");
var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:{
        build: path.resolve(__dirname, 'react/index.jsx')
      // build:"./react/index.jsx"
	},
    output:{
		path: path.resolve(__dirname, "./react_build/"),
		filename: "[name].js"
	},
    devtool: 'source-map', //源码映射工具
    module:{
        loaders:[{
            test: /(\.css|\.less)$/,
            loaders: ["style", "css?sourceMap", "less?sourceMap"]
        },{
            test:/jsx?$/,
            loaders:['babel?presets[]=es2015&presets[]=react'],
           // exclude: /node_modules/,
            include:path.resolve(__dirname,"react") //指定文件夹
        },{
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'url?limit=10000&name=img/[hash:8].[name].[ext]', // 图片小于8k就转化为 base64, 或者单独作为文件
                'image-webpack' // 图片压缩
            ]
        },{
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]', // 生成 md5 hash 格式的文件名
                'image-webpack' // 图片压缩
            ]
        }]
    },
    resolve:{
		extensions:['','.js',".css",'jsx'],  //自动补全识别后缀
         modulesDirectories: ['node_modules']
	},
	plugins:[
		new htmlWebpackPlugin({
			title:"欢迎",
			chunks:["build"]
		})
	]
}
