import 'alk-sanet/css/alk-sanet.min.css';
import 'bpg-arial/css/bpg-arial.min.css';
import 'bpg-arial-caps/css/bpg-arial-caps.min.css';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './views/Login'
import Main from './views/Main/Main';
import PageNotFound from './views/PageNotFound';
import Dashboard from './views/Main/Dashboard';
import Cards from './views/Main/Cards';
import Devices from './views/Main/Devices';
import Counter from './views/Main/Counter';
import History from './views/Main/History';
import Settings from './views/Main/Settings';





function App() {
	return (
		<Router>
			<Routes>
				<Route path='/login' element={<Login/>}/>
				<Route element={<Main/>}>
				  <Route path='/' element={<Dashboard/>}/>
				  <Route path='/cards' element={<Cards/>}/>
				  <Route path='/devices' element={<Devices/>}/>
				  <Route path='/counter' element={<Counter/>}/>
				  <Route path='/history' element={<History/>}/>
				  <Route path='/settings' element={<Settings/>}/>
				</Route>
				<Route path='*' element={<PageNotFound/>}/>
			</Routes>
		</Router>
	);
}

export default App;
