import dva from 'dva';

// Style sheets
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import './index.scss';


// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/login.js').default);

// 4. Router
app.router(require('./router.jsx').default);

// 5. Start
app.start('#root');
