import MaterialTable from "material-table"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { useAlert } from "hooks/alert.hook"
import { useHttp } from "hooks/http.hook"
import { useSelector } from "react-redux"

const Motherboards = () => {
	const message = useAlert()

	const auth = useSelector((state) => state.auth)

	const user = auth.user
	const token = user && user.token
	const username = user && user.userName

	const { request } = useHttp()

	const [motherboards, setMotherboards] = useState([])
	const [manufacturers, setManufacturers] = useState({})

	const fetchMotherboards = useCallback(async () => {
		const req = await request(`/api/components/type/motherboard`, "GET", null)
		setMotherboards(req.items)
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
		fetchMotherboards()
		fetchManufacturers()
	}, [fetchMotherboards])

	const createHandler = async (values) => {
		console.log("values", values)
		try {
			await request(
				"/api/components/generate",
				"POST",
				{ ...values },
				{ Authorization: `Bearer ${token}` },
			)
			fetchMotherboards()
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
			fetchMotherboards()
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
			fetchMotherboards()
			message(`Component with id:${id} deleted`)
		} catch (error) {
			console.log(error)
			message(error)
		}
	}

	return (
		<MaterialTable
			title=" MOTHERBOARD"
			columns={[
				{
					title: "ID",
					field: "_id",
					editable: "never",
					width: 220,
				},
				{ title: "Name", field: "name", width: 150 },
				{
					title: "Description",
					field: "descr",
					width: 200,
				},

				{
					title: "Type",
					field: "type",
					editable: "never",
					initialEditValue: "motherboard",
					width: 120,
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
					width: 130,
				},
				{
					title: "Socket",
					field: "socket",
					lookup: {
						"3647": "3647 (Intel)",
						"2066": "2066 (Intel)",
						"2011-v3": "2011-v3 (Intel)",
						"1151-V2": "1151-V2 (Intel)",
						"1151": "1151 (Intel)",
						"1150": "1150 (Intel)",
						SP3: "SP3 (AMD)",
						sTRX4: "sTRX4 (AMD)",
						sTR4: "sTR4 (AMD)",
						AM4: "AM4 (AMD)",
						"AM3+": "AM3+ (AMD)",
						"FM2+": "FM2+ (AMD)",
						"integrated Intel ": "Integrated Intel",
						"integrated AMD ": "Integrated AMD",
					},
					width: 150,
				},
				{
					title: "Form-Factor",
					field: "formFactor",
					lookup: {
						"XL-ATX": "XL-ATX",
						ATX: "ATX",
						microATX: "microATX",
						"Mini-ITX": "Mini-ITX",
						"Thin Mini-ITX": "Thin Mini-ITX",
						"Mini-STX": "Mini-STX",
					},
					width: 130,
				},
				{
					title: "Chipset",
					field: "chipset",
					lookup: {
						"AMD A320": "AMD A320",
						"AMD B450": "AMD B450",
						"AMD X570": "AMD X570",
					},
					width: 130,
				},
				{
					title: "DIMM (RAM) slots",
					field: "ram",
					lookup: {
						"1": "1",
						"2": "2",
						"4": "4",
					},
					width: 130,
				},
				{
					title: "DIMM (RAM) Type",
					field: "ram",
					lookup: {
						DDR3: "DDR3",
						DDR4: "DDR4",
						DDR5: "DDR5",
					},
					width: 130,
				},
				{
					title: "Creation Date",
					field: "date",
					type: "date",
					editable: "never",
					width: 120,
				},
				{
					title: "Score",
					field: "score",
					editable: "never",
					width: 100,
				},

				// socket
				// chipset
				// formFactor
				// slots
				// ramType
				// ramSlots
				// ramCapacity
				// ramCapacity
				// m2Slots
				// hddSlots
				// pciExpress16
				// pciExpress4
			]}
			data={motherboards}
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

export default Motherboards
