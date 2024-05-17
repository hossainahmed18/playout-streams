import {
    createBrowserRouter,
  } from "react-router-dom";
import DrmDash from "./drm/dash-stream";
import DrmHls from "./drm/hls-stream";
import NonDrmHls from "./non-drm/hls-stream";

const routes = createBrowserRouter([
    {
      path: "/",
      element: <h1>Playing streams!</h1>,
    },
    {
        path: "/non-drm-hls",
        element: <NonDrmHls/>,
    },
    {
        path: "/drm-dash",
        element: <DrmDash/>,
    },{
        path: "/drm-hls",
        element: <DrmHls/>,
    }
]);

export default routes;