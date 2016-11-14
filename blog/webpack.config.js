var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var isProduction = process.env.NODE_ENV == "production" ;
module.exports = {
	entry:{
		bundle:"./index.jsx"
	},
	output:{
		path: path.resolve(__dirname,'./public'),
		filename: "js/[name].js",
		publicPath: '/',
		vendor:['react','react-dom']
	},
	devtool: 'source-map',
	module: {
	    loaders: [
	      {
	        test: /\.js[x]?$/,
	        loader: 'babel',
	        query:{
	        	 presets: ['es2015','react','stage-0']
	        },
	        include:  path.resolve(__dirname),
	        exclude: /node_modules/
	      },
	      {
	      	test: /\.css$/,
	      	loader: ExtractTextPlugin.extract("style-loader","css-loader"),
	      	include: path.resolve(__dirname,'./style'),
	      	exclude: /node_modules/
	      },
	      {
	      	test: /\.less$/,
        	loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader"),
	      	include: path.resolve(__dirname,'./style'),
	      	exclude: /node_modules/
	      },
	      {
	        test: /\.json$/,
	        loader: 'json'
	      },
	      {
	        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
	        loader: 'url',
	        query: {
	          limit: 10000,
	          name: 'images/[name].[ext]'
	        }
	      },
	      {
	        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url',
	        query: {
	          limit: 10000,
	          name: 'fonts/[name].[ext]'
	        }
	      }
	    ]
	  },
	devServer:{
		proxy:{
			//'/api/*':{
			//	target:"http://localhost:8888",
			//	changeOrigin: true
			//},
			'/index.php/*':{
				target:"http://www.kanglin.me",
				changeOrigin: true
			}
		}
	},
	  plugins:[
	  	new HtmlWebpackPlugin({
	  		title:"My App",
	  		template:"../index.html"
	  	}),
	  	new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
	  	new ExtractTextPlugin("css/style.css"),
		new webpack.DefinePlugin({
			"__ENV__": isProduction ? `"production"` : `"development"`
		  })
	  ],
	  externals:{
	  	"data": "window.ss"
	  }
}
