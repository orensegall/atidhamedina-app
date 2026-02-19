const rooms = [
  { id: "S0_Lobby_Onboarding", title: "שער הבית", goal: "ביטחון בסיסי ואוריינטציה", features: ["קיר כללים", "קריאה לאדמין", "שקט עצמי", "מד עומס אישי"], npc: { Guided: "ברוכים הבאים. נתחיל בנשימה קצרה ונעבור בקצב שלך.", Solo: "" } },
  { id: "S1_Regulation_Breath", title: "חדר נשימה", goal: "ויסות סטרס ללא יומרה טיפולית", features: ["קצב נשימה ויזואלי", "פינת שקט", "צלילי טבע"], npc: { Guided: "שאיפה 4, עצירה 2, נשיפה 6. אתה לא לבד כאן.", Solo: "" } },
  { id: "S2_Grounding_Body", title: "חדר גוף", goal: "חיבור לגוף בתנועה עדינה", features: ["מתיחות אופציונליות", "הליכה במקום", "מזרקה רגועה"], npc: { Guided: "בחר פעולה אחת קטנה לגוף. הכול אופציונלי.", Solo: "" } },
  { id: "S3_Belonging_Circle", title: "מעגל שייכות", goal: "הפחתת בדידות", features: ["טוקן דיבור", "אפשרות רק להקשיב", "שאלת פתיחה אחת"], npc: { Guided: "אם תרצה, שתף משפט אחד על איך אתה מגיע היום.", Solo: "" } },
  { id: "S4_Boundaries_Skills", title: "גבולות ועדינות", goal: "כלים חברתיים מעשיים", features: ["משפטים מוכנים", "סימולציות NPC", "הצטרפות אדמין בעת מתיחות"], npc: { Guided: "תרגל: 'אני צריך רגע הפסקה'. זה גבול בריא.", Solo: "" } },
  { id: "S5_Decision_Room", title: "חדר החלטות", goal: "בחירה בצעד קטן ומציאותי", features: ["מה אני רוצה", "מה הסיכון", "צעד 24-48 שעות"], npc: { Guided: "בחר צעד קטן שאפשר לבצע עד מחר.", Solo: "" } },
  { id: "S6_Meaning_Room", title: "חדר משמעות", goal: "תקווה עם קרקע", features: ["קיר ערכים", "סיפור קצר", "פינת תודה"], npc: { Guided: "בחר 3 ערכים שיובילו אותך השבוע.", Solo: "" } },
  { id: "S7_ChemEdu_ExitScore", title: "כימיה + יציאה לעולם", goal: "ידע מוגן + סגירת ביקור", features: ["ידע כללי בלבד", "ללא מינונים", "Scorecard אישי"], npc: { Guided: "נסכם צעד אחד בעולם האמיתי לשעות הקרובות.", Solo: "" } },
];

const state = {
  idx: 0,
  stress: 5,
  loneliness: 5,
  mode: "Guided",
  muted: false,
  trigger_sensitive: false,
  sessionSeconds: 0,
  participants: 4,
  scorecard: { visited_rooms: [] },
};

const el = (id) => document.getElementById(id);
const nickname = `Guest-${Math.floor(1000 + Math.random() * 9000)}`;
const avatars = ["Neutral Oak", "Neutral River", "Neutral Cloud", "Neutral Stone"];

el("nickname").textContent = nickname;
el("avatar").textContent = avatars[Math.floor(Math.random() * avatars.length)];

function logEvent(msg) {
  const time = new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" });
  const div = document.createElement("div");
  div.textContent = `[${time}] ${msg}`;
  el("eventLog").prepend(div);
}

function room() { return rooms[state.idx]; }

function render() {
  const r = room();
  el("stateLabel").textContent = `${r.id} (${state.participants}/8)`;
  el("roomTitle").textContent = r.title;
  el("roomGoal").textContent = r.goal;
  el("roomFeatures").innerHTML = r.features.map((f) => `<li>${f}</li>`).join("");
  el("npcBox").textContent = state.mode === "Solo" ? "מצב Solo פעיל: NPC שותק ו‑UI מינימלי." : `NPC: ${r.npc.Guided}`;
  if (!state.scorecard.visited_rooms.includes(r.id)) state.scorecard.visited_rooms.push(r.id);

  if (state.idx === rooms.length - 1) {
    el("scorecardSection").hidden = false;
    const beforeStress = Number(localStorage.getItem("stress_before") || state.stress);
    const beforeLonely = Number(localStorage.getItem("lonely_before") || state.loneliness);
    el("scorecard").innerHTML = `
      <p>עומס לפני/אחרי: ${beforeStress} → ${state.stress}</p>
      <p>בדידות לפני/אחרי: ${beforeLonely} → ${state.loneliness}</p>
      <p>חדרים שביקרתי: ${state.scorecard.visited_rooms.join(", ")}</p>
      <p>צעד קטן: ליצור קשר עם אדם אחד ב-24 שעות הקרובות.</p>
      <p>אדם אחד שאדבר איתו: כן</p>
    `;
  } else {
    el("scorecardSection").hidden = true;
  }
}

function tryEnter(index) {
  const enteringSensitive = index === 7;
  if (enteringSensitive && state.trigger_sensitive) {
    el("triggerDialog").showModal();
    return;
  }
  state.idx = Math.max(0, Math.min(index, rooms.length - 1));
  render();
}

el("nextBtn").onclick = () => tryEnter(state.idx + 1);
el("prevBtn").onclick = () => tryEnter(state.idx - 1);
el("teleportBreathBtn").onclick = () => {
  state.idx = 1;
  logEvent("טלפורט לחדר נשימה הופעל.");
  render();
};

el("stressInput").oninput = (e) => {
  state.stress = Number(e.target.value);
  el("stressValue").textContent = state.stress;
  if (!localStorage.getItem("stress_before")) localStorage.setItem("stress_before", String(state.stress));
  if (state.stress >= 8) {
    logEvent("זוהה עומס גבוה (8+). מומלץ לעבור לחדר נשימה.");
  }
};

el("lonelyInput").oninput = (e) => {
  state.loneliness = Number(e.target.value);
  el("lonelyValue").textContent = state.loneliness;
  if (!localStorage.getItem("lonely_before")) localStorage.setItem("lonely_before", String(state.loneliness));
};

el("modeSelect").onchange = (e) => {
  state.mode = e.target.value;
  logEvent(`מצב הוחלף ל-${state.mode}.`);
  render();
};

el("muteBtn").onclick = () => {
  state.muted = !state.muted;
  el("muteBtn").textContent = `🔇 שקט עצמי: ${state.muted ? "פעיל" : "כבוי"}`;
  logEvent(state.muted ? "המשתמש הפעיל שקט עצמי." : "המשתמש ביטל שקט עצמי.");
};

el("adminBtn").onclick = () => logEvent("נשלחה קריאה לאדמין אנושי פעיל.");
el("triggerInput").onchange = (e) => { state.trigger_sensitive = e.target.checked; };
el("participantsInput").oninput = (e) => {
  state.participants = Math.max(1, Math.min(8, Number(e.target.value) || 1));
  e.target.value = state.participants;
  render();
};

el("enterSensitiveBtn").onclick = () => {
  el("triggerDialog").close();
  state.idx = 7;
  render();
};
el("skipSensitiveBtn").onclick = () => {
  el("triggerDialog").close();
  state.idx = 1;
  logEvent("המשתמש בחר לדלג לחדר נשימה.");
  render();
};

setInterval(() => {
  state.sessionSeconds += 1;
  const mm = String(Math.floor(state.sessionSeconds / 60)).padStart(2, "0");
  const ss = String(state.sessionSeconds % 60).padStart(2, "0");
  el("timerLabel").textContent = `${mm}:${ss}`;

  if (state.sessionSeconds === 25 * 60) {
    logEvent("תזכורת: נותרו כ-5 דקות לסשן.");
  }
  if (state.sessionSeconds >= 30 * 60 && state.idx !== 7) {
    logEvent("הסשן הגיע ל-30 דקות, מעבר טבעי לחדר סיכום.");
    state.idx = 7;
    render();
  }
}, 1000);

logEvent("זהות אנונימית נוצרה והסשן התחיל.");
render();
