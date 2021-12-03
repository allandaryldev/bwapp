/* eslint-disable no-unused-vars */
/* eslint-disable */
import Vue from "vue";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { custom_ext, required, required_if, email, min, max, alpha, alpha_num, alpha_dash, alpha_spaces, digits, numeric, decimal, sameAs, confirmed } from 'vee-validate/dist/rules'

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

extend('custom_ext', {
    validate(file) {
        console.log(file)
        if (file != null) {
            const validTypes = ['image/png', 'image/jpg']
            return !validTypes.indexOf(file[0].type)
        }
        return true
    },
    params: ['match'],
    message: '{_field_} must match {match}'
})

extend('required', {
    ...required,
    message: '{_field_} is required.'
})

extend('confirmed', {
    ...confirmed,
    message: '{_field_} does not match.'
})

extend('required_if', {
    ...required_if,
    message: '{_field_} is required.'
})

extend('digits', {
    ...digits,
    message: '{_field_} must be a valid digit.'
})

extend('numeric', {
    ...numeric,
    message: '{_field_} must be numeric.'
})

extend('decimal', {
    validate(value) {
        return /^[\d+]+.00$/.test(value)
    },
    message: '{_field_} must be a valid number.'
})

extend('phnumber', {
    validate(value) {
        return /^09[0-9]{9}$/.test(value)
    },
    message: '{_field_} must be a valid PH mobile number.'
})

extend('email', {
    ...email,
    message: '{_field_} must be a valid email.'
})

extend('alpha_spaces', {
    ...alpha_spaces,
    message: '{_field_} must only contain letters, underscores and dashes.'
})

extend('alpha_num', {
    ...alpha_num,
    message: '{_field_} must only numbers and letters.'
})

extend('alpha_dashes_spaces', {
    validate(value) {
        return /^[\w ]+$/.test(value)
    },
    message: '{_field_} must only contain letters, underscores and dashes.'
})

extend('min', {
    ...min,
    params: ['length'],
    message: '{_field_} must be atleast {length} characters.'
})

extend('max', {
    ...max,
    params: ['length'],
    message: '{_field_} must onlt be {length} characters.'
})

extend('sameAs', {
    validate(value, args) {
        // eslint-disable-next-line no-console
        console.log(value, args)
        return value === args.match
    },
    params: ['match'],
    message: '{_field_} must match {match}'
})

extend('samePassword', {
    validate(value, args) {
        // eslint-disable-next-line no-console
        console.log(value, args)
        return value === args.match
    },
    params: ['match'],
    message: '{_field_} must match {match}'
})