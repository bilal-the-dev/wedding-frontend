const buttonColors = {
    '#5865F2': 'Primary', // Blurple
    '#4F545C': 'Secondary', // Grey
    '#57F287': 'Success', // Green
    '#ED4245': 'Danger' // Red
};

function getButtonStyleName(hexColor) {
    const colorUpperCase = hexColor.toUpperCase();

    return buttonColors[colorUpperCase] || 'Unknown';
}

export const validatePanelData = (editPanelData, toast, isPublish = false) => {
    // Check panel name
    if (!editPanelData.panelName?.trim()) {
        toast.add({
            severity: 'error',
            summary: 'Validation Error',
            detail: 'Panel Name is required',
            life: 3000
        });
        return false;
    }

    // Check panel category
    if (!editPanelData.panelCategory?.id) {
        toast.add({
            severity: 'error',
            summary: 'Validation Error',
            detail: 'Panel Category is required',
            life: 3000
        });
        return false;
    }

    if (!editPanelData.ticketCloseCategoryId?.id) {
        toast.add({
            severity: 'error',
            summary: 'Validation Error',
            detail: 'Ticket Close Category is required',
            life: 3000
        });
        return false;
    }

    if (!editPanelData.panelEmbed?.embedTitle?.trim()) {
        toast.add({
            severity: 'error',
            summary: 'Validation Error',
            detail: 'Panel Embed Title is required',
            life: 3000
        });
        return false;
    }

    // Check ticket embed title
    if (!editPanelData.ticketEmbed?.embedTitle?.trim()) {
        toast.add({
            severity: 'error',
            summary: 'Validation Error',
            detail: 'Ticket Embed Title is required',
            life: 3000
        });
        return false;
    }

    // Check ticket settings name
    if (!editPanelData.channelNameGeneration.trim()) {
        toast.add({
            severity: 'error',
            summary: 'Validation Error',
            detail: 'Ticket Channel Name Format is required',
            life: 3000
        });
        return false;
    }

    // Check panel button label
    if (!editPanelData.panelButton?.label?.trim()) {
        toast.add({
            severity: 'error',
            summary: 'Validation Error',
            detail: 'Panel Button Label is required',
            life: 3000
        });
        return false;
    }

    // Check ticket close button label
    if (!editPanelData.closeButton?.label?.trim()) {
        toast.add({
            severity: 'error',
            summary: 'Validation Error',
            detail: 'Ticket Close Button Label is required',
            life: 3000
        });
        return false;
    }

    if (!editPanelData.channelId?.id && isPublish) {
        toast.add({
            severity: 'error',
            summary: 'Validation Error',
            detail: 'Channel selection is required for publishing',
            life: 3000
        });
        return false;
    }
    return true;
};

export const formatPanelData = (editPanelData) => {
    return {
        panelName: editPanelData.panelName.trim(),
        ticketOpenCategoryId: editPanelData.panelCategory.id,
        ticketCloseCategoryId: editPanelData.panelCategory.id,
        ticketSettings: {
            name: editPanelData.channelNameGeneration,
            ticketCap: editPanelData.maxOpenTicketPerUser || 1
        },
        panelEmbed: {
            author: {
                name: editPanelData.panelEmbed?.embedHeader || '',
                url: editPanelData.panelEmbed?.headerURL || ''
            },
            title: editPanelData.panelEmbed.title,
            description: editPanelData.panelEmbed?.embedDescription || '',
            footer: {
                text: editPanelData.panelEmbed?.embedFooter || ''
            }
        },
        ticketEmbed: {
            author: {
                name: editPanelData.ticketEmbed?.embedHeader || '',
                url: editPanelData.ticketEmbed?.headerURL || ''
            },
            title: editPanelData.ticketEmbed.title,
            description: editPanelData.ticketEmbed?.embedDescription || '',
            footer: {
                text: editPanelData.ticketEmbed?.embedFooter || ''
            }
        },
        panelButton: {
            label: editPanelData.panelButton.label,
            emoji: {
                name: editPanelData.panelButton?.emoji?.i
            },
            color: getButtonStyleName(editPanelData.panelButton?.color)
        },
        ticketCloseButton: {
            label: editPanelData.closeButton.label,
            emoji: {
                name: editPanelData.closeButton?.emoji?.i
            },
            color: getButtonStyleName(editPanelData.closeButton?.color)
        },
        saveTranscripts: editPanelData.saveTranscripts ?? false
    };
};
