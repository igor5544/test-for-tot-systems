export const formatDate = (string: string) => (
    new Date(string).toLocaleDateString([], {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    })
);