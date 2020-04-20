module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                // "amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false, defaults to "auto".
                // Setting this to false will not transform modules.
                // Also note that cjs is just an alias for commonjs.
                modules: 'commonjs',
                targets: {
                    // Please note: when specifying the esmodules target, browsers targets will be ignored.
                    // esmodules:true,
                    ie: '8',
                },
            },
        ],
    ],
    plugins: [
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: {
                    version: 3,
                    proposals: true,
                },
                useESModules: false,
            },
        ],
    ],
};
