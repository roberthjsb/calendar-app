import { uiCloseModal, uiOpenModal } from "../../actions/ui"
import types from "../../types/types";

describe('Unit test UI actions store', () => { 
    test('should first', () => { 
        const result = uiOpenModal();
        expect(result).toEqual({type:types.uiOpenModal})
     })
     test('should first', () => { 
        const result = uiCloseModal();
        expect(result).toEqual({type:types.uiCloseModal})
     })
 })