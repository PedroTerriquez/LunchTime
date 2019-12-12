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
    await shipit.remote(`ln -nfs ${shipit.releasePath} /var/apps/lunchtime/current`);
    await shipit.remote(`cp /var/apps/lunchtime/.env ${shipit.releasePath}/.env`);
    await shipit.remote(`cp /var/apps/lunchtime/.env ${shipit.releasePath}/.env`);
    await shipit.remote(`cd ${shipit.releasePath} && npm install`);
    await shipit.remote(`cd ${shipit.releasePath} && npm run build`);
    await shipit.remote(`cd ${shipit.releasePath} && pm2 restart app.js`);
    //USING SUDO BECAUSE WE ARE USING PORT 80
    //await shipit.remote(`cd ${shipit.releasePath} && sudo npm run server &`);
  });
}
