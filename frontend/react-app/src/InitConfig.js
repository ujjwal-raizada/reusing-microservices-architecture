import config from "react-global-configuration";

function InitConfig(production) {
  config.set({
    host_url: production
      ? ``
      : `http://localhost:8080`,
    routes: {
      // sample routes
      // user_login: `/user/login`,
    }
  });
}

export default InitConfig;
