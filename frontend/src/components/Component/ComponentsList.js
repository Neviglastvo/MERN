import MaterialTable from "material-table"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useAlert } from "../../hooks/alert.hook"
import { useHttp } from "../../hooks/http.hook"

export const ComponentList = () => {
	const message = useAlert()

	const { token } = useContext(AuthContext)
	const { request } = useHttp()

	const [, setComponents] = useState()
	const [, setManufacturers] = useState()

	const fetchComponents = useCallback(async () => {
		const result = await request(`/api/components`, "GET", null)
		setComponents(result)
		return result
	}, [request])

	const fetchManufacturers = useCallback(async () => {
		try {
			const result = await request(`/api/manufacturers`, "GET", null)
			const manufacturers = result.reduce(
				(acc, cur) => ({
					...acc,
					[cur._id]: cur.name,
				}),
				{},
			)
			console.log("fetchManufacturers manufacturers", manufacturers)
			setManufacturers(manufacturers)
			return manufacturers
		} catch (error) {
			console.log("fetchManufacturers error", error)
		}
	}, [request])

	useEffect(() => {
		fetchComponents()
		fetchManufacturers()
	}, [fetchComponents, fetchManufacturers])

	const createHandler = async values => {
		console.log("values", values)
		try {
			await request(
				"/api/components/generate",
				"POST",
				{ ...values },
				{ Authorization: `Bearer ${token}` },
			)
			fetchComponents()
			message(`Component with name: ${values.name} saved`)
		} catch (error) {
			console.error(error)
			message(error)
		}
	}

	const updateHandler = async values => {
		try {
			await request(
				"/api/components/update",
				"POST",
				{ ...values },
				{
					Authorization: `Bearer ${token}`,
				},
			)
			fetchComponents()
			message(`Component with name: ${values.name} saved`)
		} catch (error) {
			console.error(error)
			message(error)
		}
	}

	const deleteHandler = async id => {
		try {
			await request(`/api/components/delete/${id}`, "GET", null, {
				Authorization: `Bearer ${token}`,
			})
			fetchComponents()
			message(`Component with id:${id} deleted`)
		} catch (error) {
			console.log(error)
			message(error)
		}
	}

	return (
		<MaterialTable
			title="Components"
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
					lookup: {
						motherboard: "Motherboard",
						cpu: "CPU",
						gpu: "GPU",
						ram: "RAM",
						psu: "PSU",
						hdd: "HDD",
						case: "Case",
					},
				},
				{
					title: "Manufacturer",
					field: "manufacturer",
					lookup: {
						"5e5fb66780853fb8497416a8": "AMD",
						"5e5fb944823650d0bd1b271a": "INTEL",
						"5e640376f000fc6e5cccf6df": "NVIDIA",
						"5e6406580b9653805804731a": "ASUS",
						"5e6406750b9653805804731b": "AEROCOOL",
						"5e640702b011368b8021a2ea": "KINGSTON",
					},
				},
			]}
			data={() =>
				new Promise(async (resolve, reject) => {
					// prepare your data and then call resolve like this:
					const fetched = await request(`/api/components`, "GET", null)
					// setComponents(fetched)
					// const fetchedManufacturers = await request(
					// 	`/api/manufacturers`,
					// 	"GET",
					// 	null,
					// )
					// setManufacturers(fetchedManufacturers)

					// console.log("fetchedComponents", fetchedComponents)
					// console.log("fetchedManufacturers", fetchedManufacturers)
					// const manuf = fetchedManufacturers.reduce(
					// 	(acc, cur) => ({
					// 		...acc,
					// 		[cur._id]: cur.name,
					// 	}),
					// 	{},
					// )
					// console.log("manuf", manuf)
					resolve({
						data: fetched, // your data array
						page: 0, // current page number
						totalCount: fetched.length, // total row number
					})
					reject(e => {
						console.log("error", e)
					})
				})
			}
			options={{
				filtering: true,
				actionsColumnIndex: -1,
				fixedColumns: {
					// right: -1,
				},
			}}
			editable={{
				onRowAdd: newData =>
					new Promise(resolve => {
						resolve()
						createHandler(newData)
					}),
				onRowUpdate: (newData, oldData) =>
					new Promise(resolve => {
						resolve()
						updateHandler(newData)
					}),
				onRowDelete: oldData =>
					new Promise(resolve => {
						resolve()
						deleteHandler(oldData._id)
					}),
			}}
		/>
	)
}
