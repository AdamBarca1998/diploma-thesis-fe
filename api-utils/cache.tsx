export const revalidateCaches = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/revalidate-caches", {
            method: 'POST',
        });

        if (response.ok) {
            return true;
        }
    } catch (error) {
        return false;
    }
};
