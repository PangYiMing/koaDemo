module.exports = {
    presets: [
        [
            '@babel/env',
            {
                targets: ['last 2 versions', 'ie >= 9'],
                useBuiltIns: 'usage',
                corejs: 3,
            },
        ],
        ['@babel/preset-react'],
    ],
    plugins: ['@babel/plugin-transform-runtime', { corejs: 3 }],

    env: {
        test: {
            plugins: ['require-context-hook'],
        },
    },
    plugins: [
        [
            'import',
            {
                libraryName: 'antd',
                style: 'css', // or 'css'
            },
        ],
    ],
};
