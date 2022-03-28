import _ from 'lodash';
import JSEncrypt from 'jsencrypt';
import Moment from 'moment';
import FingerPrint2 from 'fingerprintjs2';

export function px2Rem(px) {
  return px / 100;
}

export function px2RemStr(px) {
  return `${px2Rem(px)}rem`;
}

export function timestampToTime(timestamp) {
  return Moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
}

export function getToken() {
  return '';
}

export function hasString(value) {
  return _.isString(value) && !_.isEmpty(value);
}

export function mergeObject(...args) {
  return _.mergeWith(...args, customizerFn);
}

export function hasPlainObject(value) {
  return _.isPlainObject(value) && !_.isEmpty(value);
}

export function customizerFn(objValue, srcValue, key, object, source, stack) {
  if (_.isArray(srcValue) || _.isArrayBuffer(srcValue) || _.isArrayLikeObject(srcValue)) {
    return srcValue;
  }

  if (_.isPlainObject(srcValue) && _.isEmpty(srcValue)) {
    return srcValue;
  }
}

export function hasValue(value) {
  return !_.isNil(value);
}

export function hasArray(value) {
  return _.isArray(value) && !_.isEmpty(value);
}

export function flattenObject(obj, depth, prefix = '') {
  const limit = _.isInteger(depth);
  return _.reduce(
    _.keys(obj),
    (acc, k) => {
      const pre = prefix.length ? prefix + '.' : '';
      if ((limit ? depth > 1 : true) && hasPlainObject(obj[k])) {
        _.assign(acc, flattenObject(obj[k], limit ? depth - 1 : depth, pre + k));
      } else {
        acc[pre + k] = obj[k];
      }
      return acc;
    },
    {}
  );
}

export function rsaEncrypt(message, publicKey = '') {
  const crypt = new JSEncrypt();
  crypt.setPublicKey(publicKey);
  return crypt.encrypt(message);
}

export function getFingerPrint(options = {}) {
  // https://github.com/Valve/fingerprintjs2
  return FingerPrint2.getPromise(options).then(components => {
    return FingerPrint2.x64hash128(_.map(components, pair => pair.value).join(), 31);
  });
}

export function asyncCall(fn, timeout = 0) {
  return (...args) =>
    new Promise((resolve, reject) =>
      window.setTimeout(() => {
        try {
          resolve(fn(...args));
        } catch (error) {
          reject(error);
        }
      }, timeout)
    );
}
