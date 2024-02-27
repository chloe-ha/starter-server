import App from '/app';
import AuthRoute from '/routes/auth.route';
import IndexRoute from '/routes/index.route';
import UsersRoute from '/routes/user.route';

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute()]);

app.listen();
