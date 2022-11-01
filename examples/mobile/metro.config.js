// Learn more https://docs.expo.io/guides/customizing-metro
const {readdirSync} = require('fs');
const path = require('path');

const {getDefaultConfig} = require('metro-config');

/**
 * Dynamically resolve your shared packages names and path
 * @param workspaceRoot
 * @param sharedPackagesFolder
 * @returns {{packagePath: string, packageName: *}[]}
 */
function findSharedPackages(workspaceRoot, sharedPackagesFolder) {
  const sharedPackageRoot = path.resolve(workspaceRoot, sharedPackagesFolder);

  return readdirSync(sharedPackageRoot, {
    withFileTypes: true,
  })
    .filter(dir => dir.isDirectory() && !dir.name.startsWith('.'))
    .map(dir => dir.name)
    .map(packageFolder => {
      const packagePath = path.resolve(sharedPackageRoot, packageFolder);

      const packageName = require(`${packagePath}/package.json`).name;

      return {packageName, packagePath};
    });
}

const workspaceRoot = path.resolve(__dirname, '../..');
const projectRoot = __dirname;
const sharedPackagesFolder = 'packages';
// const sharedPackages = findSharedPackages(workspaceRoot, sharedPackagesFolder);
const sharedPackages = findSharedPackages(
  workspaceRoot,
  sharedPackagesFolder,
).filter(p => p.packageName !== '@dolbyio/comms-uikit-react');

const extraNodeModules = sharedPackages.reduce(
  (prev, {packageName, packagePath}) => ({...prev, [packageName]: packagePath}),
  {},
);

// console.log(sharedPackages);
//
// const extraNodeModules = {};
//
// sharedPackages.forEach(a => {
//   extraNodeModules[a.packageName] = a.packagePath;
// });
//

const config = {
  resolver: {},
};

// Remove shared packages node_modules to prevent conflict collision with expo app node_modules
// Example : I need react-native in my shared package and my expo app. Without removing myPackage/node_modules, expo app can't boot on ios/android
config.resolver.blockList = [
  ...sharedPackages.map(
    ({packagePath}) =>
      new RegExp(`^${escape(path.resolve(packagePath, 'node_modules'))}\\/.*$`),
  ),
];

// Copy all my shared packages (referenced in my expo app package.json dependencies) to my expo app node_modules
// Redirects dependencies referenced in extraNodeModules to local node_modules, if matched.
config.resolver.extraNodeModules = new Proxy(extraNodeModules, {
  get: (target, name) =>
    name in target
      ? target[name]
      : path.join(process.cwd(), `node_modules/${name}`),
});

// 1. Watch all files within the monorepo
config.watchFolders = [
  `${workspaceRoot}/examples/mobile`,
  `${workspaceRoot}/packages/common`,
  `${workspaceRoot}/packages/mobile`,
];
// 2. Let Metro know where to resolve packages, and in what order
config.resolver.nodeModulesPath = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();
  return {
    ...config,
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      ...config.resolver,
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
