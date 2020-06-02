import ReactGA from "react-ga";

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

export default function reactGAinitialization() {
  ReactGA.initialize(process.env.REACT_APP_ANALYTICS_ID);
  logPageView();
}
