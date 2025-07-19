import ky from 'ky';

const createApiClient = (baseUrl: string) => {
  return ky.create({
    prefixUrl: baseUrl,
    retry: {
      limit: 2,
      statusCodes: [401, 403, 500, 504],
    },
    hooks: {
      beforeRequest: [
        request => {
          const token = localStorage.getItem('token');
          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`);
          }
        },
      ],
      beforeError: [
        error => {
          const { response } = error;
          if (response && response.body) {
            if (response.status === 401 && window.location.pathname !== '/') {
              localStorage.clear();

              window.location.replace('/');
            }
          }

          return error;
        },
      ],
    },
  });
};

export default createApiClient;
