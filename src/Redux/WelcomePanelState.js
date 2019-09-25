export const initWelcomePanelState = {
    showBoard: true,
    loading: false,
    currentStep: 1, // [temp] Skip Step 1
    inputCompanyName: '',
    availableName: '',
    focusInputCompanyName: false,
    errMsg: {
        show: false,
        title: "",
        content: ""
    }
}

export default initWelcomePanelState