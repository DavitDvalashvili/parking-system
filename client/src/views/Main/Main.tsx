import NavigationLayout from '../../components/MainComponents/NavigationLayout';
import Notification from '../../components/Notification';
import { Outlet, useNavigate } from 'react-router-dom';
import { useParking } from '../../App';
import { useEffect } from 'react';
import Loading from '../Loading';
import ServerError from '../ServerError';




const Main = () => {
  const { userData, checkSession, notification } = useParking();

  const navigate = useNavigate();

  useEffect(() => {
		checkSession();
	}, []);

	useEffect(() => {
		if (userData === null) navigate('/login');
	}, [userData]);

  if (userData === 'Loading') return <Loading />;
	else if (userData === 'Network Error') return <ServerError />;
  else if (userData instanceof Object) {
		return (
			<div className='w-screen h-screen bg-slate-50 flex font-alk-sanet'>
				<NavigationLayout />
				<div className='p-4 flex flex-col flex-1 bg-red-500'>
					<Outlet />
				</div>
				{notification && <Notification />}
			</div>
		);
	}


  
}

export default Main;
