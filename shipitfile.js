module.exports = shipit => {
  require('shipit-deploy')(shipit)

  shipit.initConfig({
    default: {
      deployTo: '/var/apps/lunchtime',
      repositoryUrl: 'https://github.com/pedroterriquez/LunchTime.git',
      ignores: ['.git', 'node_modules'],
    },
    production: {
      key: '~pedroterriquez/Documents/key_pem.txt',
      servers: 'ubuntu@3.92.53.75',
    },
  })

  shipit.on('updated', function() {
    shipit.start('npm:setup');
  })

  shipit.blTask('npm:setup', async () => {
    await shipit.remote(`cd ${shipit.releasePath} && npm install --production 2> /dev/null`);
    await shipit.remote(`cd ${shipit.releasePath} && npm run build`);
    await shipit.remote(`cd ${shipit.releasePath} && npm run server`);
  });
}
