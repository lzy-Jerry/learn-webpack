const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './build'),
        publicPath: 'build/',
        // assetModuleFilename: 'img/[name].[hash:6][ext]' // 全局资源存放文件夹不建议这么使用
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    }, // 简写
                    'postcss-loader'
                ]
            }, 
            {
                test: /\.less$/,
                use: [
                    'style-loader', // less-loader只是将 less转换成css 还需要将css转换成js 之后再插入到html中
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|svg|gif|webp|jfif)$/,
                type: 'asset', // asset/resource  asset/inline'
                generator: {
                    filename: 'img/[name].[hash:6][ext]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024
                    }
                }
            },
            {
                test: /\.txt$/,
                type: 'asset/source'
            },
            {
                test: /\.(ttf|eot|woff2?)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'font/[name].[hash:6][ext]'
                }
            }
        ]
    }
}