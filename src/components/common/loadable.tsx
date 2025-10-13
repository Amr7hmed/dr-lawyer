import { type ElementType, Suspense } from "react";
import Loader from "./loader";

// project-imports

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable =
  (Component: ElementType) => (props: Record<string, unknown>) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
