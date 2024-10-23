import axiosInstance from './api';

export async function getGuilds() {
    try {
        const res = await axiosInstance.get('/users/@me/guilds?adminOnly=true&botOnlyProp=true');
        const { data, status } = res.data;
        if (status === 'success') {
            return data;
        }
    } catch (e) {
        console.log(e);
    }
}

export async function me() {
    try {
        const res = await axiosInstance.get('/users/@me');
        const { data, status } = res.data;
        if (status === 'success') {
            return data;
        }
    } catch (e) {
        console.log(e);
    }
}

export async function logoutFromApp() {
    try {
        const res = await axiosInstance.post('/auth/discord/logout');
        const { data, status } = res.data;
        if (status === 'success') {
            return data;
        }
    } catch (e) {
        console.log(e);
    }
}
