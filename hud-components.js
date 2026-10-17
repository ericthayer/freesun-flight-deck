import {icon,balloon,crewCard,logCard,chatCard,baconCard} from './components.js';

export const hudPanels = {
  crew: {title:'The crew', icon:'crew', render:(data)=>crewCard(data?.crew||[],Boolean(data))},
  log: {title:'Flight log', icon:'book', render:(data)=>logCard(data?.logs||[],Boolean(data))},
  chat: {title:'WhatsApp', icon:'chat', render:chatCard},
  bacon: {title:'Bacon Tracker', icon:'bacon', render:baconCard}
};

export function HudDock(activePanel) {
  return `<nav class="hud-dock hud-glass" aria-label="Flight-view crew tools">${Object.entries(hudPanels).map(([key,panel])=>`<button data-hud-panel="${key}" class="${activePanel===key?'selected':''}" aria-expanded="${activePanel===key}" aria-controls="hud-drawer">${icon(panel.icon)}<span>${panel.title}</span></button>`).join('')}<span class="dock-divider"></span><button data-action="brief">${icon('check')}<span>Checklist</span></button></nav>`;
}

export function HudDrawer(activePanel,count,data) {
  const panel=hudPanels[activePanel];
  return `<aside id="hud-drawer" class="hud-drawer hud-glass" ${panel?'':'hidden'} aria-label="${panel?panel.title:'Crew panel'}">${panel?`<div class="hud-drawer-heading"><span class="eyebrow">CREW DECK / ${panel.title.toUpperCase()}</span><button class="icon-button" data-hud-panel="${activePanel}" aria-label="Collapse ${panel.title}">×</button></div>${panel.render(data,count)}`:''}</aside>`;
}

export function HudShell(state,mapMarkup,data) {
  return `<main class="hud-shell" data-map-view="${state.tilt?'tilt':'flat'}" aria-label="HudOverlay immersive flight concept">
    ${mapMarkup}
    <header class="hud-header">
      <a class="hud-brand hud-glass" href="./hudoverlay.html" aria-label="FreeSun HudOverlay">${balloon()}<span class="wordmark">Free<span>Sun</span><small>HUDOVERLAY / CONCEPT 02</small></span></a>
      <nav class="concept-switch hud-glass" aria-label="Dashboard concept"><a href="./maptracker.html" data-concept="map">${icon('map')} MapTracker</a><a href="./hudoverlay.html" data-concept="hud" class="active" aria-current="page">${icon('compass')} HudOverlay</a></nav>
      <div class="hud-header-actions"><span class="hud-demo hud-glass"><i class="status-dot"></i> ${data?'FREESUN DATA CONNECTED':'SIMULATED FLIGHT'}</span><button class="icon-button hud-glass" data-action="account" aria-label="${state.session?'Crew account':'Crew sign in'}" title="${state.session?state.session.user.email:'Sign in to sync crew data'}">${icon(state.session?'crew':'external')}</button><button class="icon-button hud-glass" data-action="theme" aria-label="Switch to ${state.theme==='light'?'dark':'light'} mode">${icon(state.theme==='light'?'moon':'sun')}</button></div>
    </header>
    <section class="hud-mission hud-glass" aria-label="Flight mission">
      <div class="hud-section-label"><span class="eyebrow">FLIGHT OPERATIONS</span><span class="hud-code">FS–01</span></div>
      <h1>Eyes on<br>the horizon.</h1>
      <p class="hud-mission-sub">Chatfield State Park<br>Littleton, Colorado</p>
      <div class="hud-coordinates">39.5448° N &nbsp; 105.0874° W</div>
      <div class="hud-mission-foot"><span><i class="status-dot"></i> Home field</span><button data-action="schedule" class="text-button">Flight brief ${icon('arrow')}</button></div>
    </section>
    <section class="hud-weather hud-glass" aria-label="Sample field weather">
      <div class="hud-section-label"><span class="eyebrow">FIELD CONDITIONS</span><button data-action="weather" class="icon-button small" aria-label="Weather details">${icon('arrow')}</button></div>
      <div class="hud-weather-temp">${icon('sun')}<strong>48<span>°F</span></strong><span>Clear skies<br><small>SAMPLE · NOT LIVE</small></span></div>
      <div class="hud-weather-wind"><span>${icon('wind')} <b>4 mph</b> SSW</span><span>Gusts <b>7 mph</b></span></div>
    </section>
    <div class="hud-ground-caption"><span>COLORADO / FRONT RANGE</span><strong>Familiar ground.<br>A different perspective.</strong></div>
    ${HudDrawer(state.hudPanel,state.bacon,data)}
    ${HudDock(state.hudPanel)}
  </main>`;
}
