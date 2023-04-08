export const pick = (object, keys, checkFalsyValue) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

export const convertObjKeyType = (object, key, type) => {
  const value = object?.[key];
  if ([null, undefined, NaN].includes(value)) {
    return;
  }

  switch (type) {
    case "number":
      object[key] = parseInt(value);
      break;
    default:
      object[key] = `${object[key]}`;
      break;
  }
};

export const getKeyMap = (arr, key) => {
  return (
    arr?.reduce?.((obj, item) => {
      const value = item?.[key];
      obj[value] = true;
      return obj;
    }, {}) || {}
  );
};
