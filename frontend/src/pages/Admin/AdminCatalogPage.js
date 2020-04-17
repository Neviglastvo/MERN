import React from "react"
import { ComponentList } from "components/Component/ComponentsList"
import { ManufacturerList } from "components/Manufacturer/ManufacturerList"

const AdminCatalogPage = () => {
	return (
		<>
			<ComponentList />
			<br />
			<ManufacturerList />
		</>
	)
}
export default AdminCatalogPage
