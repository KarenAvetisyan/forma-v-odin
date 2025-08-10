document.addEventListener('DOMContentLoaded', function (){

    // FORMS FORM VALIDATION AND SUBMIT
    const mainForm = document.getElementById('main-form');
    const legalForm = document.getElementById('legal-form');
    if (mainForm) {
        mainForm.addEventListener('submit', mainFormSend);
        async function mainFormSend(e) {
            e.preventDefault(); 
            let error = formValidate(mainForm);
            if (error != 0) {
                // "Form has errors";
            } else {
                // "Form is valid";
            }
        }
    }
    if (legalForm) {
        legalForm.addEventListener('submit', legalFormSend);
        async function legalFormSend(e) {
            e.preventDefault(); 
            let error = formValidate(legalForm);
            console.log(error)
            if (error != 0) {
                // "Form has errors";
                // document.querySelector(".legal__entities-content-title").classList.add('hide');
                // e.target.classList.add('hide');
                // document.getElementById('legal-form-fail').classList.add('show');
            } else {
                // "Form is valid";
                document.querySelector(".legal__entities-content-title").classList.add('hide');
                e.target.classList.add('hide');
                document.getElementById('legal-form-success').classList.add('show');
            }
        }
    }
    function formValidate(form) {
        let error = 0;
        let formReq = form.querySelectorAll('._req'); 

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemove_Req_Error(input); 

            if (input.classList.contains('_email')) {
                if (input.value.trim() == '') {
                    formAddReq(input);
                    error++;
                } else if (emailTest(input)) {
                    formAddError(input); 
                    error++;
                }
            }
            else if (input.classList.contains('_phone')) {
                if (input.value.trim() == '') {
                    formAddReq(input);
                    error++;
                } else if (!isPhoneLengthValid(input)) {
                    formAddError(input);
                    error++;
                }
            }
            else {
                if (input.value === '') {
                    formAddReq(input); 
                    error++;
                }
            }
        }

        return error; 
    }
    function isPhoneLengthValid(input) {
        const phoneMaskLength = getPhoneMaskLength(input); // Get the expected mask length
        return input.value.replace(/\D/g, '').length === phoneMaskLength; // Check if value length matches the expected length
    }
    function getPhoneMaskLength(input) {
        const countryCode = document.querySelector('.flag__code').value; 
        const countryElement = document.querySelector(`[data-code="${countryCode}"]`); 
    
        if (countryElement) {
            const mask = countryElement.getAttribute('data-mask');
            const digitCount = (mask.match(/9/g) || []).length;
            return digitCount; 
        }
        return 0;
    }
    function formAddReq(input) {
        input.closest(".form__item").classList.add('req_error');
    }
    function formAddError(input) {
        input.closest(".form__item").classList.add('error_error');
    }
    function formRemove_Req_Error(input) {
        input.closest(".form__item").classList.remove('req_error');
        input.closest(".form__item").classList.remove('error_error');
    }
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
    const textarea = document.querySelectorAll('.autoResizeTextarea');
    textarea.forEach(t=>{
        if(t){
            t.addEventListener('input', function (e) {
                this.style.height = 'auto';
                this.style.height = Math.min(this.scrollHeight, 186) + 'px'; 
            });
        }
    })
    
});