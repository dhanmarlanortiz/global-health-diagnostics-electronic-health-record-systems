import React from 'react'

interface Organization {
	id: number;
	name: string;
	email: string;
	address: string;
	phone: string;
}

const organizationOptions = async () => {
	const getOrganizations = await fetch(
		"http://localhost:3000/api/org",
		{ cache: "no-store" }
	);

	const organizations: Organization[] = await getOrganizations.json();

  	return (
	<>
		<ul>
		{organizations.map( (organization: { id: number; name: string; }) => 
      		(<li key={organization.id} value={organization.id}>{organization.name}</li>) 
  		)}
		</ul>
	</>
  	)
}

export default organizationOptions
