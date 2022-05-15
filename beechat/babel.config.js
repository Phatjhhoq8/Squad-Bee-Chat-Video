const configVars = require('./configTransform');

module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        ['transform-define', configVars]
    ],
};