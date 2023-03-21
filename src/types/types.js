const types = {
    uiOpenModal: '[UI] openmodal',
    uiCloseModal: '[UI] closemodal',

    eventAddNew: '[event] addnew',
    eventSetActive:'[event] set active',
    eventUpdated: '[event] event Updated',
    eventDeleted: '[event] event Deleted',
    eventLoaded: '[event] event loaded',
    cleanActiveEvent: '[event] clean Active Event',

    authChecking:'[auth] Checking login state',
    authCheckingFinish:'[auth] Finish Checking login state',
    authStartLogin:'[auth] start Register',
    authLogin:'[auth] login',
    authLogout:'[auth] logout',
    authStartTokenRenew:'[auth] Start token renew',
    authStartRegister:'[auth] Start Register',
}
export default types;