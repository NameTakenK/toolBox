const tasks = [
  { id: 1, title: 'Finalize Q2 roadmap narrative', priority: 'high', due: '2026-03-25', progress: 65, tags: ['Strategy', 'Leadership'], status: 'in-progress' },
  { id: 2, title: 'Review onboarding flow metrics', priority: 'medium', due: '2026-03-24', progress: 30, tags: ['Product', 'Analytics'], status: 'overdue' },
  { id: 3, title: 'Ship calendar drag interaction', priority: 'high', due: '2026-03-26', progress: 90, tags: ['Design', 'Frontend'], status: 'in-progress' },
  { id: 4, title: 'Inbox zero and archive', priority: 'low', due: '2026-03-25', progress: 100, tags: ['Ops'], status: 'completed' },
  { id: 5, title: 'Draft weekly team update', priority: 'medium', due: '2026-03-27', progress: 10, tags: ['Communication'], status: 'in-progress' },
];

const schedule = [
  { time: '09:00', title: 'Standup · Product Team' },
  { time: '10:30', title: 'Deep Work Block · Architecture' },
  { time: '13:00', title: '1:1 · Designer' },
  { time: '16:00', title: 'Sprint Review Prep' },
];

const habits = [
  { id: 1, name: 'Morning planning', streak: 14, done: true },
  { id: 2, name: 'No-meeting focus block', streak: 8, done: false },
  { id: 3, name: 'Evening reflection', streak: 11, done: false },
];

const insights = [
  { label: 'Deep work consistency', value: 82 },
  { label: 'Task completion', value: 74 },
  { label: 'Routine adherence', value: 67 },
  { label: 'Planning quality', value: 88 },
];

const notes = [
  { id: crypto.randomUUID(), text: 'Ask data team for weekly retention cohort by Monday.' },
  { id: crypto.randomUUID(), text: 'Prototype “Today lane” in calendar with quick reschedule.' },
];

const state = {
  search: '',
  priority: 'all',
  status: 'all',
  focusMode: false,
  focusRunning: false,
  focusSeconds: 25 * 60,
  focusTimer: null,
};

const $ = (id) => document.getElementById(id);
const els = {
  taskList: $('task-list'),
  taskEmpty: $('task-empty'),
  taskLoading: $('task-loading'),
  priorityFilter: $('priority-filter'),
  statusFilter: $('status-filter'),
  globalSearch: $('global-search'),
  scheduleList: $('schedule-list'),
  habitList: $('habit-list'),
  insightBars: $('insight-bars'),
  noteInput: $('note-input'),
  noteList: $('note-list'),
  noteEmpty: $('note-empty'),
  addNote: $('add-note'),
  scoreValue: $('score-value'),
  overdueCount: $('overdue-count'),
  inProgressCount: $('in-progress-count'),
  notesCount: $('notes-count'),
  kpiDone: $('kpi-done'),
  kpiFocus: $('kpi-focus'),
  kpiStreak: $('kpi-streak'),
  focusTime: $('focus-time'),
  focusState: $('focus-state'),
  focusStart: $('focus-start'),
  focusPause: $('focus-pause'),
  focusReset: $('focus-reset'),
  toast: $('toast'),
  toggleFocusMode: $('toggle-focus-mode'),
};

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => els.toast.classList.remove('show'), 2200);
}

function taskMatches(task) {
  const q = state.search.trim().toLowerCase();
  const bySearch = !q || [task.title, task.priority, task.status, ...task.tags].join(' ').toLowerCase().includes(q);
  const byPriority = state.priority === 'all' || task.priority === state.priority;
  const byStatus = state.status === 'all' || task.status === state.status;
  return bySearch && byPriority && byStatus;
}

function renderTasks() {
  const filtered = tasks.filter(taskMatches);
  els.taskList.innerHTML = filtered.map((task) => `
    <li class="state-${task.status}">
      <div class="task-top">
        <strong>${task.title}</strong>
        <span class="badge ${task.priority}">${task.priority}</span>
      </div>
      <div class="task-meta">
        <span>Due ${task.due}</span>
        <span>${task.tags.map((tag) => `#${tag}`).join(' · ')}</span>
      </div>
      <div class="progress"><i style="width:${task.progress}%"></i></div>
      <div class="task-actions">
        <small>${task.progress}% complete</small>
        <button class="ghost" data-action="complete" data-id="${task.id}">${task.status === 'completed' ? 'Done' : 'Mark done'}</button>
      </div>
    </li>
  `).join('');

  els.taskEmpty.classList.toggle('hidden', filtered.length > 0);
  els.taskList.classList.toggle('hidden', filtered.length === 0);
  updateStats();
}

function renderSchedule() {
  els.scheduleList.innerHTML = schedule.map((item) => `
    <li>
      <span>${item.title}</span>
      <span class="schedule-time">${item.time}</span>
    </li>
  `).join('');
}

function renderHabits() {
  els.habitList.innerHTML = habits.map((habit) => `
    <li>
      <div class="habit-row">
        <div>
          <strong>${habit.name}</strong>
          <p class="muted">${habit.streak} day streak</p>
        </div>
        <button class="ghost" data-action="habit-toggle" data-id="${habit.id}">${habit.done ? 'Completed' : 'Check in'}</button>
      </div>
    </li>
  `).join('');
}

function renderInsights() {
  els.insightBars.innerHTML = insights.map((item) => `
    <article class="bar">
      <span>${item.label} · ${item.value}%</span>
      <div><i style="width:${item.value}%"></i></div>
    </article>
  `).join('');
}

function renderNotes() {
  els.noteList.innerHTML = notes.map((note) => `<li>${note.text}</li>`).join('');
  els.noteEmpty.classList.toggle('hidden', notes.length > 0);
  updateStats();
}

function updateStats() {
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const overdue = tasks.filter((t) => t.status === 'overdue').length;
  const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
  const score = Math.round((completed / tasks.length) * 40 + ((100 - overdue * 15) + 60) / 2);

  els.kpiDone.textContent = `${completed}/${tasks.length}`;
  els.overdueCount.textContent = String(overdue);
  els.inProgressCount.textContent = String(inProgress);
  els.notesCount.textContent = String(notes.length);
  els.scoreValue.textContent = String(Math.min(score, 98));
  els.kpiStreak.textContent = `${Math.max(...habits.map((h) => h.streak))} days`;
}

function formatFocus() {
  const mins = String(Math.floor(state.focusSeconds / 60)).padStart(2, '0');
  const secs = String(state.focusSeconds % 60).padStart(2, '0');
  els.focusTime.textContent = `${mins}:${secs}`;
  els.kpiFocus.textContent = `${Math.floor((25 * 60 - state.focusSeconds) / 60)}h ${(25 * 60 - state.focusSeconds) % 60}m`;
}

function startFocus() {
  if (state.focusRunning) return;
  state.focusRunning = true;
  els.focusState.textContent = 'Focused';
  state.focusTimer = setInterval(() => {
    if (state.focusSeconds <= 0) {
      clearInterval(state.focusTimer);
      state.focusRunning = false;
      els.focusState.textContent = 'Completed';
      showToast('Focus session complete. Great work.');
      return;
    }
    state.focusSeconds -= 1;
    formatFocus();
  }, 1000);
}

function pauseFocus() {
  state.focusRunning = false;
  clearInterval(state.focusTimer);
  els.focusState.textContent = 'Paused';
}

function resetFocus() {
  pauseFocus();
  state.focusSeconds = 25 * 60;
  els.focusState.textContent = 'Ready';
  formatFocus();
}

function bindEvents() {
  els.priorityFilter.addEventListener('change', (event) => {
    state.priority = event.target.value;
    renderTasks();
  });

  els.statusFilter.addEventListener('change', (event) => {
    state.status = event.target.value;
    renderTasks();
  });

  els.globalSearch.addEventListener('input', (event) => {
    state.search = event.target.value;
    renderTasks();
  });

  els.taskList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action="complete"]');
    if (!button) return;
    const id = Number(button.dataset.id);
    const task = tasks.find((t) => t.id === id);
    if (!task || task.status === 'completed') return;
    task.status = 'completed';
    task.progress = 100;
    renderTasks();
    showToast(`Marked complete: ${task.title}`);
  });

  els.habitList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action="habit-toggle"]');
    if (!button) return;
    const habit = habits.find((h) => h.id === Number(button.dataset.id));
    if (!habit) return;
    habit.done = !habit.done;
    habit.streak += habit.done ? 1 : -1;
    renderHabits();
    updateStats();
  });

  els.addNote.addEventListener('click', () => {
    const value = els.noteInput.value.trim();
    if (!value) return;
    notes.unshift({ id: crypto.randomUUID(), text: value });
    els.noteInput.value = '';
    renderNotes();
    showToast('Note captured.');
  });

  els.focusStart.addEventListener('click', startFocus);
  els.focusPause.addEventListener('click', pauseFocus);
  els.focusReset.addEventListener('click', resetFocus);
  els.toggleFocusMode.addEventListener('click', () => {
    state.focusMode = !state.focusMode;
    document.body.classList.toggle('focus-mode', state.focusMode);
    showToast(state.focusMode ? 'Focus Mode enabled.' : 'Focus Mode disabled.');
  });
}

function initialize() {
  for (let i = 0; i < 3; i += 1) {
    els.taskLoading.insertAdjacentHTML('beforeend', '<div></div>');
  }

  setTimeout(() => {
    els.taskLoading.classList.add('hidden');
    els.taskList.classList.remove('hidden');
    renderTasks();
    renderSchedule();
    renderHabits();
    renderInsights();
    renderNotes();
    formatFocus();
  }, 550);

  bindEvents();
}

initialize();
