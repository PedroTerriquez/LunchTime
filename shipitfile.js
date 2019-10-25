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
    await shipit.remote(`cd ${shipit.releasePath} && npm install`);
    await shipit.remote(`cd ${shipit.releasePath} && npm run build`);
    //USING SUDO BECAUSE WE ARE USING PORT 80
    await shipit.remote(`cd ${shipit.releasePath} && sudo su && source /var/apps/lunchtime/.env && npm run server`);
  });
}
