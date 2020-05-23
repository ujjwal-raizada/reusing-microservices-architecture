import config from "react-global-configuration";

function InitConfig(production) {
  config.set({
    host_url: production
      ? ``
      : `http://localhost:8080`,
    routes: {
      allTransformations: `/mapping/transformations/all`,
      allTemplates: `/mapping/templates/all`,
      mapping: `/mapping/get`,
      updateMapping: `/mapping/update`,
      microservice: `/existing/info`,
      existingById: `/existing/one`,
      allExisting: `/existing/all`,
      addExisting: `/existing/add`,
      requestedById: `/requested/one`,
      allRequested: `/requested/all`,
      addRequested: `/requested/add`,
      registerUser:`/signup`,
      loginUser:'/login'
    }
  });
}

export default InitConfig;
