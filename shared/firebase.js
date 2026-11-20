import {initializeApp} from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js';
import {getAuth} from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js';
import {getFirestore,doc,getDoc} from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDmVdptLMb_lgCJLI4VTmR3JqmADn8laKY',
  authDomain: 'anhngumskimtestprep.firebaseapp.com',
  projectId: 'anhngumskimtestprep',
  storageBucket: 'anhngumskimtestprep.firebasestorage.app',
  messagingSenderId: '228621664116',
  appId: '1:228621664116:web:1777f025f34cf1525f3621',
  measurementId: 'G-S8406HHLX5'
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export async function roleFor(user) {
  if (!user) return 'guest';
  const adminSnap = await getDoc(doc(db,'admins',user.uid));
  if (adminSnap.exists() && adminSnap.data()?.role === 'admin') return 'admin';
  const studentSnap = await getDoc(doc(db,'students',user.uid));
  if (studentSnap.exists() && studentSnap.data()?.active === true) return 'student';
  return 'unassigned';
}
export function studentAlias(username) {
  const name = String(username||'').trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9._-]{2,31}$/.test(name)) throw new Error('Username phải từ 3–32 ký tự: chữ thường không dấu, số, dấu chấm, gạch dưới hoặc gạch ngang.');
  return name + '@anhngumskimtestprep.example';
}
export function safeText(value) {return String(value ?? '');}
export function prettyDate(value) {
  const d = value?.toDate?.() ?? (value ? new Date(value) : null);
  return d && !isNaN(d.getTime()) ? new Intl.DateTimeFormat('vi-VN',{dateStyle:'medium',timeStyle:'short'}).format(d) : '—';
}
