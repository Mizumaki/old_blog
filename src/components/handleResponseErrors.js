const handleResponseErrors = (res) => {
  if (res.ok) {
    return res;
  }

  switch (res.status) {
    case 400:
      throw Error('INVALID_TOKEN');
    case 401:
      throw Error('UNAUTHORIZED');
    case 500:
      throw Error('INTERNAL_SERVER_ERROR');
    case 502:
      throw Error('BAD_GATEWAY');
    case 404:
      throw Error('NOT_FOUND');
    default:
      throw Error('UNHANDLED_ERROR');
  }
};

export default handleResponseErrors;