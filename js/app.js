/* Inglés con Calma — app logic: hash router, read-aloud (SpeechSynthesis), local progress. */
(function () {
  "use strict";
  var D = window.DATA;
  var app = document.getElementById("app");

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* Progress (device only, no accounts) */
  var store = {
    get: function (k, f) {
      try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : f; } catch (e) { return f; }
    },
    set: function (k, v) {
      try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
    }
  };
  var K = "icc.progress.v1";
  var progress = store.get(K, {});
  var currentLesson = null;

  /* Read-aloud. iOS requires speak() to be called from a user tap — every control here is a button. */
  var voices = [];
  function loadVoices() {
    if ("speechSynthesis" in window) { voices = speechSynthesis.getVoices(); }
  }
  if ("speechSynthesis" in window) {
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }
  function pickVoice(lang) {
    var wants = lang === "es"
      ? ["es-mx", "es-us", "es-419", "es-la", "es-es"]
      : ["en-us", "en-gb", "en"];
    for (var i = 0; i < wants.length; i++) {
      for (var j = 0; j < voices.length; j++) {
        var v = voices[j];
        if (v.lang && v.lang.toLowerCase().replace(/_/g, "-").indexOf(wants[i]) === 0) { return v; }
      }
    }
    return null;
  }
  function speak(text, lang, rate) {
    if (!("speechSynthesis" in window)) { return; }
    try { speechSynthesis.cancel(); } catch (e) {}
    var u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "es" ? "es-MX" : "en-US";
    var v = pickVoice(lang);
    if (v) { u.voice = v; u.lang = v.lang; }
    u.rate = rate || 0.95;
    u.pitch = 1;
    speechSynthesis.speak(u);
  }

  function t(mode, key) {
    var p = D.UI[mode] || D.UI.es;
    var v = p[key];
    if (v == null) { v = D.UI.es[key]; }
    return v == null ? key : v;
  }
  function levelOf(lesson) {
    for (var i = 0; i < D.LEVELS.length; i++) {
      if (D.LEVELS[i].id === lesson.level) { return D.LEVELS[i]; }
    }
    return D.LEVELS[0];
  }
  function findLesson(id) {
    for (var i = 0; i < D.LESSONS.length; i++) {
      if (D.LESSONS[i].id === id) { return D.LESSONS[i]; }
    }
    return null;
  }
  function doneCount() {
    var n = 0;
    for (var i = 0; i < D.LESSONS.length; i++) { if (progress[D.LESSONS[i].id]) { n++; } }
    return n;
  }

  function lessonCard(l) {
    var done = !!progress[l.id];
    return '<a class="lesson-card" href="#/l/' + l.id + '">'
      + '<span class="lesson-num">' + l.num + '</span>'
      + '<span class="lesson-info"><b>' + esc(l.titleEs) + '</b><span>'
      + esc(l.titleEn) + ' · ' + l.items.length + ' ' + esc(t("es", "phrasesLabel")) + '</span></span>'
      + '<span class="lesson-check" aria-hidden="true">' + (done ? "✓" : "›") + '</span>'
      + '</a>';
  }

  function renderHome() {
    currentLesson = null;
    var html = '';
    html += '<header class="hero"><h1>Inglés con Calma</h1><p>' + esc(t("es", "tagline")) + '</p></header>';
    html += '<p class="hint">' + esc(t("es", "listenHint")) + '</p>';
    html += '<section class="panel"><h3>' + esc(t("es", "howTitle")) + '</h3><p>'
      + esc(t("es", "how1")) + '</p><p>' + esc(t("es", "how2")) + '</p><p>' + esc(t("es", "how3")) + '</p></section>';
    html += '<section class="panel"><h3>' + esc(t("es", "addHomeTitle")) + '</h3><p>' + esc(t("es", "addHome")) + '</p></section>';
    html += '<p class="progress-line">' + esc(t("es", "doneSummary")) + ': ' + doneCount() + ' / ' + D.LESSONS.length + '</p>';
    for (var i = 0; i < D.LEVELS.length; i++) {
      var lvl = D.LEVELS[i];
      html += '<div class="level-title"><span class="level-badge">' + esc(t("es", "level")) + ' ' + lvl.id + '</span>'
        + '<h2>' + esc(lvl.titleEs) + '</h2></div>';
      html += '<p class="level-sub">' + esc(lvl.descEs) + '</p>';
      for (var j = 0; j < D.LESSONS.length; j++) {
        if (D.LESSONS[j].level === lvl.id) { html += lessonCard(D.LESSONS[j]); }
      }
    }
    html += '<footer class="footer"><p>' + esc(t("es", "footerNoAds")) + '</p><p>' + esc(t("es", "footerMade")) + '</p></footer>';
    app.innerHTML = html;
  }

  function renderLesson(id) {
    var l = findLesson(id);
    if (!l) { renderHome(); return; }
    currentLesson = l;
    var mode = levelOf(l).mode;
    var done = !!progress[l.id];
    var html = '';
    html += '<div class="topbar"><a class="btn-back" href="#/" aria-label="' + esc(t(mode, "back")) + '">‹</a>'
      + '<h1>' + esc(l.titleEs) + '</h1></div>';
    html += '<p class="hint">' + esc(l.titleEn) + ' · ' + esc(t(mode, "level")) + ' ' + l.level + '</p>';
    html += '<div class="intro">' + esc(l.introEs) + ' ' + esc(t(mode, "practice")) + '</div>';
    for (var i = 0; i < l.items.length; i++) {
      var it = l.items[i];
      var say = it.say || it.en;
      html += '<article class="card">'
        + '<button class="phrase-en" data-say="' + esc(say) + '" data-lang="en" data-rate="0.95" aria-label="'
        + esc(t(mode, "listen")) + ': ' + esc(it.en) + '">' + esc(it.en) + '</button>'
        + '<p class="phrase-es">' + esc(it.es) + '</p>'
        + (it.tip ? '<div class="tip">💡 ' + esc(it.tip) + '</div>' : '')
        + '<div class="actions">'
        + '<button class="btn-listen" data-say="' + esc(say) + '" data-lang="en" data-rate="0.95">▶ ' + esc(t(mode, "listen")) + '</button>'
        + '<button class="btn-slow" data-say="' + esc(say) + '" data-lang="en" data-rate="0.55">🐢 ' + esc(t(mode, "slow")) + '</button>'
        + '</div></article>';
    }
    html += '<button class="btn-done' + (done ? " is-done" : "") + '" data-done="' + l.id + '" aria-pressed="' + done + '">'
      + (done ? "✓ " + esc(t(mode, "completed")) : esc(t(mode, "markDone"))) + '</button>';
    app.innerHTML = html;
  }

  app.addEventListener("click", function (e) {
    var s = e.target.closest ? e.target.closest("[data-say]") : null;
    if (s) {
      speak(s.getAttribute("data-say"), s.getAttribute("data-lang") || "en", parseFloat(s.getAttribute("data-rate") || "0.95"));
      return;
    }
    var d = e.target.closest ? e.target.closest("[data-done]") : null;
    if (d) {
      var id = d.getAttribute("data-done");
      if (progress[id]) { delete progress[id]; } else { progress[id] = true; }
      store.set(K, progress);
      if (currentLesson && currentLesson.id === id) { renderLesson(id); }
    }
  });

  function route() {
    var m = location.hash.match(/^#\/l\/([\w-]+)$/);
    if (m && findLesson(m[1])) { renderLesson(m[1]); } else { renderHome(); }
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);
  route();

  /* Offline after first visit */
  if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }
})();
