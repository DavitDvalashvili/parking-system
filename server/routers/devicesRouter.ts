import { Router } from 'express';
import { addNewDevice, editDevice, fitCounter, getDevices, getDeviceTypes, removeDevice, switchDevice } from '../controllers/devicesController';

const DevicesRouter = Router();

DevicesRouter.post('/addnewdevice', addNewDevice);
DevicesRouter.get('/devicetypes', getDeviceTypes);
DevicesRouter.get('/devices', getDevices);
DevicesRouter.post('/switchdevice', switchDevice);
DevicesRouter.post('/editdevice', editDevice);
DevicesRouter.delete('/removedevice/:device_id', removeDevice);
DevicesRouter.post('/fitcounter', fitCounter);

export default DevicesRouter;
