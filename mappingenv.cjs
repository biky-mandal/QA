const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const envList = ['local', 'staging', 'prod'];

envList.forEach(en => {
  const envPath = en !== 'local' ? `.${en}` : '';

  const envFile = `export const environment = {
    production: ${process.env.IS_PRODUCTION},
    firebase: {
        apiKey: ${process.env.API_KEY},
        authDomain: "qa-dev-01.firebaseapp.com",
        databaseURL: "https://qa-dev-01-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "qa-dev-01",
        storageBucket: "qa-dev-01.appspot.com",
        messagingSenderId: "200604287632",
        appId: "1:200604287632:web:5e7fc4dd47142dd6a30e15"
    }
  };
`;

  const targetPath = path.join(__dirname, `src/environments/environment${envPath}.ts`);
  fs.writeFile(targetPath, envFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(successColor, `${checkSign} Successfully generated ${en} environment file`);
    }
  });
});