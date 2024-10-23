import axiosInstance from './api';

export async function getSettings(guildId) {
    try {
        const res = await axiosInstance.get(`/guilds/${guildId}/settings?withRoles=true&withChannels=true&withDiscordSettings=true&guildId=${guildId}`);
        const { data, status } = res.data;
        if (status === 'success') {
            return data;
        }
    } catch (e) {
        console.log(e);
    }
}

export async function getAutoResponser(guildId) {
    try {
        const res = await axiosInstance.get(`/guilds/${guildId}/settings?withRoles=true&withChannels=true&withAutoResponders=true`);
        const { data, status } = res.data;
        if (status === 'success') {
            return data;
        }
    } catch (e) {
        console.log(e);
    }
}

export async function getAutoResponsersChannelsAndRoles(guildId) {
    try {
        const res = await axiosInstance.get(`/guilds/${guildId}/settings?withRoles=true&withChannels=true&guildId=${guildId}&withCategories=true&withStats=true`);
        const { data, status } = res.data;
        if (status === 'success') {
            return data;
        }
    } catch (e) {
        console.log(e);
    }
}

export async function postAutoResponser(guildId, body) {
    try {
        const res = await axiosInstance.post(`/guilds/${guildId}`, body);
        const { data, status } = res.data;
        if (status === 'success') {
            return data;
        }
    } catch (e) {
        console.log(e);
    }
}

export async function getAutoResponserWithId(guildId, id) {
    try {
        const res = await axiosInstance.get(`/guilds/${guildId}/autoresponders/${id}?withChannels=true&guildId=${guildId}`);
        const { data, status } = res.data;
        if (status === 'success') {
            return data;
        }
    } catch (e) {
        console.log(e);
    }
}

export async function deleteAutoResponser(guildId, id) {
    try {
        const res = await axiosInstance.delete(`/guilds/${guildId}/autoresponders/${id}`);
        const { data, status } = res.data;
        if (status === 'success') {
            return data;
        }
    } catch (e) {
        console.log(e);
    }
}

export async function updateAutoResponser(guildId, id, body) {
    try {
        const res = await axiosInstance.patch(`/guilds/${guildId}/autoresponders/${id}`, body);
        const { data, status } = res.data;
        if (status === 'success') {
            return data;
        }
    } catch (e) {
        console.log(e);
    }
}

export async function updateSettings(guildId, body) {
    try {
        const res = await axiosInstance.patch(`/guilds/${guildId}/settings`, body);
        const { data, status } = res.data;
        if (status === 'success') {
            return data;
        }
    } catch (e) {
        console.log(e);
    }
}
