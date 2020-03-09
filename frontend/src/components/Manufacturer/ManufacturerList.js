import MaterialTable from "material-table"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useAlert } from "../../hooks/alert.hook"
import { useHttp } from "../../hooks/http.hook"

export const ManufacturerList = () => {
	const message = useAlert()

	const { token } = useContext(AuthContext)
	const { request } = useHttp()

	const [, setManufacturers] = useState()

	const fetchManufacturers = useCallback(async () => {
		const fetched = await request(`/api/manufacturers`, "GET", null)
		setManufacturers(fetched)
	}, [request])

	useEffect(() => {
		fetchManufacturers()
	}, [fetchManufacturers])

	const deleteHandler = async id => {
		try {
			await request(`/api/manufacturers/delete/${id}`, "GET", null, {
				Authorization: `Bearer ${token}`,
			})
			fetchManufacturers()
			message(`PC with id:${id} deleted`)
		} catch (error) {
			console.log(error)
			message(error)
		}
	}

	const createHandler = async values => {
		console.log("values", values)
		try {
			await request(
				"/api/manufacturers/generate",
				"POST",
				{ ...values },
				{ Authorization: `Bearer ${token}` },
			)
			fetchManufacturers()
			message(`PC with name: ${values.name} saved`)
		} catch (error) {
			console.error(error)
		}
	}

	const updateHandler = async values => {
		console.log("values", values)
		console.log("{ ...values }", { ...values })
		try {
			await request(
				"/api/manufacturers/update",
				"POST",
				{ ...values },
				{
					Authorization: `Bearer ${token}`,
				},
			)
			fetchManufacturers()
			message(`PC with name: ${values.name} saved`)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<MaterialTable
			title="Manufacturers"
			columns={[
				{ title: "ID", field: "_id", editable: "never" },
				{ title: "Name", field: "name" },
				{ title: "Description", field: "description" },
				{ title: "Image", field: "image" },
			]}
			data={query =>
				new Promise(async (resolve, reject) => {
					// prepare your data and then call resolve like this:
					const fetched = await request(`/api/manufacturers`, "GET", null)
					// setManufacturers(fetched)

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
				// fixedColumns: {
				// 	left: 0,
				// 	right: -1,
				// },
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
