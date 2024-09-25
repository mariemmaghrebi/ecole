// import app.js
const app = require('./backend/app')
// listen tp http.localhost:3000
app.listen(3000, () => {
    console.log('Express server is running on port 3000');
});