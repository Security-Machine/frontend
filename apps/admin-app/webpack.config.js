const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');

// Nx plugins for webpack.
module.exports = composePlugins(
    withNx(),
    withReact({
        // Uncomment this line if you don't want to use SVGR
        // See: https://react-svgr.com/
        // svgr: false
    }),
    (config) => {
        console.log('Webpack config', config);
        // Update the webpack config as needed here.
        // e.g. `config.plugins.push(new MyPlugin())`
        for (const plugin of config.plugins) {
            // console.log('Plugin', plugin.constructor.name);
            // console.log('Plugin options', plugin.options);
            // if (plugin.constructor.name === 'HtmlWebpackPlugin') {
            //     plugin.options.title = 'Admin App';
            // }
        }
        return config;
    },
);
