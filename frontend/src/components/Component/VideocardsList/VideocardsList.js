import MaterialTable from "material-table"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { useAlert } from "../../../hooks/alert.hook"
import { useHttp } from "../../../hooks/http.hook"

const VideocardsList = () => {
	const message = useAlert()

	const { token } = useContext(AuthContext)
	const { request } = useHttp()

	const [videocards, setVideocards] = useState([])
	const [manufacturers, setManufacturers] = useState({})

	const fetchVideocards = useCallback(async () => {
		const req = await request(`/api/components/type/gpu`, "GET", null)
		setVideocards(req.items)
	}, [request])

	const fetchManufacturers = useCallback(async () => {
		const req = await request(`/api/manufacturers`, "GET", null)
		const result = req.reduce(
			(obj, item) => ((obj[item["_id"]] = item["name"]), obj),
			{},
		)
		setManufacturers(result)
	}, [request])

	useEffect(() => {
		fetchVideocards()
		fetchManufacturers()
	}, [fetchVideocards])

	const createHandler = async (values) => {
		console.log("values", values)
		try {
			await request(
				"/api/components/generate",
				"POST",
				{ ...values },
				{ Authorization: `Bearer ${token}` },
			)
			fetchVideocards()
			message(`Component with name: ${values.name} saved`)
		} catch (error) {
			console.error(error)
			message(error)
		}
	}

	const updateHandler = async (values) => {
		try {
			await request(
				"/api/components/update",
				"POST",
				{ ...values },
				{
					Authorization: `Bearer ${token}`,
				},
			)
			fetchVideocards()
			message(`Component with name: ${values.name} saved`)
		} catch (error) {
			console.error(error)
			message(error)
		}
	}

	const deleteHandler = async (id) => {
		try {
			await request(`/api/components/delete/${id}`, "GET", null, {
				Authorization: `Bearer ${token}`,
			})
			fetchVideocards()
			message(`Component with id:${id} deleted`)
		} catch (error) {
			console.log(error)
			message(error)
		}
	}

	return (
		<MaterialTable
			title=" GPU"
			columns={[
				{
					title: "ID",
					field: "_id",
					editable: "never",
				},
				{ title: "Name", field: "name" },
				{ title: "Description", field: "descr" },
				{
					title: "Score",
					field: "score",
					editable: "never",
				},
				{
					title: "Creation Date",
					field: "date",
					editable: "never",
				},
				{
					title: "Type",
					field: "type",
					editable: "never",
					initialEditValue: "GPU",
				},
				{
					title: "Manufacturer",
					field: "manufacturer",
					lookup: manufacturers,
					// lookup: {
					// 	"5e5fb66780853fb8497416a8": "AMD",
					// 	"5e5fb944823650d0bd1b271a": "INTEL",
					// 	"5e640376f000fc6e5cccf6df": "NVIDIA",
					// 	"5e6406580b9653805804731a": "ASUS",
					// 	"5e6406750b9653805804731b": "AEROCOOL",
					// 	"5e640702b011368b8021a2ea": "KINGSTON",
					// },
				},
			]}
			data={videocards}
			options={{
				filtering: true,
				actionsColumnIndex: -1,
				fixedColumns: {
					right: -1,
				},
			}}
			editable={{
				onRowAdd: (newData) =>
					new Promise((resolve) => {
						resolve()
						createHandler(newData)
					}),
				onRowUpdate: (newData, oldData) =>
					new Promise((resolve) => {
						resolve()
						updateHandler(newData)
					}),
				onRowDelete: (oldData) =>
					new Promise((resolve) => {
						resolve()
						deleteHandler(oldData._id)
					}),
			}}
		/>
	)
}

export default VideocardsList
