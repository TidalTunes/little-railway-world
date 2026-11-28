// One small faceted vocabulary for the ledger, city yields and floating gains.
// Resources deliberately shows both a cut timber and a cool ore face.
const bodies={
  resources:'<g data-material="wood"><path fill="#98613c" d="m2 10 14-7 10 6v12l-14 8-10-6z"/><path fill="#d9a66d" d="m2 10 14-7 10 6-14 8z"/><path fill="#efc792" d="m2 10 10 7v12L2 23z"/><path fill="none" stroke="#a16b41" stroke-width="1.7" d="m5 16 4 3v5l-4-2z"/></g><g data-material="ore"><path fill="#8aabb2" d="m18 15 8-2 6 9-6 8-13-2z"/><path fill="#d0dfdc" d="m18 15 8-2-4 9-9 6z"/><path fill="#547980" d="m22 22 10 0-6 8-13-2z"/></g>',
  wood:'<path fill="#a97145" d="m4 11 12-7 12 7v12l-12 7L4 23z"/><path fill="#dcac75" d="m4 11 12 7 12-7-12-7z"/><path fill="#ba8755" d="m16 18 12-7v12l-12 7z"/><path fill="none" stroke="#f5d4a5" stroke-width="1.8" d="m9 8 12 7v12"/>',
  metal:'<path fill="#8caeb7" d="m6 8 15-3 9 14-10 10-17-4z"/><path fill="#c3d7d8" d="m6 8 15-3-4 14-14 6z"/><path fill="#597d88" d="m17 19 13 0-10 10-17-4z"/>',
  food:'<path fill="none" stroke="#f3cc70" stroke-width="2" stroke-linecap="round" d="M16 29V7"/><path fill="#f3cc70" d="M16 11C9 11 8 7 9 4c6 0 7 3 7 7Zm0 7c-7 0-10-4-8-7 5 0 8 3 8 7Zm0 7c-7 0-10-4-8-7 5 0 8 3 8 7Zm0-11c0-7 3-10 7-10 2 4-1 8-7 10Zm0 7c0-7 4-10 8-10 2 4-1 8-8 10Zm0 7c0-7 4-10 8-10 2 4-1 8-8 10Z"/>',
  gold:'<path fill="#c18c34" d="m11 2 12 2 7 10-3 12-11 5-12-7L2 12z"/><path fill="#f4cd67" d="m11 5 11 2 5 8-3 9-8 4-9-6-2-9z"/><path fill="none" stroke="#9c722e" stroke-width="2.6" stroke-linecap="round" d="M16 11v12"/>',
};

export function resourceIcon(name,{className=''}={}){
  return `<svg${className?` class="${className}"`:''} viewBox="0 0 32 32" fill="none" style="stroke:none" aria-hidden="true" focusable="false">${bodies[name]??bodies.resources}</svg>`;
}
