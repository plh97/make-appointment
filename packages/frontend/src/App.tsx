import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { InvesterPage } from "./views/InvesterPage";

export const App = (): React.ReactNode => {
  const router = createBrowserRouter([
    // Invester
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/invester",
      element: <InvesterPage />,
    },
  ]);
  // const browserRouter = withFaroRouterInstrumentation(reactBrowserRouter);
  return <RouterProvider router={router} />;
};
