"use strict";

const shell = require('shelljs');
const chalk = require('chalk');

const REACT_DIR = `node_modules/@microsoft/mezzurite-angular/`;
const CORE_DIR = `node_modules/@microsoft/mezzurite-core/`;

shell.rm(`-rf`, `${REACT_DIR}`);
shell.rm(`-rf`, `${CORE_DIR}`);

shell.echo(`Start building Mezzurite.Core...`);
// shell.cd(`..`);
// shell.cd(`..`);
// shell.cd(`Mezzurite.Core`);
// shell.exec(`npm run build`);
shell.cp(`-R`, [`../../Mezzurite.Core/dist/`], `${CORE_DIR}`);
shell.echo(chalk.green(`Mezzurite.Core completed`));

shell.echo(`Start building Mezzurite.Angular...`);
// shell.cd(`..`);
// shell.cd(`Mezzurite.React`);
// shell.exec(`npm run build`);
shell.cp(`-R`, [`../../Mezzurite.Angular/dist/`], `${REACT_DIR}`);
shell.echo(chalk.green(`Mezzurite.Angular completed`));

shell.echo(chalk.green(`End building`));