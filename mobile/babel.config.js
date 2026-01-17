module.exports = {
  presets: [
    ["babel-preset-expo", { jsxImportSource: "nativewind" }],
    "nativewind/babel",
  ],
  plugins: [
    ["react-native-reanimated/plugin"],
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: "./.env",
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
