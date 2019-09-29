function mergeDeep(target, source) {
  const merged = { ...target };
  const isObject = obj => obj && typeof obj === "object";

  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  Object.keys(source).forEach(key => {
    const targetValue = merged[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      merged[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      merged[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
    } else {
      merged[key] = sourceValue;
    }
  });

  return merged;
}

export default mergeDeep;
