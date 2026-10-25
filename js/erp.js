// === ERP Core: LocalStorage-based mini database ===
const DB = {
  get(key, def = []) {
    try { return JSON.parse(localStorage.getItem(key)) || def; } catch { return def; }
  },
  set(key, val) { localStorage.setItem(key, JSON.stringify(val)); },
  init() {
    if (!localStorage.getItem('students')) {
      this.set('students', [
        {id:1,name:'Aarav Sharma',roll:'CS2301',course:'B.Tech CSE',year:3,email:'aarav@vyntara.edu',phone:'9876543210'},
        {id:2,name:'Priya Patel',roll:'CS2302',course:'B.Tech CSE',year:3,email:'priya@vyntara.edu',phone:'9876543211'},
        {id:3,name:'Rahul Verma',roll:'EC2301',course:'B.Tech ECE',year:2,email:'rahul@vyntara.edu',phone:'9876543212'},
        {id:4,name:'Sneha Rao',roll:'ME2301',course:'B.Tech ME',year:2,email:'sneha@vyntara.edu',phone:'9876543213'},
        {id:5,name:'Vikram Singh',roll:'CS2303',course:'B.Tech CSE',year:4,email:'vikram@vyntara.edu',phone:'9876543214'},
      ]);
    }
    if (!localStorage.getItem('faculty')) {
      this.set('faculty', [
        {id:1,name:'Dr. Anil Kumar',dept:'Computer Science',designation:'Professor',email:'anil@vyntara.edu',phone:'9876501001'},
        {id:2,name:'Prof. Meera Iyer',dept:'Electronics',designation:'Associate Professor',email:'meera@vyntara.edu',phone:'9876501002'},
        {id:3,name:'Dr. Sanjay Mehta',dept:'Mechanical',designation:'HOD',email:'sanjay@vyntara.edu',phone:'9876501003'},
      ]);
    }
    if (!localStorage.getItem('courses')) {
      this.set('courses', [
        {id:1,code:'CS301',name:'Data Structures',dept:'Computer Science',credits:4,faculty:'Dr. Anil Kumar'},
        {id:2,code:'CS302',name:'Operating Systems',dept:'Computer Science',credits:4,faculty:'Dr. Anil Kumar'},
        {id:3,code:'EC301',name:'Digital Electronics',dept:'Electronics',credits:3,faculty:'Prof. Meera Iyer'},
        {id:4,code:'ME301',name:'Thermodynamics',dept:'Mechanical',credits:4,faculty:'Dr. Sanjay Mehta'},
      ]);
    }
    if (!localStorage.getItem('notices')) {
      this.set('notices', [
        {id:1,title:'Mid-Sem Exams Schedule',date:'2026-10-20',content:'Mid-semester exams will begin from Nov 10, 2026.'},
        {id:2,title:'TCS Placement Drive',date:'2026-10-22',content:'TCS campus drive on Nov 5. Eligibility: 70%+ aggregate.'},
        {id:3,title:'Annual Tech Fest',date:'2026-10-24',content:'VYNTECH 2026 on Nov 20-22. Register through ERP portal.'},
      ]);
    }
    if (!localStorage.getItem('attendance')) this.set('attendance', []);
  }
};
DB.init();

// === Auth ===
function login(e){
  e.preventDefault();
  const u = document.getElementById('username').value;
  const p = document.getElementById('password').value;
  if ((u === 'admin' && p === 'admin123') || (u === 'faculty' && p === 'faculty123')) {
    sessionStorage.setItem('user', JSON.stringify({name:u,role:u}));
    window.location.href = 'dashboard.html';
  } else {
    alert('Invalid credentials. Try admin/admin123 or faculty/faculty123');
  }
  return false;
}
function logout(){
  sessionStorage.removeItem('user');
  window.location.href = 'login.html';
}
function requireAuth(){
  if(!sessionStorage.getItem('user')){window.location.href='login.html';return false}
  return true;
}
function currentUser(){
  return JSON.parse(sessionStorage.getItem('user') || '{"name":"Guest","role":"guest"}');
}

// === Students CRUD ===
function renderStudents(){
  const students = DB.get('students');
  const tbody = document.querySelector('#students-table tbody');
  if(!tbody) return;
  tbody.innerHTML = students.map(s => `
    <tr>
      <td>${s.id}</td><td>${s.roll}</td><td>${s.name}</td>
      <td>${s.course}</td><td>${s.year}</td><td>${s.email}</td><td>${s.phone}</td>
      <td>
        <button class="btn-edit" onclick="editStudent(${s.id})">Edit</button>
        <button class="btn-danger" onclick="deleteStudent(${s.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}
function addStudent(e){
  e.preventDefault();
  const students = DB.get('students');
  const data = {
    id: Date.now(),
    name: document.getElementById('s-name').value,
    roll: document.getElementById('s-roll').value,
    course: document.getElementById('s-course').value,
    year: document.getElementById('s-year').value,
    email: document.getElementById('s-email').value,
    phone: document.getElementById('s-phone').value,
  };
  const editId = document.getElementById('s-edit-id').value;
  if(editId){
    const i = students.findIndex(x=>x.id==editId);
    data.id = parseInt(editId);
    students[i] = data;
  } else {
    students.push(data);
  }
  DB.set('students', students);
  document.getElementById('student-form').reset();
  document.getElementById('s-edit-id').value='';
  renderStudents();
  return false;
}
function editStudent(id){
  const s = DB.get('students').find(x=>x.id===id);
  document.getElementById('s-name').value = s.name;
  document.getElementById('s-roll').value = s.roll;
  document.getElementById('s-course').value = s.course;
  document.getElementById('s-year').value = s.year;
  document.getElementById('s-email').value = s.email;
  document.getElementById('s-phone').value = s.phone;
  document.getElementById('s-edit-id').value = id;
  window.scrollTo({top:0,behavior:'smooth'});
}
function deleteStudent(id){
  if(!confirm('Delete this student?')) return;
  DB.set('students', DB.get('students').filter(s=>s.id!==id));
  renderStudents();
}

// === Faculty CRUD ===
function renderFaculty(){
  const list = DB.get('faculty');
  const tbody = document.querySelector('#faculty-table tbody');
  if(!tbody) return;
  tbody.innerHTML = list.map(f => `
    <tr>
      <td>${f.id}</td><td>${f.name}</td><td>${f.dept}</td>
      <td>${f.designation}</td><td>${f.email}</td><td>${f.phone}</td>
      <td>
        <button class="btn-edit" onclick="editFaculty(${f.id})">Edit</button>
        <button class="btn-danger" onclick="deleteFaculty(${f.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}
function addFaculty(e){
  e.preventDefault();
  const list = DB.get('faculty');
  const data = {
    id: Date.now(),
    name: document.getElementById('f-name').value,
    dept: document.getElementById('f-dept').value,
    designation: document.getElementById('f-desig').value,
    email: document.getElementById('f-email').value,
    phone: document.getElementById('f-phone').value,
  };
  const editId = document.getElementById('f-edit-id').value;
  if(editId){
    const i = list.findIndex(x=>x.id==editId);
    data.id = parseInt(editId);
    list[i] = data;
  } else {
    list.push(data);
  }
  DB.set('faculty', list);
  document.getElementById('faculty-form').reset();
  document.getElementById('f-edit-id').value='';
  renderFaculty();
  return false;
}
function editFaculty(id){
  const f = DB.get('faculty').find(x=>x.id===id);
  document.getElementById('f-name').value=f.name;
  document.getElementById('f-dept').value=f.dept;
  document.getElementById('f-desig').value=f.designation;
  document.getElementById('f-email').value=f.email;
  document.getElementById('f-phone').value=f.phone;
  document.getElementById('f-edit-id').value=id;
  window.scrollTo({top:0,behavior:'smooth'});
}
function deleteFaculty(id){
  if(!confirm('Delete faculty member?'))return;
  DB.set('faculty', DB.get('faculty').filter(f=>f.id!==id));
  renderFaculty();
}

// === Courses CRUD ===
function renderCourses(){
  const list = DB.get('courses');
  const tbody = document.querySelector('#courses-table tbody');
  if(!tbody) return;
  tbody.innerHTML = list.map(c => `
    <tr>
      <td>${c.code}</td><td>${c.name}</td><td>${c.dept}</td>
      <td>${c.credits}</td><td>${c.faculty}</td>
      <td><button class="btn-danger" onclick="deleteCourse(${c.id})">Delete</button></td>
    </tr>
  `).join('');
}
function addCourse(e){
  e.preventDefault();
  const list = DB.get('courses');
  list.push({
    id: Date.now(),
    code: document.getElementById('c-code').value,
    name: document.getElementById('c-name').value,
    dept: document.getElementById('c-dept').value,
    credits: document.getElementById('c-credits').value,
    faculty: document.getElementById('c-faculty').value,
  });
  DB.set('courses', list);
  document.getElementById('course-form').reset();
  renderCourses();
  return false;
}
function deleteCourse(id){
  if(!confirm('Delete course?'))return;
  DB.set('courses', DB.get('courses').filter(c=>c.id!==id));
  renderCourses();
}

// === Notices ===
function renderNotices(){
  const list = DB.get('notices');
  const tbody = document.querySelector('#notices-table tbody');
  if(!tbody) return;
  tbody.innerHTML = list.map(n => `
    <tr>
      <td>${n.date}</td><td><strong>${n.title}</strong></td><td>${n.content}</td>
      <td><button class="btn-danger" onclick="deleteNotice(${n.id})">Delete</button></td>
    </tr>
  `).join('');
}
function addNotice(e){
  e.preventDefault();
  const list = DB.get('notices');
  list.unshift({
    id: Date.now(),
    date: document.getElementById('n-date').value,
    title: document.getElementById('n-title').value,
    content: document.getElementById('n-content').value,
  });
  DB.set('notices', list);
  document.getElementById('notice-form').reset();
  renderNotices();
  return false;
}
function deleteNotice(id){
  if(!confirm('Delete notice?'))return;
  DB.set('notices', DB.get('notices').filter(n=>n.id!==id));
  renderNotices();
}

// === Attendance ===
function renderAttendance(){
  const students = DB.get('students');
  const list = document.getElementById('attendance-list');
  if(!list) return;
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('att-date').value = today;
  list.innerHTML = students.map(s => `
    <div class="student-row">
      <div>${s.roll}</div>
      <div>${s.name}</div>
      <div class="toggle">
        <input type="radio" name="att-${s.id}" id="p-${s.id}" value="P" checked>
        <label for="p-${s.id}">Present</label>
        <input type="radio" name="att-${s.id}" id="a-${s.id}" value="A" class="absent">
        <label for="a-${s.id}">Absent</label>
      </div>
    </div>
  `).join('');
}
function saveAttendance(){
  const students = DB.get('students');
  const date = document.getElementById('att-date').value;
  const course = document.getElementById('att-course').value;
  const records = students.map(s => ({
    studentId: s.id,
    name: s.name,
    status: document.querySelector(`input[name="att-${s.id}"]:checked`).value
  }));
  const all = DB.get('attendance');
  all.push({id:Date.now(),date,course,records});
  DB.set('attendance', all);
  alert('Attendance saved for ' + date + '!');
}

// === Dashboard stats ===
function loadDashboardStats(){
  const s = document.getElementById('stat-students');
  const f = document.getElementById('stat-faculty');
  const c = document.getElementById('stat-courses');
  const n = document.getElementById('stat-notices');
  if(s) s.textContent = DB.get('students').length;
  if(f) f.textContent = DB.get('faculty').length;
  if(c) c.textContent = DB.get('courses').length;
  if(n) n.textContent = DB.get('notices').length;

  // show recent notices
  const recent = document.getElementById('recent-notices');
  if(recent){
    const list = DB.get('notices').slice(0,5);
    recent.innerHTML = list.map(x => `
      <div style="padding:.8rem;border-bottom:1px solid #eee">
        <strong>${x.title}</strong> <small style="color:#999">— ${x.date}</small>
        <p style="color:#555;margin-top:.2rem;font-size:.9rem">${x.content}</p>
      </div>
    `).join('');
  }

  // show user name
  const uname = document.getElementById('user-name');
  if(uname) uname.textContent = currentUser().name.toUpperCase();
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  if(document.getElementById('students-table')) renderStudents();
  if(document.getElementById('faculty-table')) renderFaculty();
  if(document.getElementById('courses-table')) renderCourses();
  if(document.getElementById('notices-table')) renderNotices();
  if(document.getElementById('attendance-list')) renderAttendance();
  loadDashboardStats();
});
