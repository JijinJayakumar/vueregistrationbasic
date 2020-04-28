<template>
    <v-container>
        <ValidationObserver ref="form">
            <form>
                <ValidationProvider v-slot="{ errors }" name="Name" rules="required|max:150">
                    <v-text-field v-model="form.name" :error-messages="errors" label="Name" required>
                    </v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
                    <v-text-field v-model="form.email" :error-messages="errors" label="E-mail" type="email" required>
                    </v-text-field>
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" name="Age" rules="required|integer">
                    <v-text-field v-model="form.age" :error-messages="errors" label="Age" required></v-text-field>
                </ValidationProvider>


                <ValidationProvider v-slot="{ errors }" name="DOB" rules="required">

                    <input type="hidden" v-model="form.dob">
                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="form.dob"
                        transition="scale-transition" offset-y min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="form.dob" label="Date of Birth" readonly v-on="on"
                                :error-messages="errors">
                            </v-text-field>
                        </template>
                        <v-date-picker v-model="form.dob" no-title scrollable :max="state.disabledDates.from">
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>

                </ValidationProvider>


                <ValidationProvider v-slot="{ errors }" name="Image" rules="required">

                    <v-file-input v-model="form.imageTest" accept="image/*" label="Profile pic"
                        :error-messages="errors">
                    </v-file-input>

                </ValidationProvider>


                <v-btn color="primary" @click="submit" :loading="isLoading">submit</v-btn>

            </form>
        </ValidationObserver>

        <v-snackbar v-model="snackbar" :timeout="timeout" color="success">
            Success
        </v-snackbar>
    </v-container>
</template>

<script>
    import {
        required,
        email,
        max,
        integer
    } from 'vee-validate/dist/rules'

    import {
        extend,
        ValidationObserver,
        ValidationProvider,
        setInteractionMode
    } from 'vee-validate'
    setInteractionMode('eager')

    extend('integer', integer);
    extend('required', {
        ...required,
        message: '{_field_} can not be empty',
    })

    extend('max', {
        ...max,
        message: '{_field_} may not be greater than {length} characters',
    })

    extend('email', {
        ...email,
        message: 'Email must be valid',
    })

    import {
        HTTP
    } from '../plugins/http';
    export default {
        name: 'RegisterForm',
        components: {
            ValidationProvider,
            ValidationObserver,
        },

        data: () => ({
            snackbar: false,
            timeout: 5000,
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            isLoading: false,
            form: {
                name: '',
                email: '',
                age: '',
                dob: new Date().toISOString().substr(0, 10),

            },
            state: {
                disabledDates: {
                    from: new Date().toLocaleDateString('pt-br').split('/').reverse().join('-')
                }
            }
        }),
        methods: {
            /**
             * to conver formdata value from json
             * Not using as we are using a test api server
             */
            async createFormData(array) {
                const formData = new FormData();
                for (const key in array) {
                    formData.append(key, array[key]);
                }
                return formData;
            },
            async submit() {
                this.$refs.form.validate().then(async success => {
                    if (!success) {
                        return;
                    }
                    this.snackbar = true
                    this.isLoading = true
                    // this.form=await this.createFormData(this.form); enable to upload image as formdata file
                    HTTP.post('user', this.form).then((data) => {
                        console.log(data.data.id)
                        this.dataId = data.data.id
                        this.$emit('formSuccess', data.data.id)

                    }).then(() => this.isLoading = false)

                })
            },
        }


    }
</script>