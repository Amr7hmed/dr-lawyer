import Spinner from "./spinner";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/40 backdrop-blur-sm">
      <Spinner className="h-15 w-15" />
    </div>
  );
}
