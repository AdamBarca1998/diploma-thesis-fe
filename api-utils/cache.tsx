export const revalidateCaches = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/revalidate-caches");

        if (response.ok) {
            return true;
        }
    } catch (error) {
        return false;
    }
};

export const revalidateCacheByResourceType = async (resourceType: string) => {
    try {
        const response = await fetch(`http://localhost:3000/api/revalidate-caches/${resourceType}`);

        if (response.ok) {
            return true;
        }
    } catch (error) {
        return false;
    }
};
