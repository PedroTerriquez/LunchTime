module.exports = shipit => {
  require('shipit-deploy')(shipit)

  shipit.initConfig({
    default: {
      deployTo: '/var/apps/lunchtime',
      repositoryUrl: 'git@github.com:PedroTerriquez/LunchTime.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 3,
    },
    production: {
      key: './key.pem',
      servers: 'ubuntu@3.92.53.75',
      branch: 'master'
    },
  })

  shipit.on('updated', function() {
    shipit.start('npm:setup');
  })

  shipit.blTask('npm:setup', async () => {
    await shipit.remote(`chmod +x ${shipit.releasePath}/deployment.sh`);
    await shipit.remote(`${shipit.releasePath}/deployment.sh ${shipit.releasePath}`);
  });
}
