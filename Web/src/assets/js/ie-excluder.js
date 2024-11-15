function cssPropertyValueSupported(prop, value) {
  const d = document.createElement('div');
  d.style[prop] = value;
  return d.style[prop] === value;
}

const div = document.createElement('div');
if (!String.prototype.includes || (!window.navigator.msSaveOrOpenBlob && !window.URL.createObjectURL) || div.style.grid === null || div.style.grid === undefined || div.style.flex === null || div.style.flex === undefined || !cssPropertyValueSupported('display', 'contents') || !Object.assign || !Array.from) {
  window.location.href = window.location.protocol + '//' + window.location.host + window.location.pathname.substring(0, window.location.pathname.indexOf('app/') + 4) + 'browser-unssuported.html';
}
