export const validatePassword = ({ getFieldValue }) => ({
    validator(_,value) {
        if(!value || getFieldValue('password') === value ){
            return Promise.resolve();
        }
        return Promise.reject(new Error('Las contraseñas no coinciden'));
    },
});


export const validatePasswordLength = () => ({
    validator(_, value) {
        if (!value || value.length >= 8) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('La contraseña debe tener al menos 8 caracteres'));
    },
});
