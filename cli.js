#!/usr/bin/env node

/**
 * Module dependencies.
 */
const program = require('commander')
const chalk = require('chalk')
const fs = require('fs')
const { generateHeadersFile, getFilePath } = require('./libs/generator')

const loadAssetManifestJson = (path = './build', fileName = 'asset-manifest.json') => {
  try {
    const assetManifest = fs.readFileSync(getFilePath(path, fileName) , 'utf8')
    if (!assetManifest) return {}
    return JSON.parse(assetManifest)
  } catch (e) {
    if (e.code !== 'ENOENT') {
      throw e
    }
    return {}
  }
}
const loadHeaderJSON = (path = './public', fileName = '_headers') => {
  try {
    const file = fs.readFileSync(getFilePath(path, fileName), 'utf8')
    return file.split('\n') 
  } catch (e) {
    if (e.code !== 'ENOENT') {
      throw e
    }
    return ['/*']
  }
}


program
  .version('0.0.2', '-v, --version')
program
  .command('generate')
  .description('Generate _headers file with server push header.')
  .option('-m, --manifest-dir <manifestDir>', 'directory name of asset-manifest.json [Default: build/]')
  .option('-h, --headers-dir <headersDir>', 'directory name of _headers [Default: public/]')
  .option('-D, --distination <distination>', 'exported _headers file path [Default: build/]')
  .option('-d, --dry-run', 'dry-run(not generate _headers file)')
  .action(options => {
    const { manifestDir, headersDir, dryRun } = options
    const file = loadHeaderJSON(headersDir)
    const assetManifest = loadAssetManifestJson(manifestDir)
    if (Object.keys(assetManifest).length < 1) {
      console.log(chalk.red('asset-manifest.json is empty or not found.'))
      console.log(chalk.red('Process abort'))
      return
    }
    const newHeaders = generateHeadersFile(assetManifest, file)
    if (!dryRun) {
      console.log('Generating _headers file.')
      const dist = getFilePath(options.distination || 'build/', '_headers')
      fs.writeFileSync(dist, newHeaders)
      console.log(chalk.green('[SUCCESS]') + ' _headers file has been generated')
    } else {
      console.log(chalk.green('[DRY RUN]') + ' Generating _headers file.')
      console.log(chalk.green('[DRY RUN]') + ' _headers file has been generated')
    }
    console.log('\nGenerated files')
    console.log(chalk.green(newHeaders))
  }) 

program
  .parse(process.argv)

const NO_COMMAND_SPECIFIED = program.args.length === 0;
if (NO_COMMAND_SPECIFIED) {
  // e.g. display usage
  program.help();
}