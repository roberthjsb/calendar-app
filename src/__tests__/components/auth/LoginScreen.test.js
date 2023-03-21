import { cleanup,screen } from "@testing-library/react";
import { LoginScreen } from "../../../components/auth/LoginScreen"
import { stateDefault } from "../../../fixtures/StatesFixtures";
import { renderWithRedux, testStore } from "../../../fixtures/storeFixture";


describe('LoginScreen test', () => { 
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
      });
    test('should first', () => { 
        const store = testStore(stateDefault);

        renderWithRedux(<LoginScreen/>,{store})
        screen.getByTestId('login_email')
        screen.getByTestId('login_password')

     })

 })