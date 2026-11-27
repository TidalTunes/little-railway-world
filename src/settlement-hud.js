// A DOM-only HUD: the game owns input, placement, and inventory. Import
// settlement-hud.css once in the app entry point, then call update with state.
const icon = (body, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${body}</svg>`;
const icons = {
  logs: icon('<path d="m6 8 10-4c2.3-.8 4.5 1.3 4.5 4.1 0 2-1 3.3-2.5 4L8 16"/><ellipse cx="6" cy="12" rx="3.5" ry="4.5"/><path d="M6 10v4M12 15l5-2c1.7-.7 3.5 1 3.5 3s-.8 3.2-2.2 3.7l-9 1.3"/><ellipse cx="9" cy="18" rx="2.5" ry="3"/>'),
  house: icon('<path d="m3 11 9-8 9 8M5.5 9v11h13V9M10 20v-6h4v6"/>'),
  axe: icon('<path d="m7 21 8-18M13.5 6 6 4 3 10l8 2M17 5l3 1-2.5 6-3-1"/>'),
  view: icon('<path d="m3 7 6-3 6 3 6-3v13l-6 3-6-3-6 3ZM9 4v13M15 7v13"/>'),
  person: icon('<circle cx="12" cy="5" r="2"/><path d="M8 21v-6l-2-3 3-3h6l3 3-2 3v6M9 9v6h6V9M12 15v6"/>'),
  link: icon('<path d="m10 14 4-4M8 16l-1 1a3.5 3.5 0 0 1-5-5l4-4a3.5 3.5 0 0 1 5 0M16 8l1-1a3.5 3.5 0 0 1 5 5l-4 4a3.5 3.5 0 0 1-5 0"/>'),
  outpost: icon('<path d="M6 21V3l12 2-2 4 2 4-12-2M3 21h6"/>'),
  check: icon('<path d="m5 12 4 4L19 6"/>'),
  blocked: icon('<circle cx="12" cy="12" r="8"/><path d="m6 6 12 12"/>'),
  rotate: icon('<path d="M5 9a7.5 7.5 0 1 1 .5 7M5 4v5h5"/>'),
  close: icon('<path d="m6 6 12 12M18 6 6 18"/>'),
};

const reasons = {
  logs: 'You need 10 logs to build a house.',
  'not-enough-logs': 'You need 10 logs to build a house.',
  insufficientLogs: 'You need 10 logs to build a house.',
  water: 'Find dry ground for your house.',
  slope: 'This ground is too steep.',
  blocked: 'Move the blueprint clear of nearby objects.',
  occupied: 'Move the blueprint clear of nearby objects.',
  trees: 'Chop the trees here or choose a clearing.',
  distance: 'Move closer to the blueprint.',
  loading: 'Preparing this part of the island…',
};

const text = (element, value) => {
  if (element.textContent !== value) element.textContent = value;
};

/**
 * Callbacks: onTool('axe'|'house'), onView(), onRotate(-1|1), onBuild(), onCancel().
 * State: logs, houses, connectedHouses, tool, walking, ready, canBuild, connected,
 * reason (readable text or a known code), targetTree (truthy), message, visible.
 * Only semantic changes update the live region; per-frame placement stays quiet.
 */
export function createSettlementHud({
  parent = document.body,
  playerColor = '#37a98d',
  onTool = () => {},
  onView = () => {},
  onRotate = () => {},
  onBuild = () => {},
  onCancel = () => {},
} = {}) {
  const root = document.createElement('aside');
  root.className = 'settlement-hud';
  root.setAttribute('aria-label', 'Settlement controls');
  root.style.setProperty('--settlement-owner', playerColor);
  root.innerHTML = `
    <div class="settlement-inventory" role="group" aria-label="Your resources">
      <span class="settlement-owner" role="img" title="Your settlement" aria-label="Your settlement"></span>
      <span class="settlement-resource">${icons.logs}<strong data-hud="logs">0</strong><span>logs</span></span>
      <span class="settlement-resource settlement-homes">${icons.house}<strong data-hud="houses">1</strong><span data-hud="house-label">house</span></span>
      <span class="settlement-connected-count" data-hud="connected-count" hidden></span>
    </div>
    <div class="settlement-dock">
      <div class="settlement-context" data-hud="context">
        <div class="settlement-placement" data-hud="placement" hidden>
          <span class="settlement-placement-symbol" data-hud="placement-symbol">${icons.link}</span>
          <span data-hud="placement-label">Joins your settlement</span>
        </div>
        <p class="settlement-hint" data-hud="hint">Walk up to a tree, then press E or click to chop.</p>
        <p class="settlement-controls" data-hud="controls">WASD move <span>·</span> Shift run <span>·</span> Space jump</p>
      </div>
      <div class="settlement-actions" role="group" aria-label="Tools and camera">
        <button type="button" class="settlement-tool" data-action="axe" aria-pressed="true" aria-keyshortcuts="E">
          ${icons.axe}<span class="settlement-tool-copy"><span>Axe</span><small>E / click</small></span>
        </button>
        <button type="button" class="settlement-tool" data-action="house" aria-pressed="false" aria-keyshortcuts="B">
          ${icons.house}<span class="settlement-tool-copy"><span>House <kbd>B</kbd></span><small>10 logs</small></span>
        </button>
        <button type="button" class="settlement-tool settlement-view" data-action="view" aria-keyshortcuts="V">
          <span data-hud="view-icon">${icons.view}</span><span class="settlement-tool-copy"><span data-hud="view-label">Overview</span><small>V</small></span>
        </button>
      </div>
      <div class="settlement-build-actions" data-hud="build-actions" role="group" aria-label="House placement" hidden>
        <button type="button" data-action="rotate-left" aria-label="Rotate house left (Q)" aria-keyshortcuts="Q">${icons.rotate}<kbd>Q</kbd></button>
        <button type="button" data-action="rotate-right" class="settlement-rotate-right" aria-label="Rotate house right (R)" aria-keyshortcuts="R">${icons.rotate}<kbd>R</kbd></button>
        <button type="button" data-action="build" class="settlement-build" aria-keyshortcuts="Enter">${icons.check}<span>Build</span><kbd>Enter</kbd></button>
        <button type="button" data-action="cancel" aria-label="Cancel house placement (Escape)" aria-keyshortcuts="Escape">${icons.close}<kbd>Esc</kbd></button>
      </div>
    </div>
    <div class="settlement-sr-only" data-hud="announcements" role="status" aria-live="polite" aria-atomic="true"></div>`;
  parent.append(root);
  const nodes = Object.fromEntries([...root.querySelectorAll('[data-hud]')].map(node => [node.dataset.hud, node]));
  const buttons = Object.fromEntries([...root.querySelectorAll('[data-action]')].map(node => [node.dataset.action, node]));
  let current = {};
  let announced = '';
  let rendered = '';
  const handlers = {
    axe: () => onTool('axe'), house: () => onTool('house'), view: onView,
    'rotate-left': () => onRotate(-1), 'rotate-right': () => onRotate(1),
    build: onBuild, cancel: onCancel,
  };
  function activate(event) {
    const button = event.target.closest('button[data-action]');
    if (button && !button.disabled) handlers[button.dataset.action]?.();
    event.stopPropagation();
  }
  const stop = event => event.stopPropagation();
  root.addEventListener('click', activate);
  // A focused button keeps native Enter/Space activation. Its event must not also
  // jump, chop, build, or orbit through the game's document-level controls.
  for (const name of ['pointerdown', 'pointerup', 'dblclick', 'keydown', 'keyup', 'wheel']) root.addEventListener(name, stop);

  function update(next = {}) {
    current = { ...current, ...next };
    const { logs = 0, houses = 1, connectedHouses = houses, tool = 'axe', walking = true,
      ready = true, canBuild = false, connected = true, reason = '', targetTree = false,
      message = '', visible = true } = current;
    const signature = JSON.stringify([logs, houses, connectedHouses, tool, walking, ready,
      Boolean(canBuild), Boolean(connected), reason, Boolean(targetTree), message, visible]);
    if (signature === rendered) return;
    rendered = signature;
    const building = tool === 'house';
    root.hidden = !visible;
    root.dataset.tool = tool;
    root.dataset.valid = String(Boolean(canBuild));
    text(nodes.logs, String(logs));
    text(nodes.houses, String(houses));
    text(nodes['house-label'], houses === 1 ? 'house' : 'houses');
    nodes['connected-count'].hidden = connectedHouses === houses;
    text(nodes['connected-count'], `${connectedHouses} connected`);
    nodes.placement.hidden = !building;
    nodes['build-actions'].hidden = !building;
    const placementKind = connected ? 'link' : 'outpost';
    if (nodes['placement-symbol'].dataset.kind !== placementKind) {
      nodes['placement-symbol'].innerHTML = icons[placementKind];
      nodes['placement-symbol'].dataset.kind = placementKind;
    }
    text(nodes['placement-label'], connected ? 'Joins your settlement' : 'Starts a new outpost');
    nodes.placement.dataset.connected = String(Boolean(connected));
    let hint;
    if (!ready) hint = 'Preparing your clearing…';
    else if (message) hint = message;
    else if (building && canBuild) hint = 'Clear ground. Click or press Enter to build.';
    else if (building) hint = reasons[reason] || reason || (logs < 10 ? 'You need 10 logs to build a house.' : 'Choose a clear, level patch of ground.');
    else if (!walking) hint = 'Your traveller is here. Press V to return and gather wood.';
    else if (targetTree) hint = 'Tree in reach. Press E or click to chop.';
    else hint = 'Walk up to a tree, then press E or click to chop.';
    text(nodes.hint, hint);
    text(nodes.controls, building ? 'Q / R rotate · Esc cancel' : walking ? 'WASD move · Shift run · Space jump' : 'Scroll to zoom · Drag to look around');
    nodes.context.dataset.blocked = String(building && !canBuild && ready && !message);
    buttons.axe.setAttribute('aria-pressed', String(!building));
    buttons.house.setAttribute('aria-pressed', String(building));
    for (const key of ['axe', 'house', 'view', 'rotate-left', 'rotate-right']) buttons[key].disabled = !ready;
    buttons.build.disabled = !ready || !canBuild;
    buttons.cancel.disabled = !ready;
    const viewKind = walking ? 'view' : 'person';
    if (nodes['view-icon'].dataset.kind !== viewKind) {
      nodes['view-icon'].innerHTML = icons[viewKind];
      nodes['view-icon'].dataset.kind = viewKind;
    }
    text(nodes['view-label'], walking ? 'Overview' : 'Walk');
    buttons.view.setAttribute('aria-label', walking ? 'Switch to overview (V)' : 'Return to your traveller (V)');
    // Continuous aim can cross obstacles several times a second. Announce only
    // inventory/tool/view and explicit game messages, never each aim sample.
    const announcement = [ready ? `${logs} logs. ${houses} ${houses === 1 ? 'house' : 'houses'}.` : 'Preparing your clearing.',
      building ? 'House blueprint selected.' : 'Axe selected.', walking ? '' : 'Overview.', message].filter(Boolean).join(' ');
    if (announcement !== announced) {
      text(nodes.announcements, announcement);
      announced = announcement;
    }
  }
  update();
  return {
    root,
    update,
    dispose() {
      root.removeEventListener('click', activate);
      for (const name of ['pointerdown', 'pointerup', 'dblclick', 'keydown', 'keyup', 'wheel']) root.removeEventListener(name, stop);
      root.remove();
    },
  };
}
