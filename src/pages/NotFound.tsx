const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mt-4">Page not found</p>
        <a
          href="/"
          className="mt-6 inline-block text-blue-600 hover:text-blue-500"
        >
          Go back home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
