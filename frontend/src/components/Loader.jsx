const Loader = () => {
  return (
    <div className="flex h-96 items-center justify-center">
      <div className="relative h-24 w-24">
        <div className="absolute h-full w-full rounded-full border-4 border-gray-100"></div>
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    </div>
  );
};

export default Loader;
