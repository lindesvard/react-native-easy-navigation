import { LoseObjectType } from '../types';

export const mergeDeep = (target: LoseObjectType, source?: LoseObjectType) => {
  const merged = { ...target };
  const isObject = (obj: any) => obj && typeof obj === 'object';

  if (!isObject(target) || !isObject(source) || !source) {
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
};

export const last = (list: any[]) => {
  if (!list || list.length === 0) {
    return {};
  }

  return list.slice(list.length - 1)[0];
};
