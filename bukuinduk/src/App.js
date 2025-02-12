import { Routes, Route } from 'react-router';

import Home from "./pages/Home" 
import SiswaRouting from "./pages/siswa/Home" 
import AdminRouting from "./pages/admin/Home" 
import TambahRouting from "./pages/tambah"

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/admin/*" element={<AdminRouting />} />
      <Route exact path="/siswa/*" element={<SiswaRouting />} />
      <Route exact path="/tambah/*" element={<TambahRouting />} />
    </Routes>
  );
}

export default App;
