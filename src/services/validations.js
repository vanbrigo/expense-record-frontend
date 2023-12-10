export const validator = (type, value) => {

    switch(type){

        case 'email':
        case 'correo':
        case 'mail':

            if (! /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) ) {
                return "Invalid e-mail format";
            } else {
                return "";
            }
        
        case 'name':
        case 'nickname':
        case 'surname':

            if(value.length > 25){
                return "Escribe un nombre correcto"
            } else {
                return ""
            }

        case 'phone':
        case 'telefono':
        case 'phone_number':

            if (! /^(?:\+(?:\d{1,3}))?(?:\d{8,15})$/.test(value) ) {
                return "Incorrect phone number";
            } else {
                return "";
            }

        case 'password':
        case 'password2':
        case 'contraseña':

            if(value.length < 6){
                return "Write 6 characters at least"
            } else {

                //Checking the password format....

                if (! /^(?=.*[A-Z])(?=.*\d).{6,12}$/.test(value) ) {
                    return "Invalid password format";
                } else {
                    return "";
                }
            }


    }
}