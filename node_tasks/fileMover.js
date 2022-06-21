/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const chalk = require('chalk');
const {
    build_root,
    build_index_filename,
    index_file_dest,
    index_filename,
    resources_dest
} = require('./taskConfig');
const folderMaker = require('./colorfulConsole/folderMaker');
const fileCopier = require('./colorfulConsole/fileCopier');
const filesCopier = require('./colorfulConsole/filesCopier');
const fileRemover = require('./colorfulConsole/fileRemover');

const checkFolders = () => {
    console.log(chalk.bold('🗃 Checking folders:'));

    folderMaker(index_file_dest);
    folderMaker(resources_dest);

    console.log('\n');
};

const copyFiles = () => {
    console.log(chalk.bold('📝 Copying:'));

    fileCopier(
        path.join(build_root, build_index_filename),
        path.join(index_file_dest, index_filename)
    );
    filesCopier(build_root, resources_dest);

    console.log('\n');
};

const deleteFiles = () => {
    console.log(chalk.bold('🗑 Deleting:'));

    const file = path.join(resources_dest, build_index_filename);
    fileRemover(file);

    console.log('\n');
};

(() => {
    checkFolders();
    copyFiles();
    deleteFiles();

    console.log(
        chalk.green('✅ File mover has been finished successfully.')
    );
})();
