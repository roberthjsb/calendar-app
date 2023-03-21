import uiReducer from "../../reducers/uiReducer"
import types from "../../types/types"

describe('uiReducer', () => { 
    
test('should set true in isOpenModal', () => { 
    const {isOpenModal} = uiReducer(undefined,{type:types.uiOpenModal});
    expect(isOpenModal).toBe(true);
 })

 test('should set false in isOpenModal', () => { 
    const {isOpenModal} = uiReducer({isOpenModal:true},{type:types.uiCloseModal});
    expect(isOpenModal).toBe(false);
 })

 test('should first', () => { 
   const initialState ={isOpenModal:true}
    const {isOpenModal} = uiReducer(initialState,{type:'unknown type'});
    expect(isOpenModal).toBe(initialState.isOpenModal)
 })

 })