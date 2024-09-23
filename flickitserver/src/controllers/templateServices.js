const { exec } = require('child_process');
async function getPortfolio(){
const link = 'https://norhan.netlify.app/';
const command = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
const fullCommand = `${command} ${link}`;
exec(fullCommand, (error, stdout, stderr) => {
    if (error) {
       console.error('Error opening link:', error);
        return;
    }
    if (stderr) {
        console.error('Error opening link:', stderr);
        return;
    }
        console.log('Opened link in default browser:', link);
    });
}
module.exports={
    getPortfolio
}