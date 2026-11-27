// The island stays the interface: all visible controls are small, faceted objects.
// Descriptions and exact inventory values remain available to assistive technology.
const icon = body => `<svg viewBox="0 0 32 32" fill="none" aria-hidden="true">${body}</svg>`;
const icons = {
  logs: icon('<path fill="#775333" d="m3 17 16-9 10 6v10l-16 7-10-5z"/><path fill="#b7854b" d="m3 17 16-9 10 6-16 8z"/><path fill="#e9c891" d="m3 17 10 5v9L3 26z"/><path stroke="#87603b" stroke-width="1.4" d="m6 21 4 2v4l-4-2z"/>'),
  house: icon('<path fill="#f4ead0" d="M6 13h20v15H6z"/><path fill="#bbccbb" d="M21 12h5v16h-5z"/><path class="settlement-owner-fill" d="m3 14 13-11 13 11z"/><path fill="#004e43" d="M13 20h6v8h-6z"/><path fill="#729b8e" d="M8 17h4v4H8zM21 17h3v4h-3z"/>'),
  axe: icon('<path fill="#855831" d="m8 28 3 1L24 5l-3-2z"/><path fill="#dce5d1" d="m20 5-11-2-6 9 13 6z"/><path fill="#9db6b1" d="m16 18 4-13-5 8-12-1z"/><path fill="#f0d6a7" d="m9 25 3 2-1 2-3-1z"/>'),
  view: icon('<path fill="#00594b" d="m2 15 14-9 14 9v6l-14 9-14-9z"/><path fill="#7da868" d="m2 15 14-9 14 9-14 9z"/><path fill="#a8c187" d="m2 15 14-9v18z"/><path fill="#dcceb0" d="m8 11 3-2 10 12-3 2z"/><path fill="#e7eee0" d="m14 12 4-3 4 3v5l-4 3-4-3z"/><path class="settlement-owner-fill" d="m12 12 6-5 6 5-6 3z"/>'),
  person: icon('<path fill="#ddbc8b" d="M12 7h8v8h-8z"/><path fill="#cd665a" d="m10 6 4-3h8v5H10z"/><path class="settlement-owner-fill" d="M9 14h14v11H9z"/><path fill="#dfc8a1" d="M7 15h3v10H7zM22 15h3v10h-3z"/><path fill="#183f38" d="M11 25h4v6h-4zM17 25h4v6h-4z"/>'),
  link: icon('<path stroke="#e8d6ac" stroke-width="3" d="M7 22v4h18v-4"/><path fill="#dfe4ca" d="M2 13h10v10H2zM20 13h10v10H20z"/><path class="settlement-owner-fill" d="m0 14 7-7 7 7zM18 14l7-7 7 7z"/><path fill="#14584a" d="M6 19h3v4H6zM24 19h3v4h-3z"/>'),
  outpost: icon('<path fill="#e6d3ad" d="M7 3h3v25H7z"/><path fill="#f2cb79" d="m10 4 17 3-5 6 5 6-17-3z"/><path fill="#a8b38f" d="m3 28 6-5 6 5z"/>'),
  check: icon('<path fill="currentColor" d="m3 17 5-5 7 7L26 5l5 4-16 20z"/>'),
  blocked: icon('<path stroke="currentColor" stroke-width="3" d="m10 3 12 0 7 7v12l-7 7H10l-7-7V10zM8 8l16 16"/>'),
  tree: icon('<path fill="#986b44" d="M14 20h4v10h-4z"/><path fill="#91b36a" d="m16 1 12 19-12 6-12-6z"/><path fill="#497e50" d="m16 1 12 19-12 6z"/>'),
  water: icon('<path fill="#83b9cb" d="m16 2 11 16v7l-6 5H11l-6-5v-7z"/><path fill="#3c849e" d="m16 2 11 16v7l-6 5h-5z"/>'),
  close: icon('<path fill="currentColor" d="m7 3 9 9 9-9 4 4-9 9 9 9-4 4-9-9-9 9-4-4 9-9-9-9z"/>'),
};

const logSlot = () => `<span class="settlement-log" aria-hidden="true">${icon('<path d="m4 11 17-7 7 5v14l-17 6-7-5z"/><path class="settlement-log-top" d="m4 11 17-7 7 5-17 7z"/><path class="settlement-log-end" d="m4 11 7 5v13l-7-5z"/><path class="settlement-log-ring" d="m6 16 3 2v6l-3-2z"/>')}</span>`;
const text = (element, value) => { if (element.textContent !== value) element.textContent = value; };
const setIcon = (element, name) => {
  if (element.dataset.kind === name) return;
  element.innerHTML = icons[name];
  element.dataset.kind = name;
};

/**
 * Callbacks: onTool('axe'|'house'), onView(), onBuild(), onCancel().
 * State: logs, houses, connectedHouses, tool, walking, ready, canBuild, connected,
 * reason, targetTree, message, visible. Visible UI intentionally contains no text.
 */
export function createSettlementHud({
  parent = document.body,
  playerColor = '#37a98d',
  onTool = () => {},
  onView = () => {},
  onBuild = () => {},
  onCancel = () => {},
} = {}) {
  const root = document.createElement('aside');
  root.className = 'settlement-hud';
  root.setAttribute('aria-label', 'Settlement controls');
  root.style.setProperty('--settlement-owner', playerColor);
  root.innerHTML = `
    <div class="settlement-inventory" role="group" aria-label="Your settlement">
      <div class="settlement-stockpile" data-hud="stockpile" role="img" aria-label="No logs. Ten logs builds a house.">
        <div class="settlement-log-slots">${Array.from({ length: 10 }, logSlot).join('')}</div>
        <span class="settlement-bundles" data-hud="bundles" aria-hidden="true">${Array.from({ length: 4 }, () => `<i>${icons.logs}</i>`).join('')}</span>
      </div>
      <div class="settlement-homes" data-hud="homes" role="img" aria-label="One house">
        ${icons.house}<span class="settlement-home-marks" aria-hidden="true">${Array.from({ length: 8 }, () => '<i></i>').join('')}</span>
      </div>
    </div>
    <div class="settlement-dock">
      <div class="settlement-build-actions" data-hud="build-actions" role="group" aria-label="House placement" hidden>
        <span class="settlement-placement" data-hud="placement" role="img" aria-label="Joins your settlement">${icons.link}</span>
        <span class="settlement-validity" data-hud="validity" role="img" aria-label="Choose a clear place">${icons.blocked}</span>
        <button type="button" class="settlement-build" data-action="build" aria-label="Build house. Ten logs." aria-keyshortcuts="Enter">${icons.check}</button>
        <button type="button" data-action="cancel" aria-label="Cancel house placement" aria-keyshortcuts="Escape">${icons.close}</button>
      </div>
      <div class="settlement-actions" role="group" aria-label="Tools and camera">
        <button type="button" class="settlement-tool" data-action="axe" aria-label="Select axe. E or click to chop a nearby tree." aria-pressed="true" aria-keyshortcuts="E">${icons.axe}<span class="settlement-target" data-hud="target" aria-hidden="true"></span></button>
        <button type="button" class="settlement-tool" data-action="house" aria-label="Place a house. Costs ten logs." aria-pressed="false" aria-keyshortcuts="B">${icons.house}</button>
        <button type="button" class="settlement-tool settlement-view" data-action="view" aria-label="Switch to overview" aria-keyshortcuts="V"><span data-hud="view-icon">${icons.view}</span></button>
      </div>
    </div>
    <div class="settlement-sr-only" data-hud="announcements" role="status" aria-live="polite" aria-atomic="true"></div>`;
  parent.append(root);
  const nodes = Object.fromEntries([...root.querySelectorAll('[data-hud]')].map(node => [node.dataset.hud, node]));
  const buttons = Object.fromEntries([...root.querySelectorAll('[data-action]')].map(node => [node.dataset.action, node]));
  const logsShown = [...root.querySelectorAll('.settlement-log')];
  const bundleMarks = [...root.querySelectorAll('.settlement-bundles i')];
  const houseMarks = [...root.querySelectorAll('.settlement-home-marks i')];
  let current = {};
  let announced = '';
  let rendered = '';
  const handlers = { axe: () => onTool('axe'), house: () => onTool('house'), view: onView, build: onBuild, cancel: onCancel };
  function activate(event) {
    const button = event.target.closest('button[data-action]');
    if (button && !button.disabled) handlers[button.dataset.action]?.();
    event.stopPropagation();
  }
  const stop = event => event.stopPropagation();
  root.addEventListener('click', activate);
  // Native Enter/Space activation must not also reach the world's movement input.
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
    root.dataset.ready = String(Boolean(ready));
    root.dataset.valid = String(Boolean(canBuild));
    root.dataset.affordable = String(logs >= 10);
    root.dataset.target = String(Boolean(targetTree) && walking && !building);
    // The first ten pieces teach a house's price. Spare bundles show reserves;
    // exact larger inventories remain in the accessible resource description.
    logsShown.forEach((mark, index) => { mark.dataset.filled = String(index < Math.min(10, logs)); });
    bundleMarks.forEach((mark, index) => { mark.hidden = index >= Math.floor(Math.max(0, logs - 10) / 10); });
    houseMarks.forEach((mark, index) => {
      mark.hidden = index >= houses;
      mark.dataset.connected = String(index < connectedHouses);
    });
    nodes.stockpile.setAttribute('aria-label', `${logs} logs. Ten logs builds one house.`);
    nodes.homes.setAttribute('aria-label', `${houses} ${houses === 1 ? 'house' : 'houses'}, ${connectedHouses} connected to your settlement.`);
    nodes['build-actions'].hidden = !building;
    const placementKind = connected ? 'link' : 'outpost';
    setIcon(nodes.placement, placementKind);
    nodes.placement.dataset.connected = String(Boolean(connected));
    nodes.placement.setAttribute('aria-label', connected ? 'Joins your settlement with a path' : 'Starts a new outpost');
    const invalidReason = reason || (logs < 10 ? 'Gather ten logs to build a house.' : 'Choose clear, level ground.');
    const validity = canBuild ? 'check' : logs < 10 ? 'logs' : /tree|forest/i.test(reason) ? 'tree' : /water|dry ground/i.test(reason) ? 'water' : 'blocked';
    setIcon(nodes.validity, validity);
    nodes.validity.setAttribute('aria-label', !ready ? 'Preparing this part of the island.' : canBuild ? 'Clear ground. Ready to build.' : invalidReason);
    nodes.validity.dataset.valid = String(Boolean(canBuild));
    nodes.validity.setAttribute('aria-hidden', String(Boolean(canBuild)));
    buttons.axe.setAttribute('aria-pressed', String(!building));
    buttons.house.setAttribute('aria-pressed', String(building));
    buttons.house.setAttribute('aria-label', `Place a house. Costs ten logs. ${logs >= 10 ? 'Enough logs gathered.' : `${10 - logs} more logs needed.`}`);
    for (const key of ['axe', 'house', 'view', 'cancel']) buttons[key].disabled = !ready;
    buttons.build.disabled = !ready || !canBuild;
    buttons.build.setAttribute('aria-label', canBuild ? `Build house. Spend ten logs. ${connected ? 'Joins your settlement.' : 'Starts a new outpost.'}` : `Cannot build here. ${invalidReason}`);
    setIcon(nodes['view-icon'], walking ? 'view' : 'person');
    buttons.view.setAttribute('aria-label', walking ? 'Switch to overview' : 'Return to your traveller');
    // Aim validity is described on its symbols, rather than announced each frame.
    const announcement = [ready ? `${logs} logs. ${houses} ${houses === 1 ? 'house' : 'houses'}.` : 'Preparing your clearing.',
      building ? 'House placement selected. Aim at clear ground. Enter builds; Escape cancels.' : 'Axe selected. E or click chops a nearby tree.', walking ? '' : 'Overview.', message].filter(Boolean).join(' ');
    if (announcement !== announced) { text(nodes.announcements, announcement); announced = announcement; }
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
