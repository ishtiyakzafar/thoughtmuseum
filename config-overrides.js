const path = require("path");
const {
  addWebpackAlias,
  override,
  fixBabelImports,
  addLessLoader,
  useBabelRc,
} = require("customize-cra");

function ignoreCssOrder(config) {
  const cssRules = config.plugins.find((params) => {
    return (
      "options" in params &&
      "filename" in params["options"] &&
      params["options"]["filename"].startsWith("static/css") &&
      "chunkFilename" in params["options"] &&
      params["options"]["chunkFilename"].startsWith("static/css")
    );
  });

  cssRules && (cssRules.options.ignoreOrder = true);

  return config;
}

module.exports = override(
  ignoreCssOrder,
  useBabelRc(),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addWebpackAlias({
    ["Assests"]: path.resolve(__dirname, "src/Assets"),
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      //Theme
      "@primary-color": "#4771BB",
      "@body-background": "#ffffff",
      "@font-family": "Montserrat",
      "@code-family": "Montserrat",
      "@text-color": "#111111",
      "@heading-color": "#111111",
      "@font-size-base": "15px",
      // Button
      "@btn-font-weight": "600",
      "@btn-border-radius-base": "3px",
      "@btn-height-base": "45px",
      "@btn-height-lg": "50px",
      "@btn-height-sm": "35px",
      // Input
      "@input-height-base": "50px",
      "@input-height-lg": "54px",
      "@input-height-sm": "40px",
      "@input-border-color": "#dddddd",
      "@input-placeholder-color": "#777777",
      "@input-color": "#222222",

      "@select-border-color": "#dddddd",
      "@select-item-selected-font-weight": "500",
      "@select-dropdown-height": "34px",
      "@select-item-selected-bg": "#4771BB",
      "@select-item-selected-color": "#fff",
      "@select-border-color": "#dddddd",
      "@select-dropdown-font-size": "14px",

      "@table-header-bg": "#e74c3c",
      "@table-header-color": "#fff",
    },
  })
);
