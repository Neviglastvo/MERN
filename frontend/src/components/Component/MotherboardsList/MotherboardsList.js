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
		fetchManufacturers()
		fetchMotherboards()
	}, [fetchMotherboards])

	useEffect(() => {
		console.log("motherboards :>> ", motherboards)
	}, [motherboards])

	const createHandler = async (values) => {
		console.log("values", values)
		try {
			await request(
				"/api/components/generate",
				"POST",
				{ ...values },
				{ Authorization: `Bearer ${token}` },
			)
			// fetchMotherboards()
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
			// fetchMotherboards()
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
			// fetchMotherboards()
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
				{
					title: "Name",
					field: "name",
					width: 150,
					initialEditValue: "123",
				},
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
					field: "ramSlots",
					lookup: {
						"1": "1",
						"2": "2",
						"4": "4",
					},
					width: 130,
				},
				{
					title: "DIMM (RAM) Type",
					field: "ramType",
					lookup: {
						DDR3: "DDR3",
						DDR4: "DDR4",
						DDR5: "DDR5",
					},
					width: 150,
				},
				{
					title: "M2 Slots",
					field: "m2",
					type: "numeric",
					width: 150,
				},
				{
					title: "SATAIII Slots",
					field: "sata3",
					type: "numeric",
					width: 150,
				},
				{
					title: "PCI-E X16 Slots",
					field: "pcieX16",
					type: "numeric",
					width: 150,
				},
				{
					title: "PCI-E X1 Slots",
					field: "pcieX1",
					type: "numeric",
					width: 150,
				},
				{
					title: "PCI-E GEN",
					field: "pcieGen",
					type: "numeric",
					width: 150,
				},
				{
					title: "LAN",
					field: "lan",
					type: "numeric",
					initialEditValue: "10/100/1000*1",
					width: 150,
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
			// data={motherboards}
			data={motherboards.length > 0 ? motherboards : []}
			options={
				{
					// filtering: true,
					// actionsColumnIndex: -1,
					// fixedColumns: {
					// 	left: 1,
					// },
				}
			}
			editable={{
				onRowAdd: (newData) =>
					new Promise((resolve, reject) => {
						console.log("newData", newData)
						const oldMotherb = motherboards
						console.log("oldMotherb :>> ", oldMotherb)
						const newMotherb = oldMotherb.concat(newData)
						console.log("newMotherb :>> ", newMotherb)
						setMotherboards(newMotherb)
						createHandler(newData)
						resolve()
					}),

				onRowUpdate: (newData, oldData) =>
					new Promise((resolve) => {
						const oldMotherb = motherboards

						const newMotherb = oldMotherb.map((el) =>
							el._id === newData._id ? newData : el,
						)

						setMotherboards(newMotherb)
						updateHandler(newData)
						resolve()
					}),
				onRowDelete: (oldData) =>
					new Promise((resolve) => {
						const oldMotherb = motherboards

						const newMotherb = oldMotherb.filter((motherboard, index, arr) => {
							// arr.splice(motherboard.oldData.tableData.id)
							return motherboard.tableData.id !== oldData.tableData.id
						})
						setMotherboards(newMotherb)
						deleteHandler(oldData._id)
						resolve()
					}),
			}}
		/>
	)
}

export default Motherboards
