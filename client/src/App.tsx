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
import Statistic from './views/Main/Statistic';

import { TailwaindBackgroundColor, TailwindForeColor } from './interfaces';

import axios, {  AxiosResponse } from 'axios';
import { create } from 'zustand';

type userData = {
	user_id: number;
	user_name: string;
};

type UserDataResponse = userData | 'Network Error' | 'Loading' | null;

interface UseParking {
	readonly API_URL: string;
	readonly API_URL_WS: string;
	userData: UserDataResponse;
	setUserData: (data: UserDataResponse) => void;
	checkSession: VoidFunction;
	notification: boolean;
	notiFicationMessage: string;
	notificationBG: TailwaindBackgroundColor;
	notificationForeColor: TailwindForeColor;
	showNotification: (message: string, bg?: TailwaindBackgroundColor, foreColor?: TailwindForeColor) => void;
	hideNotification: VoidFunction;
}

export const useParking = create<UseParking>((set, get) => ({
	API_URL: import.meta.env.VITE_API_URL,
	API_URL_WS: import.meta.env.VITE_API_WS,
	userData: 'Loading',
	setUserData: (data: UserDataResponse) => set({ userData: data }),
	checkSession: async () => {
		const { API_URL, setUserData } = get();
		await axios
			.get(API_URL + '/checksession')
			.then((res: AxiosResponse) => {
				if (res.status >= 200 && res.status <= 226) {
					console.log(res.data);
					
					if (res.data) setUserData(res.data);
					else setUserData(null);
				}
			})
			.catch((err) => {
				setUserData(err.message);
			});
	},
	notification: false,
	notiFicationMessage: '',
	notificationBG: 'bg-green-500',
	notificationForeColor: 'text-white',
	showNotification: (message: string, bg: TailwaindBackgroundColor = 'bg-green-500', foreColor: TailwindForeColor = 'text-white') => set({ notification: true, notiFicationMessage: message, notificationBG: bg, notificationForeColor: foreColor }),
	hideNotification: () => set({ notification: false, notiFicationMessage: '' }),
}));


function App() {
	axios.defaults.withCredentials = true;

	return (
		<Router>
			<Routes>
				<Route path='/login' element={<Login/>}/>
				<Route element={<Main/>}>
				  <Route path='/' element={<Dashboard/>}/>
				  <Route path='/cards' element={<Cards/>}/>
				  <Route path='/devices' element={<Devices/>}/>
				  <Route path='/counter' element={<Counter/>}/>
				  <Route path='/statistic' element={<Statistic/>}/>
				  <Route path='/history' element={<History/>}/>
				  <Route path='/settings' element={<Settings/>}/>
				</Route>
				<Route path='*' element={<PageNotFound/>}/>
			</Routes>
		</Router>
	);
}

export default App;
