import {setStore, getStore} from '../config/mUtils'
export default {
	getCar(state,getters){ //getters也可以作为参数传递
		return state.carData;
	}
}
