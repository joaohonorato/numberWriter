const app = require('./app/app');
const config = require('./app/config');

app.configure(config).run()