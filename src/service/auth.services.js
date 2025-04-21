import axiosInstance from './api';

export async function getGuilds() {
    try {
        const res = await axiosInstance.get('/services/@me?fields=user');
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
        const res = await axiosInstance.get('/users/discord/@me');
        const { data, status } = res.data;
        if (status === 'success') {
            return data;
        }
    } catch (e) {
        console.log(e);
    }
}
export async function getRoles(guildId) {
    try {
        const res = await axiosInstance.get(`/guilds/${guildId}/roles`);
        const { data, status } = res.data;
        if (status === 'success') {
            return data;
        }
    } catch (e) {
        console.log(e);
    }
}
export async function getServiceData(guildId) {
    try {
        const res = await axiosInstance.get(`/services/${guildId}`);
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
