export const isValueDefined = (instance) => { // eslint-disable-line
  try {
    if (!instance) {
      return null;
    }
    return instance;
  } catch (e) {
    return null;
  }
};
export const SimpleApiStoreStates = (state, objectName, properties) => {
  // strictly to be used only for simple api state
  /**
   * ex :
   * defaultState = {
   *   someProp : {
   *     loading:false;
   *     data: null | [] | 0
   *     error: null
   *   }
   *  }
   */
  const tempObject = {
    ...state[objectName],
  };
  Object.keys(tempObject).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(properties, key)) {
      tempObject[key] = properties[key];
    }
  });
  return {
    ...state,
    [objectName]: tempObject,
  };
};
