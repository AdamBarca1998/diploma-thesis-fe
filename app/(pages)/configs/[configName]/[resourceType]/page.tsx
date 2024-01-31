const MovieServerConfigPage = async ({ 
    params 
} : { 
    params: { configName: string, resourceType: string } 
}) => {

	return (
		<div>
            <p>
                {params.configName}
            </p>
            <p>
                {params.resourceType}
            </p>
        </div>
	);
};

export default MovieServerConfigPage;