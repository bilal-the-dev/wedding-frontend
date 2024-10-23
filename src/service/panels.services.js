import axiosInstance from './api';

export async function createPanels(guildId, body) {
    try {
        const res = await axiosInstance.post(`/panels/${guildId}`, body);
        const { data, status } = res.data;
        if (status === 'success') {
            return data;
        }
    } catch (e) {
        throw e;
    }
}

export async function publishPanels(panelId, channelId) {
    try {
        const res = await axiosInstance.post(`/panels/${panelId}/publish/${channelId}`);
        const { data, status } = res.data;
        if (status === 'success') {
            return data;
        }
    } catch (e) {
        throw e;
    }
}

export async function getPanelForGuilds(guildId) {
    try {
        const res = await axiosInstance.get(`/panels/guild/${guildId}?guildId=${guildId}&withCategories=true`);
        const { data, status } = res.data;
        if (status === 'success') {
            return data;
        }
    } catch (e) {
        console.log(e);
    }
}

export async function deletePanel(panelId) {
    try {
        const res = await axiosInstance.delete(`/panels/${panelId}`);
        const { data, status } = res.data;
        if (status === 'success') {
            return data;
        }
    } catch (e) {
        console.log(e);
    }
}

export async function getPanelById(panelId, guildId) {
    try {
        const res = await axiosInstance.get(`/panels/${panelId}?withChannels=true&guildId=${guildId}&withRoles=true&withCategories=true`);
        const { data, status } = res.data;
        if (status === 'success') {
            return data;
        }
    } catch (e) {
        console.log(e);
    }
}

export async function updatePanel(panelId, body) {
    try {
        const res = await axiosInstance.patch(`/panels/${panelId}`, body);
        const { data, status } = res.data;
        if (status === 'success') {
            return data;
        }
    } catch (e) {
        console.log(e);
    }
}

export async function getPanelTickets(guildId) {
    try {
        const res = await axiosInstance.get(`/panels/tickets/${guildId}`);
        const { data, status } = res.data;
        if (status === 'success') {
            return data;
        }
    } catch (e) {
        console.log(e);
    }
}
